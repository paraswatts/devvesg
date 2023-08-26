import { NextFunction, Request, Response, Router } from 'express';
import passport from 'passport';
import * as z from 'zod';

import { DI } from '../index';
import { ApiRes, MediaEntityTypes, WalletRegistration, WalletDetails } from '../interfaces';
import {
  Partner,
  PartnerLocation,
  RequirementDocument,
  RequirementDocumentTypes,
  RequirementType,
  UserTypes,
  Wallet,
} from '../entities';
import { getMulterDocumentConfig, getMulterImageConfig, userHasType } from '../lib/util';
import { UnwrappedEntity } from '../classes';
import { partnerNewUpdateFormSchema, updatePartner } from '../helpers';
import { QueryOrder, wrap } from '@mikro-orm/core';
import { deleteFile, uploadFile } from '../config/s3';
import { ApprovalStatuses } from '../enums';
import { hubspot } from '../config/hubspot';
import { logger } from '../logger';
import { AuthorizationError } from '../classes/errors';
import { registerMktPlaceWallet } from '../services/wallet.service';

const router = Router();

const upload = getMulterImageConfig();
const uploadDoc = getMulterDocumentConfig();

const requirementDocumentFormSchema = z.object({
  name: z.string().nonempty(),
  type: z.enum([RequirementDocumentTypes.FILE, RequirementDocumentTypes.URL]),
  file: z.string().optional(),
});

interface PartnerOnboardingPostReq {
  initiatives: {
    initiativeUuid: string;
    projectTypeUuid: string;
    requirementTypeUuid: string;
  }[];
}


export type PartnerPostReq = {
  name: string;
  description: string;
  contactEmail: string;
  contactPhoneNumber: string;
  twitterUrl: string;
  linkedInUrl: string;
  facebookUrl: string;
  websiteUrl: string;
  serviceIds: string;
  verticalId: string;
  clientTypes: string;
  country: string;
  province: string;
  serviceLocations: string;
  projectTimeline: number | string;
  hubspotId: string;
};

router.get(
  '/:partnerUuid',
  passport.authenticate('jwt', { session: false }),
  userHasType([UserTypes.ADMIN, UserTypes.PARTNER]),
  async (req: any, res: Response<ApiRes<UnwrappedEntity<Partner>>>, next: NextFunction) => {
    const partnerUuid = req.params.partnerUuid;

    // TODO: How to apply this to all endpoints under partner?
    if (req.user.type !== UserTypes.ADMIN && partnerUuid !== req.user.partnerUuid) {
      return next(new AuthorizationError());
    }

    try {
      const partner = await DI.partnerRepo.findOne({ uuid: req.params.partnerUuid }, [
        'services',
        'vertical',
        'serviceLocations',
        'clientTypes',
      ]);
      partner.signMedia();
      res.json({ data: partner });
    } catch (e) {
      next(e);
    }
  },
);

router.put(
  `/:partnerUuid`,
  passport.authenticate('jwt', { session: false }),
  userHasType([UserTypes.ADMIN, UserTypes.PARTNER]),
  upload.single('logo'),
  updatePartner,
);

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req: Request, res: Response<ApiRes<Partner[]>>, next: NextFunction) => {
    try {
      const partners = await DI.partnerRepo.findAll({ orderBy: { name: QueryOrder.ASC }, populate: ['services'] });
      partners.map((p) => p.signMedia());
      res.json({ data: partners });
    } catch (e) {
      next(e);
    }
  },
);

router.get('/query/:query', async (req: Request, res: Response<ApiRes<Partner[]>>, next: NextFunction) => {
  try {
    const partners = await DI.partnerRepo.find(
      { $or: [{ name: { $ilike: `${req.params.query}%` } }, { name: { $ilike: `% ${req.params.query}%` } }] },
      { orderBy: { name: QueryOrder.ASC } },
    );

    partners.map((c) => c.signMedia());
    res.json({ data: partners });
  } catch (e) {
    next(e);
  }
});

