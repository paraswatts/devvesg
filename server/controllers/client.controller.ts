import { NextFunction, Request, Response, Router } from 'express';
import passport from 'passport';
import { QueryOrder, wrap } from '@mikro-orm/core';
import * as z from 'zod';

import { DI } from '../index';
import { ApiRes, MediaEntityTypes } from '../interfaces';
import {
  Client,
  UserTypes,
  Project,
  ClientLocation,
  Requirement,
  RequirementDocumentTypes,
  EmailEvent,
  ProjectStatuses,
  RequirementStatuses,
  RequirementRequestStatus,
} from '../entities';
import { getMulterImageConfig, userHasType, validateCode } from '../lib/util';
import { clientNewUpdateFormSchema, ClientPostReq } from './admin/client.controller';
import { projectNewFormSchema, translateDates } from './consts';
import { uploadFile } from '../config/s3';
import { AuthenticationError, AuthorizationError } from '../classes/errors';
import { ApprovalStatuses } from '../enums';
import { hubspot } from '../config/hubspot';
import { logger } from '../logger';
import {
  handleSendClientPartnerConnectionRequest,
  handleSendClientReportRequestLog,
  handleSendPartnerConnectionLog,
  handleSendPartnerPartnerConnectionRequest,
} from '../emails/templates';

const router = Router();

const uploadImage = getMulterImageConfig();

type ClientProjectStatusUpdateReq = {
  status: ProjectStatuses;
  startDate?: Date;
  endGoalDate?: Date;
  completionDate?: Date;
};

type ClientRequirementStatusUpdateReq = {
  status: RequirementStatuses;
  startDate?: Date;
  endDate?: Date;
};

const clientProjectStatusUpdateSchema = z.object({
  status: z.enum([
    ProjectStatuses.DONE,
    ProjectStatuses.NOT_STARTED,
    ProjectStatuses.IN_PROGRESS,
    ProjectStatuses.ON_HOLD,
  ]),
  startDate: z.date().optional().nullable(),
  endGoalDate: z.date().optional().nullable(),
  completionDate: z.date().optional().nullable(),
});

const clientRequirementStatusUpdateSchema = z.object({
  status: z.enum([
    RequirementStatuses.DONE,
    RequirementStatuses.NOT_STARTED,
    RequirementStatuses.IN_PROGRESS,
    RequirementStatuses.ON_HOLD,
  ]),
  startDate: z.date().optional().nullable(),
  endDate: z.date().optional().nullable(),
});

const assignPartnerToRequirementSchema = z.object({
  partnerUuid: z.string().nonempty(),
});

router.get(
  '/:clientUuid',
  passport.authenticate('jwt', { session: false }),
  userHasType([UserTypes.ADMIN, UserTypes.CLIENT]),
  async (req: any, res: Response<ApiRes<Client>>, next: NextFunction) => {
    try {
      const whereQuery: { uuid: string; users?: string } = { uuid: req.params.clientUuid };
      if (req.user.type !== UserTypes.ADMIN) {
        whereQuery.users = req.user.uuid;
      }
      const client = await DI.clientRepo.findOneOrFail(whereQuery, {
        populate: [
          'vertical',
          'clientType',
          'projects',
          'projects.client',
          'projects.projectType.initiative',
          'projects.requirements.requirementType',
          'projects.requirements.requirementType.partners',
          'projects.requirements.requirementType.partners.services',
          'projects.requirements',
          'projects.requirements.requirementDocuments',
          'projects.requirements.project',
          'projects.requirements.partner',
          'projects.requirements.partner.services',
          'projects.projectType',
        ],
      });

      client.signMedia();
      for (const project of client.projects) {
        project.projectType.initiative.signMedia();
        project.projectType.signMedia();
        for (const requirement of project.requirements) {
          if (requirement.partner) {
            requirement.partner.signMedia();
          }
          for (const partner of requirement.requirementType.partners) {
            partner.signMedia();
          }
          if (requirement.requirementDocuments) {
            for (const document of requirement.requirementDocuments) {
              if (document.type === RequirementDocumentTypes.FILE) {
                document.signMedia();
              }
            }
          }
        }
      }

      const payload = client.toJSON();
      // Filter out requirementType partners who aren't approved
      // TODO this seems like the wrong endpoint for selecting partners for requirements in client onboarding
      // Make a separate API to avoid this filtering
      payload.projects.forEach((project) => {
        project.requirements.forEach((requirement) => {
          requirement.requirementType.partners = requirement.requirementType.partners.filter(
            (partner) => partner.approvalStatus === ApprovalStatuses.APPROVED,
          );
        });
      });
      res.json({ data: payload as Client });
    } catch (e) {
      next(e);
    }
  },
);

