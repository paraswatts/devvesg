import { NextFunction, Request, Response, Router } from 'express';
import { wrap } from '@mikro-orm/core';
import passport from 'passport';
import * as z from 'zod';

import { ApiRes, MediaEntityTypes } from '../../interfaces';
import { Initiative, ProjectType, UserTypes, RequirementType, Partner } from '../../entities';
import { DI } from '../../index';
import { getMulterImageConfig, userHasType } from '../../lib/util';
import { uploadFile } from '../../config/s3';

const router = Router();

const upload = getMulterImageConfig();

type InitiativePostReq = {
  name: string;
  objective: string;
};

type ProjectTypePostReq = {
  name: string;
  objective: string;
};

type ProjectTypeFetchParams = {
  initiativeUuid: string;
  projectTypeUuid: string;
};

type RequirementTypePostReq = {
  name: string;
  description: string;
};

type RequirementTypeSortOrderReq = Array<RequirementTypePostReq & { uuid: string; sortOrder: number }>;

type RequirementTypeFetchParams = {
  projectTypeUuid: string;
  requirementTypeUuid: string;
};

const initiativeNewUpdateFormSchema = z.object({
  name: z.string().nonempty(),
  objective: z.string().nonempty(),
});

const projectTypeNewUpdateFormSchema = z.object({
  name: z.string().nonempty(),
  objective: z.string().nonempty(),
});

const requirementTypeNewUpdateFormSchema = z.object({
  name: z.string().nonempty(),
  description: z.string().nonempty(),
  partnerUuids: z.array(z.string()),
});