router.post(
  '/',
  upload.single('logo'),
  async (req: Request<{}, {}, PartnerPostReq>, res: Response<ApiRes<Partner>>, next: NextFunction) => {
    const em = DI.orm.em.fork(false);
    const file = req.file;
    try {
      const {
        serviceIds: servicesString,
        serviceLocations: serviceLocationString,
        clientTypes: clientTypesString,
        ...rest
      } = req.body;
      const translatedBody = { ...rest, serviceIds: undefined, serviceLocations: undefined, clientTypes: undefined };
      try {
        translatedBody.serviceIds = JSON.parse(servicesString);
      } catch (e) { }
      try {
        translatedBody.serviceLocations = JSON.parse(serviceLocationString);
      } catch (e) { }
      try {
        translatedBody.clientTypes = JSON.parse(clientTypesString);
      } catch (e) { }

      if (translatedBody.projectTimeline) {
        translatedBody.projectTimeline = parseInt(translatedBody.projectTimeline as string);
      }
      const { serviceIds, clientTypes, serviceLocations, verticalId, ...parsed } =
        partnerNewUpdateFormSchema.parse(translatedBody);

      const partner = wrap(new Partner()).assign(parsed, { em: em });
      // Services
      if (serviceIds) {
        const foundServices = await DI.serviceRepo.find({ uuid: serviceIds });
        partner.services.add(...foundServices);
      }

      // Client Types
      if (clientTypes) {
        const foundClientTypes = await DI.clientTypeRepo.find({ uuid: clientTypes.map((s) => s.uuid) });
        partner.clientTypes.add(...foundClientTypes);
      }

      // Service Locations
      if (serviceLocations) {
        const locations: PartnerLocation[] = [];
        serviceLocations.forEach((loc: { country: string; provinces: string[] }) => {
          loc.provinces.forEach((prov: string) => {
            locations.push(
              wrap(new PartnerLocation()).assign(
                {
                  country: loc.country,
                  province: prov,
                  partner,
                },
                { em: em },
              ),
            );
          });
        });

        // Set partner status to pending
        partner.approvalStatus = ApprovalStatuses.PENDING;

        await em.persistAndFlush(locations);
        partner.serviceLocations.add(...locations);
      }

      // Vertical
      if (verticalId && verticalId !== 'null' && verticalId !== 'undefined') {
        // Silently fail if we are given an invalid vertical
        const foundVertical = await DI.verticalRepo.findOne({ uuid: verticalId });
        if (foundVertical) {
          partner.vertical = foundVertical;
        }
      }

      // Logo
      if (file) {
        const result = await uploadFile(file, MediaEntityTypes.PARTNER, 'logo', partner.mediaUuid);
        partner.logo = result.Location;
      }

      await em.persistAndFlush(partner);

      // After the partner has been successfully created, create a new company in hubspot and store it on the partner
      try {
        const hubspotResponse = await hubspot.companyCreate({
          name: partner.name,
          about_us: partner.description,
          owneremail: partner.contactEmail,
          phone: partner.contactPhoneNumber,
          domain: partner.websiteUrl,
        });
        partner.hubspotId = hubspotResponse.id;
        await em.persistAndFlush(partner);
      } catch (e) {
        logger.error(`Hubspot failed to create partner ${partner.name}`);
      }

      // Create a new deal for the partner with some default values
      if (partner.hubspotId) {
        try {
          const hubspotResponse = await hubspot.dealCreate({
            dealname: partner.name,
            // TODO can remove defaults once all envs have values set
            pipeline: process.env.HUBSPOT_PARTNER_NEW_PIPELINE || 'default',
            // TODO can remove defaults once all envs have values set
            dealstage: process.env.HUBSPOT_PARTNER_NEW_DEALSTAGE || 'qualifiedtobuy',
          });
          await hubspot.companyAssociateToDeal(partner.hubspotId, hubspotResponse.id);
        } catch (e) {
          logger.error(`Hubspot failed to create partner deal ${partner.name}`);
        }
      }
      partner.signMedia();
      res.json({ data: partner});
    } catch (e) {
      next(e);
    }
  },
);