router.get('/query/:query', async (req: Request, res: Response<ApiRes<Client[]>>, next: NextFunction) => {
  try {
    const clients = await DI.clientRepo.find(
      { $or: [{ name: { $ilike: `${req.params.query}%` } }, { name: { $ilike: `% ${req.params.query}%` } }] },
      { orderBy: { name: QueryOrder.ASC } },
    );

    clients.map((c) => c.signMedia());
    res.json({ data: clients });
  } catch (e) {
    next(e);
  }
});

router.get('/', async (req: Request, res: Response<ApiRes<Client[]>>, next: NextFunction) => {
  try {
    const clients = await DI.clientRepo.findAll({ orderBy: { name: QueryOrder.ASC } });
    clients.map(client => client.signMedia());
    res.json({ data: clients });
  } catch (e) {
    next(e);
  }
});

router.post('/verify-code', (req: Request<{ code: string }>, res: Response<ApiRes<boolean>>, next: NextFunction) => {
  // TODO probably temporary. Probably needs to go in the DB. Need info from client.
  try {
    const valid = validateCode(req.body.code);
    if (valid) {
      res.json({ data: valid });
    } else {
      throw 'Not valid';
    }
  } catch (e) {
    next(e);
  }
});

router.post(
  `/:clientUuid/projects`,
  passport.authenticate('jwt', { session: false }),
  userHasType([UserTypes.ADMIN, UserTypes.CLIENT]),
  async (req: any, res: Response<ApiRes<Project>>, next: NextFunction) => {
    const em = DI.orm.em.fork(false);
    try {
      translateDates(req.body);
      const parsed = projectNewFormSchema.parse(req.body);
      const whereQuery: { uuid: string; users?: string } = { uuid: req.params.clientUuid };
      if (req.user.type !== UserTypes.ADMIN) {
        whereQuery.users = req.user.uuid;
      }
      const client = await DI.clientRepo.findOneOrFail(whereQuery);
      const projectType = await DI.projectTypeRepo.findOneOrFail(
        { uuid: parsed.projectTypeUuid },
        { populate: ['requirementTypes'] },
      );
      const project = wrap(new Project()).assign(
        {
          name: parsed.name,
          description: parsed.description,
          status: parsed.status,
          startDate: parsed.startDate,
          endGoalDate: parsed.endGoalDate,
          completionDate: parsed.completionDate,
          client,
          projectType,
        },
        { em },
      );
      const newRequirements: Requirement[] = [];
      const requirementTypes = projectType.requirementTypes;
      requirementTypes.getItems().forEach((requirementType) => {
        const requirement = wrap(new Requirement()).assign(
          {
            name: requirementType.name,
            description: requirementType.description,
            status: RequirementStatuses.NOT_STARTED,
            requestStatus: RequirementRequestStatus.UNASSIGNED,
            requirementType,
            project,
          },
          { em },
        );
        newRequirements.push(requirement);
      });
      await em.persistAndFlush(project);
      await em.persistAndFlush(newRequirements);
      if (req.user.type === UserTypes.CLIENT) {
        const user = await DI.userRepo.findOneOrFail({ uuid: req.user.uuid });

        user.assign({
          onboardingComplete: true,
        });

        await em.persistAndFlush(user);
      }

      res.json({ data: project });
    } catch (e) {
      next(e);
    }
  },
);