router.get(
  '/:initiativeUuid',
  passport.authenticate('jwt', { session: false }),
  userHasType([UserTypes.ADMIN]),
  async (req: Request<{ initiativeUuid: string }>, res: Response<ApiRes<Initiative>>, next: NextFunction) => {
    try {
      const initiative = await DI.initiativeRepo.findOneOrFail({ uuid: req.params.initiativeUuid });
      initiative.signMedia();
      res.json({ data: initiative });
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
  async (req: Request<{}, {}, InitiativePostReq>, res: Response<ApiRes<Initiative>>, next: NextFunction) => {
    const em = DI.orm.em.fork(false);
    const file = req.file;
    try {
      const parsed = initiativeNewUpdateFormSchema.parse(req.body);
      const initiative = new Initiative().assign(parsed);

      const result = await uploadFile(file, MediaEntityTypes.INITIATIVE, 'logo', initiative.mediaUuid);
      initiative.logo = result.Location;

      await em.persistAndFlush(initiative);
      initiative.signMedia();
      res.json({ data: initiative });
    } catch (e) {
      next(e);
    }
  },
);

router.put(
  `/:initiativeUuid`,
  passport.authenticate('jwt', { session: false }),
  userHasType([UserTypes.ADMIN]),
  upload.single('logo'),
  async (
    req: Request<{ initiativeUuid: string }, {}, InitiativePostReq>,
    res: Response<ApiRes<Initiative>>,
    next: NextFunction,
  ) => {
    const em = DI.orm.em.fork(false);
    const file = req.file;
    try {
      const initiative = await DI.initiativeRepo.findOneOrFail({ uuid: req.params.initiativeUuid });
      const parsed = initiativeNewUpdateFormSchema.parse(req.body);
      initiative.assign(parsed);

      if (file) {
        const result = await uploadFile(file, MediaEntityTypes.INITIATIVE, 'logo', initiative.mediaUuid);
        initiative.logo = result.Location;
      }

      await em.persistAndFlush(initiative);
      initiative.signMedia();
      res.json({ data: initiative });
    } catch (e) {
      next(e);
    }
  },
);

router.get(
  `/:initiativeUuid/projectTypes/:projectTypeUuid`,
  passport.authenticate('jwt', { session: false }),
  userHasType([UserTypes.ADMIN]),
  async (req: Request<ProjectTypeFetchParams>, res: Response<ApiRes<ProjectType>>, next: NextFunction) => {
    try {
      const projectType = await DI.projectTypeRepo.findOneOrFail(
        {
          uuid: req.params.projectTypeUuid,
          initiative: { uuid: req.params.initiativeUuid },
        },
        { populate: ['requirementTypes'] },
      );

      projectType.signMedia();

      res.json({ data: projectType });
    } catch (e) {
      next(e);
    }
  },
);

router.post(
  `/:initiativeUuid/projectTypes`,
  passport.authenticate('jwt', { session: false }),
  userHasType([UserTypes.ADMIN]),
  upload.single('logo'),
  async (
    req: Request<{ initiativeUuid: string }, {}, ProjectTypePostReq>,
    res: Response<ApiRes<ProjectType>>,
    next: NextFunction,
  ) => {
    const em = DI.orm.em.fork(false);
    const file = req.file;
    try {
      const parsed = projectTypeNewUpdateFormSchema.parse(req.body);
      const initiative = await DI.initiativeRepo.findOneOrFail({ uuid: req.params.initiativeUuid });

      const projectType = wrap(new ProjectType()).assign(
        {
          name: parsed.name,
          objective: parsed.objective,
          initiative,
        },
        { em },
      );

      if (file) {
        const result = await uploadFile(file, MediaEntityTypes.PROJECT_TYPE, 'logo', projectType.mediaUuid);
        projectType.logo = result.Location;
      }

      await em.persistAndFlush(projectType);
      projectType.signMedia();
      res.json({ data: projectType });
    } catch (e) {
      next(e);
    }
  },
);

router.put(
  `/:initiativeUuid/projectTypes/:projectTypeUuid`,
  passport.authenticate('jwt', { session: false }),
  userHasType([UserTypes.ADMIN]),
  upload.single('logo'),
  async (
    req: Request<ProjectTypeFetchParams, {}, ProjectTypePostReq>,
    res: Response<ApiRes<ProjectType>>,
    next: NextFunction,
  ) => {
    const em = DI.orm.em.fork(false);
    const file = req.file;
    try {
      const projectType = await DI.projectTypeRepo.findOneOrFail({
        uuid: req.params.projectTypeUuid,
        initiative: { uuid: req.params.initiativeUuid },
      });
      const parsed = projectTypeNewUpdateFormSchema.parse(req.body);

      projectType.assign(parsed);
      if (file) {
        const result = await uploadFile(file, MediaEntityTypes.PROJECT_TYPE, 'logo', projectType.mediaUuid);
        projectType.logo = result.Location;
      }

      await em.persistAndFlush(projectType);
      projectType.signMedia();
      res.json({ data: projectType });
    } catch (e) {
      next(e);
    }
  },
);

router.get(
  `/:initiativeUuid/projectTypes/:projectTypeUuid/requirementTypes`,
  passport.authenticate('jwt', { session: false }),
  userHasType([UserTypes.ADMIN]),
  async (req: Request<ProjectTypeFetchParams>, res: Response<ApiRes<RequirementType[]>>, next: NextFunction) => {
    try {
      const requirementTypes = await DI.requirementTypeRepo.find({
        projectType: req.params.projectTypeUuid,
      });

      res.json({ data: requirementTypes });
    } catch (e) {
      next(e);
    }
  },
);

router.get(
  `/:initiativeUuid/projectTypes/:projectTypeUuid/requirementTypes/:requirementTypeUuid`,
  passport.authenticate('jwt', { session: false }),
  userHasType([UserTypes.ADMIN]),
  async (req: Request<RequirementTypeFetchParams>, res: Response<ApiRes<RequirementType>>, next: NextFunction) => {
    try {
      const requirementType = await DI.requirementTypeRepo.findOneOrFail(
        {
          uuid: req.params.requirementTypeUuid,
          projectType: { uuid: req.params.projectTypeUuid },
        },
        { populate: ['partners'] },
      );

      res.json({ data: requirementType });
    } catch (e) {
      next(e);
    }
  },
);

router.post(
  `/:initiativeUuid/projectTypes/:projectTypeUuid/requirementTypes`,
  passport.authenticate('jwt', { session: false }),
  userHasType([UserTypes.ADMIN]),
  async (
    req: Request<{ initiativeUuid: string; projectTypeUuid: string }, {}, RequirementTypePostReq>,
    res: Response<ApiRes<RequirementType>>,
    next: NextFunction,
  ) => {
    const em = DI.orm.em.fork(false);
    try {
      const parsed = requirementTypeNewUpdateFormSchema.parse(req.body);
      const projectType = await DI.projectTypeRepo.findOneOrFail({ uuid: req.params.projectTypeUuid });
      const partners = await DI.partnerRepo.find({ uuid: parsed.partnerUuids });

      const requirementType = wrap(new RequirementType()).assign(
        {
          name: parsed.name,
          description: parsed.description,
          projectType,
          partners,
        },
        { em },
      );

      await em.persistAndFlush(requirementType);

      res.json({ data: requirementType });
    } catch (e) {
      next(e);
    }
  },
);

router.put(
  `/:initiativeUuid/projectTypes/:projectTypeUuid/requirementTypes/:requirementTypeUuid`,
  passport.authenticate('jwt', { session: false }),
  userHasType([UserTypes.ADMIN]),
  async (
    req: Request<RequirementTypeFetchParams, {}, RequirementTypePostReq>,
    res: Response<ApiRes<RequirementType>>,
    next: NextFunction,
  ) => {
    const em = DI.orm.em.fork(false);
    try {
      const requirementType = await DI.requirementTypeRepo.findOneOrFail({
        uuid: req.params.requirementTypeUuid,
        projectType: { uuid: req.params.projectTypeUuid },
      });
      const parsed = requirementTypeNewUpdateFormSchema.parse(req.body);
      const partners = await DI.partnerRepo.find({ uuid: parsed.partnerUuids });
      requirementType.assign(parsed);
      requirementType.partners.set(partners);

      await em.persistAndFlush(requirementType);

      res.json({ data: requirementType });
    } catch (e) {
      next(e);
    }
  },
);

router.put(
  `/:initiativeUuid/projectTypes/:projectTypeUuid/requirement-type-sort`,
  passport.authenticate('jwt', { session: false }),
  userHasType([UserTypes.ADMIN]),
  async (
    req: Request<ProjectTypeFetchParams, {}, RequirementTypeSortOrderReq>,
    res: Response<ApiRes<RequirementType[]>>,
    next: NextFunction,
  ) => {
    const em = DI.orm.em.fork(false);
    try {
      const promises: Promise<any>[] = [];
      req.body.forEach((rt, index) => {
        const promise = new Promise<RequirementType>(async (resolve, rej) => {
          try {
            const requirementType = await DI.requirementTypeRepo.findOneOrFail({
              uuid: rt.uuid,
              projectType: { uuid: req.params.projectTypeUuid },
            });
            requirementType.sortOrder = rt.sortOrder;
            resolve(requirementType);
          } catch {
            rej();
          }
        });
        promises.push(promise);
      });

      const requirementTypes: RequirementType[] = await Promise.all(promises);
      await em.persistAndFlush(requirementTypes);
      res.json({ data: requirementTypes });
    } catch (e) {
      next(e);
    }
  },
);

export const AdminInitiativeController = router;
