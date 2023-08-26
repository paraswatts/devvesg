import { NextFunction, Request, Response, Router } from 'express';
import { QueryOrder, wrap } from '@mikro-orm/core';
import passport from 'passport';
import * as z from 'zod';

import { ApiRes, MediaEntityTypes, WalletRegistration, WalletDetails } from '../../interfaces';
import {
  Client,
  Project,
  Requirement,
  UserTypes,
  ClientLocation,
  ProjectStatuses,
  RequirementStatuses,
} from '../../entities';
import { DI } from '../../index';
import { getMulterImageConfig, userHasType } from '../../lib/util';
import { uploadFile } from '../../config/s3';
import { projectNewFormSchema, translateDates } from '../consts';
import { registerMktPlaceWallet } from '../../services/wallet.service';

const router = Router();

const upload = getMulterImageConfig();

export type ClientPostReq = {
  name: string;
  stockTicker?: string;
  description?: string;
  contactEmail: string;
  websiteUrl?: string;
  contactPhoneNumber?: string;
  twitterUrl?: string;
  linkedInUrl?: string;
  vertical: string;
  clientLocations: string;
  code?: string;
};

type ProjectFetchReq = {
  projectUuid: string;
  clientUuid: string;
};

export type ProjectPostReq = {
  name: string;
  description: string;
  status: ProjectStatuses;
  startDate: Date;
  endGoalDate: Date;
  completionDate: Date;
  projectTypeUuid: string;
};

export type ProjectPutReq = Omit<ProjectPostReq, 'projectTypeUuid'>;

export type RequirementFetchReq = ProjectFetchReq & { requirementUuid: string };

type RequirementPostReq = {
  name: string;
  description: string;
  status: string;
  startDate: Date;
  endDate: Date;
  areaCode: string;
  projectCode: string;
};

export const clientNewUpdateFormSchema = z.object({
  name: z.string().nonempty(),
  stockTicker: z.string().optional(),
  description: z.string().optional(),
  contactEmail: z.string().email().nonempty(),
  websiteUrl: z.string().nonempty(),
  contactPhoneNumber: z.string().optional(),
  twitterUrl: z.string().optional(),
  linkedInUrl: z.string().optional(),
  vertical: z.string().optional(),
  clientType: z.string().optional(),
  clientLocations: z.array(
    z.object({
      country: z.string(),
      provinces: z.array(z.string()),
    }),
  ),
});

const requirementNewUpdateFormSchema = z.object({
  name: z.string().nonempty(),
  description: z.string().nonempty(),
  status: z.enum([
    RequirementStatuses.DONE,
    RequirementStatuses.NOT_STARTED,
    RequirementStatuses.IN_PROGRESS,
    RequirementStatuses.ON_HOLD,
  ]),
  partnerUuid: z.string(),
  projectCode: z.string(),
  areaCode: z.string(),
  startDate: z.date().optional().nullable(),
  endDate: z.date().optional().nullable(),
});

const projectUpdateFormSchema = projectNewFormSchema.omit({ projectTypeUuid: true });

router.get(
  '/:clientUuid',
  passport.authenticate('jwt', { session: false }),
  userHasType([UserTypes.ADMIN]),
  async (req: Request<{ clientUuid: string }>, res: Response<ApiRes<Client>>, next: NextFunction) => {
    try {
      const client = await DI.clientRepo.findOneOrFail(
        { uuid: req.params.clientUuid },
        { populate: ['clientLocations', 'vertical', 'clientType'] },
      );
      const newClientLocations: { country: string; provinces: string[] }[] = [];
      client.clientLocations.getItems().forEach((location) => {
        const existingCountry = newClientLocations.find((val) => val.country === location.country);
        if (!existingCountry) {
          newClientLocations.push({
            country: location.country,
            provinces: [location.province],
          });
        } else {
          existingCountry.provinces.push(location.province);
        }
      });

      client.signMedia();
      client.clientLocations = newClientLocations as any;
      res.json({ data: client });
    } catch (e) {
      next(e);
    }
  },
);

router.get(
  `/:clientUuid/projects`,
  passport.authenticate('jwt', { session: false }),
  userHasType([UserTypes.ADMIN]),
  async (req: Request<{ clientUuid: string }>, res: Response<ApiRes<Project[]>>, next: NextFunction) => {
    try {
      const projects = await DI.projectRepo.find(
        { client: { uuid: req.params.clientUuid } },
        { orderBy: { name: QueryOrder.ASC } },
      );

      res.json({ data: projects });
    } catch (e) {
      next(e);
    }
  },
);

router.get(
  `/:clientUuid/projects/:projectUuid`,
  passport.authenticate('jwt', { session: false }),
  userHasType([UserTypes.ADMIN]),
  async (req: Request<ProjectFetchReq>, res: Response<ApiRes<Project>>, next: NextFunction) => {
    try {
      const project = await DI.projectRepo.findOneOrFail({
        uuid: req.params.projectUuid,
        client: { uuid: req.params.clientUuid },
      });

      res.json({ data: project });
    } catch (e) {
      next(e);
    }
  },
);

router.put(
  `/:clientUuid/projects/:projectUuid`,
  passport.authenticate('jwt', { session: false }),
  userHasType([UserTypes.ADMIN]),
  async (req: Request<ProjectFetchReq, {}, ProjectPutReq>, res: Response<ApiRes<Project>>, next: NextFunction) => {
    const em = DI.orm.em.fork(false);
    try {
      const project = await DI.projectRepo.findOneOrFail({
        uuid: req.params.projectUuid,
        client: { uuid: req.params.clientUuid },
      });
      translateDates(req.body);
      const parsed = projectUpdateFormSchema.parse(req.body);

      project.assign(parsed);

      await em.persistAndFlush(project);

      res.json({ data: project });
    } catch (e) {
      next(e);
    }
  },
);