router.post(
  '/:clientUuid/report-request',
  passport.authenticate('jwt', { session: false }),
  userHasType([UserTypes.ADMIN, UserTypes.CLIENT]),
  async (req: any, res: any, next: NextFunction) => {
    try {
      if (req.user.type === 'client' && req.user.clientUuid !== req.params.clientUuid) {
        throw new AuthorizationError();
      }

      const email = req.user.email;
      const name = `${req.user.firstName} ${req.user.lastName}`;
      const client = await DI.clientRepo.findOneOrFail({ uuid: req.params.clientUuid });
      await handleSendClientReportRequestLog({ name, companyName: client.name, email });
      return res.status(200).send();
    } catch (e) {
      return next(e);
    }
  },
);

router.post(
  '/',
  uploadImage.single('logo'),
  async (req: Request<{}, {}, ClientPostReq>, res: Response<ApiRes<Client>>, next: NextFunction) => {
    const em = DI.orm.em.fork(false);
    const file = req.file;
    try {
      if (!validateCode(req.body.code)) {
        res.status(403).send();
      } else {
        req.body.clientLocations = JSON.parse(req.body.clientLocations);
        const parsed = clientNewUpdateFormSchema.parse(req.body);
        const clientLocations = JSON.parse(JSON.stringify(parsed.clientLocations));
        delete parsed.clientLocations;

        const client = wrap(new Client()).assign(parsed, { em: em });
        const locations: ClientLocation[] = [];
        clientLocations.forEach((loc: { country: string; provinces: string[] }) => {
          loc.provinces.forEach((prov: string) => {
            locations.push(
              wrap(new ClientLocation()).assign(
                {
                  country: loc.country,
                  province: prov,
                  client,
                },
                { em: em },
              ),
            );
          });
        });
        const foundVertical = await DI.verticalRepo.findOneOrFail({ uuid: parsed.vertical });
        client.vertical = foundVertical;

        await em.persistAndFlush(locations);
        if (file) {
          const result = await uploadFile(file, MediaEntityTypes.CLIENT, 'logo', client.mediaUuid);
          client.logo = result.Location;
        }

        await em.persistAndFlush(client);

        // After the client has been successfully created, create a new company in hubspot and store it on the client
        try {
          const hubspotResponse = await hubspot.companyCreate({
            name: client.name,
            about_us: client.description,
            owneremail: client.contactEmail,
            phone: client.contactPhoneNumber,
            domain: client.websiteUrl,
          });
          client.hubspotId = hubspotResponse.id;
          await em.persistAndFlush(client);
        } catch (e) {
          logger.error(`Hubspot failed to create client ${client.name}`);
        }

        // Create a new deal for the client with some default values
        if (client.hubspotId) {
          try {
            const hubspotResponse = await hubspot.dealCreate({
              dealname: client.name,
              // TODO can remove defaults once all envs have values set
              pipeline: process.env.HUBSPOT_CLIENT_NEW_PIPELINE || 'default',
              // TODO can remove defaults once all envs have values set
              dealstage: process.env.HUBSPOT_CLIENT_NEW_DEALSTAGE || 'qualifiedtobuy',
            });
            await hubspot.companyAssociateToDeal(client.hubspotId, hubspotResponse.id);
          } catch (e) {
            logger.error(`Hubspot failed to create client deal ${client.name}`);
          }
        }

        client.signMedia();
        res.json({ data: client });
      }
    } catch (e) {
      next(e);
    }
  },
);