router.post(
  '/:partnerUuid/onboard',
  passport.authenticate('jwt', { session: false }),
  userHasType([UserTypes.PARTNER], true),
  async (
    req: Request<{ partnerUuid: string }, {}, PartnerOnboardingPostReq>,
    res: Response<ApiRes<any>>,
    next: NextFunction,
  ) => {
    const em = DI.orm.em.fork(false);
    try {
      // Assign partner to requirementTypes
      const promises = [];
      req.body.initiatives.forEach((initiative) => {
        const promise = new Promise<RequirementType>(async (resolve, rej) => {
          try {
            const requirementType = await DI.requirementTypeRepo.findOneOrFail({
              uuid: initiative.requirementTypeUuid,
              projectType: { uuid: initiative.projectTypeUuid },
            });
            const partner = await DI.partnerRepo.findOneOrFail({ uuid: req.params.partnerUuid });
            await requirementType.partners.add(partner);

            resolve(requirementType);
          } catch (e) {
            rej(e);
          }
        });
        promises.push(promise);
      });

      const requirementTypes: RequirementType[] = await Promise.all(promises);
      await em.persistAndFlush(requirementTypes);

      res.status(200).send();
    } catch (e) {
      console.log(e);
      next(e);
    }
  },
);

router.post(
  `/:partnerUuid/requirements/:requirementUuid/documents`,
  passport.authenticate('jwt', { session: false }),
  userHasType([UserTypes.ADMIN, UserTypes.PARTNER]),
  uploadDoc.single('file'),
  async (req: any, res: any, next: NextFunction) => {
    const partnerUuid = req.params.partnerUuid;
    const requirementUuid = req.params.requirementUuid;
    const file = req.file;

    // TODO: How to apply this to all endpoints under partner?
    if (req.user.type === UserTypes.PARTNER && partnerUuid !== req.user.partnerUuid) {
      return next(new AuthorizationError());
    }

    const em = DI.orm.em.fork(false);

    try {
      // Verify requirement is owned by partner associated with user
      const requirement = await DI.requirementRepo.findOneOrFail({ uuid: requirementUuid, partner: [partnerUuid] });
      const parsed = requirementDocumentFormSchema.parse(req.body);
      const requirementDocument = wrap(new RequirementDocument()).assign(
        {
          name: parsed.name,
          type: parsed.type,
          requirement,
        },
        { em },
      );

      if (requirementDocument.type === RequirementDocumentTypes.FILE) {
        const result = await uploadFile(
          file,
          MediaEntityTypes.REQUIREMENT_DOCUMENT,
          'file',
          requirementDocument.mediaUuid,
        );
        requirementDocument.file = result.Location;
      } else if (requirementDocument.type === RequirementDocumentTypes.URL) {
        requirementDocument.file = parsed.file;
      }

      await em.persistAndFlush(requirementDocument);
      requirementDocument.signMedia();
      res.json({ data: requirementDocument });
    } catch (e) {
      next(e);
    }
  },
);

router.delete(
  `/:partnerUuid/requirements/:requirementUuid/documents/:requirementDocumentUuid`,
  passport.authenticate('jwt', { session: false }),
  userHasType([UserTypes.ADMIN, UserTypes.PARTNER]),
  async (req: any, res: any, next: NextFunction) => {
    const partnerUuid = req.params.partnerUuid;
    const requirementUuid = req.params.requirementUuid;
    const requirementDocumentUuid = req.params.requirementDocumentUuid;

    // TODO: How to apply this to all endpoints under partner?
    if (req.user.type === UserTypes.PARTNER && partnerUuid !== req.user.partnerUuid) {
      return next(new AuthorizationError());
    }

    const em = DI.orm.em.fork(false);
    try {
      // Verify requirement is owned by partner associated with user
      await DI.requirementRepo.findOneOrFail({ uuid: requirementUuid, partner: [partnerUuid] });
      const requirementDocument = await DI.requirementDocumentRepo.findOneOrFail({
        uuid: requirementDocumentUuid,
      });

      if (requirementDocument.type === RequirementDocumentTypes.FILE) {
        await deleteFile(
          requirementDocument.file,
          MediaEntityTypes.REQUIREMENT_DOCUMENT,
          'file',
          requirementDocument.mediaUuid,
        );
      }

      await em.removeAndFlush(requirementDocument);

      res.json({ data: null });
    } catch (e) {
      next(e);
    }
  },
);

export const PartnerController = router;
