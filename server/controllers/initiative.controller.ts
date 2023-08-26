import { NextFunction, Request, Response, Router } from 'express';
import { QueryOrder } from '@mikro-orm/core';
import passport from 'passport';

import { ApiRes } from '../interfaces';
import { Initiative, ProjectType, UserTypes } from '../entities';
import { DI } from '../index';
import { userHasType } from '../lib/util';

const router = Router();

router.get('/', async (req: Request, res: Response<ApiRes<Initiative[]>>, next: NextFunction) => {
  try {
    const initiatives = await DI.initiativeRepo.findAll({ orderBy: { name: QueryOrder.ASC } });
    initiatives.map((i: Initiative) => i.signMedia());
    res.json({ data: initiatives });
  } catch (e) {
    next(e);
  }
});

router.get(
  `/:initiativeUuid/projectTypes/`,
  async (req: Request<{ initiativeUuid: string }>, res: Response<ApiRes<ProjectType[]>>, next: NextFunction) => {
    try {
      const projectTypes = await DI.projectTypeRepo.find(
        { initiative: { uuid: req.params.initiativeUuid } },
        { orderBy: { name: QueryOrder.ASC }, populate: ['requirementTypes', 'initiative'] },
      );

      for (const type of projectTypes) {
        type.signMedia();
      }

      res.json({ data: projectTypes });
    } catch (e) {
      next(e);
    }
  },
);

router.get(
  '/:initiativeUuid',
  passport.authenticate('jwt', { session: false }),
  userHasType([UserTypes.CLIENT]),
  async (req: Request<{ initiativeUuid: string }>, res: Response<ApiRes<{ name: string }>>, next: NextFunction) => {
    try {
      const initiative = await DI.initiativeRepo.findOneOrFail({ uuid: req.params.initiativeUuid });
      res.json({ data: { name: initiative.name } });
    } catch (e) {
      next(e);
    }
  },
);

export const InitiativeController = router;