router.put(
  `/:clientUuid`,
  passport.authenticate('jwt', { session: false }),
  userHasType([UserTypes.ADMIN, UserTypes.CLIENT]),
  uploadImage.single('logo'),
  async (req: any, res: any, next: NextFunction) => {
    const em = DI.orm.em.fork(false);
    const file = req.file;
    const whereQuery: { uuid: string; users?: string } = { uuid: req.params.clientUuid };
    if (req.user.type !== UserTypes.ADMIN) {
      whereQuery.users = req.user.uuid;
    }
    try {
      const client = await DI.clientRepo.findOneOrFail(whereQuery, { populate: ['clientLocations'] });
      const oldLocations = client.clientLocations.getItems();

      const parsedClientLocations: { country: string; provinces: string[] }[] = JSON.parse(req.body.clientLocations);
      req.body.clientLocations = parsedClientLocations;

      parsedClientLocations.forEach((location) =>
        location.provinces.forEach((province: string) =>
          client.clientLocations.add(
            wrap(new ClientLocation()).assign({ country: location.country, province, client }, { em }),
          ),
        ),
      );

      const parsed = clientNewUpdateFormSchema.parse(req.body);
      delete parsed.clientLocations;
      if (parsed.vertical && parsed.vertical !== 'null' && parsed.vertical !== 'undefined') {
        // Silently fail if we are given an invalid vertical
        const foundVertical = await DI.verticalRepo.findOne({ uuid: parsed.vertical });
        if (foundVertical) {
          client.vertical = foundVertical;
        }
      } else {
        delete parsed.vertical;
      }

      if (parsed.clientType && parsed.clientType !== 'null' && parsed.clientType !== 'undefined') {
        // Silently fail if we are given an invalid client type
        const foundClientType = await DI.clientTypeRepo.findOne({ uuid: parsed.clientType });
        if (foundClientType) {
          client.clientType = foundClientType;
        }
      } else {
        delete parsed.clientType;
      }
      client.assign(parsed);

      if (file) {
        const result = await uploadFile(file, MediaEntityTypes.CLIENT, 'logo', client.mediaUuid);
        client.logo = result.Location;
      }

      const user = await DI.userRepo.findOne({ uuid: req.user.uuid });
      if (!user.onboardingComplete) {
        user.onboardingComplete = true;
        await em.persistAndFlush(user);
      }

      await em.persistAndFlush(client);
      await em.removeAndFlush(oldLocations);

      client.signMedia();
      res.json({ data: client });
    } catch (e) {
      next(e);
    }
  },
);

router.get(
  `/:clientUuid/projects/:projectUuid/requirements/:requirementUuid`,
  passport.authenticate('jwt', { session: false }),
  async (req: any, res: any, next: NextFunction) => {
    try {
      // TODO: Probably a cleaner way to do this
      if (req.user.type === UserTypes.CLIENT) {
        const user = await DI.userRepo.findOneOrFail({ uuid: req.user.uuid }, { populate: ['client'] });
        if (user.client.uuid !== req.params.clientUuid) {
          throw new AuthenticationError();
        }
      }
      const requirement = await DI.requirementRepo.findOneOrFail(
        {
          uuid: req.params.requirementUuid,
          project: { uuid: req.params.projectUuid, client: { uuid: req.params.clientUuid } },
        },
        {
          populate: ['partner', 'requirementDocuments'],
        },
      );
      // TODO probably a cleaner way to do this
      if (req.user.type === UserTypes.PARTNER) {
        const user = await DI.userRepo.findOneOrFail({ uuid: req.user.uuid }, { populate: ['partner'] });
        if (user.partner.uuid !== requirement.partner.uuid) {
          throw new AuthenticationError();
        }
      }
      if (requirement.requirementDocuments) {
        for (const document of requirement.requirementDocuments) {
          if (document.type === RequirementDocumentTypes.FILE) {
            document.signMedia();
          }
        }
      }

      res.json({ data: requirement });
    } catch (e) {
      next(e);
    }
  },
);