router.delete(
  `/:clientUuid/projects/:projectUuid`,
  passport.authenticate('jwt', { session: false }),
  userHasType([UserTypes.ADMIN]),
  async (req: Request<ProjectFetchReq>, res: Response<ApiRes<null>>, next: NextFunction) => {
    const em = DI.orm.em.fork(false);
    try {
      const project = await DI.projectRepo.findOneOrFail(
        {
          uuid: req.params.projectUuid,
          client: { uuid: req.params.clientUuid },
        },
        ['requirements'],
      );

      await em.removeAndFlush(project);

      res.json({ data: null });
    } catch (e) {
      next(e);
    }
  },
);

router.get(
  `/:clientUuid/projects/:projectUuid/requirements`,
  passport.authenticate('jwt', { session: false }),
  userHasType([UserTypes.ADMIN]),
  async (req: Request<ProjectFetchReq>, res: Response<ApiRes<Requirement[]>>, next: NextFunction) => {
    try {
      const requirements = await DI.requirementRepo.find(
        { project: { uuid: req.params.projectUuid, client: { uuid: req.params.clientUuid } } },
        { orderBy: { name: QueryOrder.ASC } },
      );

      res.json({ data: requirements });
    } catch (e) {
      next(e);
    }
  },
);

router.get(
  `/:clientUuid/projects/:projectUuid/requirements/:requirementUuid`,
  passport.authenticate('jwt', { session: false }),
  userHasType([UserTypes.ADMIN]),
  async (req: Request<RequirementFetchReq>, res: Response<ApiRes<Requirement>>, next: NextFunction) => {
    try {
      const requirement = await DI.requirementRepo.findOneOrFail(
        {
          uuid: req.params.requirementUuid,
          project: { uuid: req.params.projectUuid, client: { uuid: req.params.clientUuid } },
        },
        ['partner'],
      );

      res.json({ data: requirement });
    } catch (e) {
      next(e);
    }
  },
);

router.post(
  `/:clientUuid/projects/:projectUuid/requirements`,
  passport.authenticate('jwt', { session: false }),
  userHasType([UserTypes.ADMIN]),
  async (
    req: Request<ProjectFetchReq, {}, RequirementPostReq>,
    res: Response<ApiRes<Requirement>>,
    next: NextFunction,
  ) => {
    const em = DI.orm.em.fork(false);
    try {
      translateDates(req.body);
      const parsed = requirementNewUpdateFormSchema.parse(req.body);
      const project = await DI.projectRepo.findOneOrFail({
        uuid: req.params.projectUuid,
        client: { uuid: req.params.clientUuid },
      });

      const requirement = wrap(new Requirement()).assign(
        {
          name: parsed.name,
          description: parsed.description,
          status: parsed.status,
          projectCode: parsed.projectCode,
          areaCode: parsed.areaCode,
          startDate: parsed.startDate,
          endDate: parsed.endDate,
          project,
        },
        { em },
      );

      if (parsed.partnerUuid) {
        const partner = await DI.partnerRepo.findOneOrFail({ uuid: parsed.partnerUuid });
        requirement.partner = partner;
      }

      await em.persistAndFlush(requirement);

      res.json({ data: requirement });
    } catch (e) {
      next(e);
    }
  },
);

router.put(
  `/:clientUuid/projects/:projectUuid/requirements/:requirementUuid`,
  passport.authenticate('jwt', { session: false }),
  userHasType([UserTypes.ADMIN]),
  async (
    req: Request<RequirementFetchReq, {}, RequirementPostReq>,
    res: Response<ApiRes<Requirement>>,
    next: NextFunction,
  ) => {
    const em = DI.orm.em.fork(false);
    try {
      const requirement = await DI.requirementRepo.findOneOrFail({
        uuid: req.params.requirementUuid,
        project: { uuid: req.params.projectUuid, client: { uuid: req.params.clientUuid } },
      });

      translateDates(req.body);
      const parsed = requirementNewUpdateFormSchema.parse(req.body);

      requirement.assign(parsed);

      if (parsed.partnerUuid) {
        const partner = await DI.partnerRepo.findOneOrFail({ uuid: parsed.partnerUuid });
        requirement.partner = partner;
      } else {
        requirement.partner = null;
      }

      await em.persistAndFlush(requirement);

      res.json({ data: requirement });
    } catch (e) {
      next(e);
    }
  },
);

router.delete(
  `/:clientUuid/projects/:projectUuid/requirements/:requirementUuid`,
  passport.authenticate('jwt', { session: false }),
  userHasType([UserTypes.ADMIN]),
  async (req: Request<RequirementFetchReq>, res: Response<ApiRes<null>>, next: NextFunction) => {
    const em = DI.orm.em.fork(false);
    try {
      const requirement = await DI.requirementRepo.findOneOrFail({
        uuid: req.params.requirementUuid,
        project: { uuid: req.params.projectUuid, client: { uuid: req.params.clientUuid } },
      });

      await em.removeAndFlush(requirement);

      res.json({ data: null });
    } catch (e) {
      next(e);
    }
  },
);

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  userHasType([UserTypes.ADMIN]),
  upload.single('logo'),
  async (req: Request<{}, {}, ClientPostReq>, res: Response<ApiRes<Client>>, next: NextFunction) => {
    const em = DI.orm.em.fork(false);
    const file = req.file;
    try {
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
      client.signMedia();
      res.json({ data: client});
    } catch (e) {
      next(e);
    }
  },
);

export const AdminClientController = router;