router.put(
  `/:clientUuid/projects/:projectUuid/requirements/:requirementUuid/assign-partner`,
  passport.authenticate('jwt', { session: false }),
  userHasType([UserTypes.CLIENT]),
  async (req: Request, res: Response<ApiRes<Requirement>>, next: NextFunction) => {
    const em = DI.orm.em.fork(false);
    try {
      // TODO: Probably a cleaner way to do this
      const user = await DI.userRepo.findOneOrFail({ uuid: req.user.uuid }, { populate: ['client'] });
      if (user.client.uuid !== req.params.clientUuid) {
        throw new AuthenticationError();
      }
      const requirement = await DI.requirementRepo.findOneOrFail(
        {
          uuid: req.params.requirementUuid,
          project: { uuid: req.params.projectUuid, client: { uuid: req.params.clientUuid } },
        },
        {
          populate: ['partner', 'project', 'project.client', 'project.projectType.initiative'],
        },
      );
      const parsed = assignPartnerToRequirementSchema.parse(req.body);
      const partner = await DI.partnerRepo.findOneOrFail({ uuid: parsed.partnerUuid });
      requirement.partner = partner;
      requirement.requestStatus = RequirementRequestStatus.PENDING;
      await em.persistAndFlush(requirement);

      // Check if the partner has manually opted out of marketing,
      // or if their email has previously bounced / complained
      const marketingEnabled = !partner.marketingDisabledAt;
      let bouncedOrComplained = false;
      try {
        const result = await DI.orm.em
          .createQueryBuilder(EmailEvent)
          .where('lower(email) = lower(?)', [partner.contactEmail])
          .getSingleResult();
        bouncedOrComplained = !!result;
      } catch (e) { }

      if (marketingEnabled && !bouncedOrComplained) {
        await handleSendPartnerConnectionLog({
          clientName: `${req.user.firstName} ${req.user.lastName}`,
          clientEmail: req.user.email,
          clientCompany: requirement.project.client.name,
          partner: partner.name,
          partnerEmail: partner.contactEmail,
        });
        await handleSendPartnerPartnerConnectionRequest({
          clientName: requirement.project.client.name,
          partnerUuid: partner.uuid,
          requirementUuid: requirement.uuid,
          to: [partner.contactEmail],
        });
      }

      await handleSendClientPartnerConnectionRequest({
        partnerName: partner.name,
        clientUuid: requirement.project.client.uuid,
        to: [requirement.project.client.contactEmail],
      });

      res.json({ data: requirement });
    } catch (e) {
      next(e);
    }
  },
);

router.put(
  `/:clientUuid/projects/:projectUuid/requirements/:requirementUuid/update-status`,
  passport.authenticate('jwt', { session: false }),
  userHasType([UserTypes.CLIENT, UserTypes.PARTNER, UserTypes.ADMIN]),
  async (
    req: Request<
      { clientUuid: string; projectUuid: string; requirementUuid: string },
      {},
      ClientRequirementStatusUpdateReq
    >,
    res: Response<ApiRes<Requirement>>,
    next: NextFunction,
  ) => {
    const em = DI.orm.em.fork(false);
    try {
      const requirement = await DI.requirementRepo.findOneOrFail({
        uuid: req.params.requirementUuid,
      });

      if (req.user.type === 'client' && req.user.clientUuid !== req.params.clientUuid) {
        throw new AuthorizationError();
      }

      if (req.user.type === 'partner' && req.user.partnerUuid !== requirement.partner.uuid) {
        throw new AuthorizationError();
      }

      translateDates(req.body);
      const parsed = clientRequirementStatusUpdateSchema.parse(req.body);

      // Partners should only be able to edit the status field
      if (req.user.type === 'partner') {
        if (parsed.status) {
          requirement.status = parsed.status;
        }
      } else {
        Object.keys(parsed).forEach((key) => {
          requirement[key] = parsed[key];
        });
      }

      await em.persistAndFlush(requirement);
      res.json({ data: requirement });
    } catch (e) {
      next(e);
    }
  },
);

router.put(
  `/:clientUuid/projects/:projectUuid/update-status`,
  passport.authenticate('jwt', { session: false }),
  userHasType([UserTypes.CLIENT, UserTypes.ADMIN]),
  async (
    req: Request<{ clientUuid: string; projectUuid: string }, {}, ClientProjectStatusUpdateReq>,
    res: Response<ApiRes<Project>>,
    next: NextFunction,
  ) => {
    const em = DI.orm.em.fork(false);
    try {
      if (req.user.type !== UserTypes.ADMIN) {
        const user = await DI.userRepo.findOneOrFail({ uuid: req.user.uuid }, { populate: ['client'] });
        if (user.client.uuid !== req.params.clientUuid) {
          throw new AuthenticationError();
        }
      }

      const project = await DI.projectRepo.findOneOrFail({
        uuid: req.params.projectUuid,
      });
      translateDates(req.body);
      const parsed = clientProjectStatusUpdateSchema.parse(req.body);
      Object.keys(parsed).forEach((key) => {
        project[key] = parsed[key];
      });

      await em.persistAndFlush(project);
      res.json({ data: project });
    } catch (e) {
      next(e);
    }
  },
);

export const ClientController = router;
