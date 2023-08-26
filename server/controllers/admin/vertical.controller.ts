import { NextFunction, Request, Response, Router } from 'express';
import passport from 'passport';
import * as z from 'zod';

import { ApiRes } from '../../interfaces';
import { DI } from '../../index';
import { userHasType } from '../../lib/util';
import { UserTypes, Vertical } from '../../entities';

const router = Router();

type VerticalPostPutReq = {
  name: string;
};

type VerticalFetchReq = {
  verticalUuid: string;
};

const verticalNewUpdateFormSchema = z.object({
  name: z.string().nonempty(),
});

router.get(
  '/:verticalUuid',
  passport.authenticate('jwt', { session: false }),
  userHasType([UserTypes.ADMIN]),
  async (req: Request, res: Response<ApiRes<Vertical>>, next: NextFunction) => {
    try {
      const vertical = await DI.verticalRepo.findOneOrFail({ uuid: req.params.verticalUuid });
      res.json({ data: vertical });
    } catch (e) {
      next(e);
    }
  },
);

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  userHasType([UserTypes.ADMIN]),
  async (req: Request<{}, {}, VerticalPostPutReq>, res: Response<ApiRes<Vertical>>, next: NextFunction) => {
    const em = DI.orm.em.fork(false);
    try {
      const parsed = verticalNewUpdateFormSchema.parse(req.body);
      const vertical = new Vertical().assign(parsed);

      await em.persistAndFlush(vertical);
      res.json({ data: vertical });
    } catch (e) {
      next(e);
    }
  },
);

router.put(
  `/:verticalUuid`,
  passport.authenticate('jwt', { session: false }),
  userHasType([UserTypes.ADMIN]),
  async (
    req: Request<VerticalFetchReq, {}, VerticalPostPutReq>,
    res: Response<ApiRes<Vertical>>,
    next: NextFunction,
  ) => {
    const em = DI.orm.em.fork(false);
    try {
      const vertical = await DI.verticalRepo.findOneOrFail({ uuid: req.params.verticalUuid });
      const parsed = verticalNewUpdateFormSchema.parse(req.body);
      vertical.assign(parsed);

      await em.persistAndFlush(vertical);
      res.json({ data: vertical });
    } catch (e) {
      next(e);
    }
  },
);

router.delete(
  `/:verticalUuid`,
  passport.authenticate('jwt', { session: false }),
  userHasType([UserTypes.ADMIN]),
  async (
    req: Request<VerticalFetchReq, {}, VerticalPostPutReq>,
    res: Response<ApiRes<Vertical>>,
    next: NextFunction,
  ) => {
    const em = DI.orm.em.fork(false);
    try {
      const vertical = await DI.verticalRepo.findOneOrFail({ uuid: req.params.verticalUuid });
      await em.removeAndFlush(vertical);

      res.status(200).send();
    } catch (e) {
      next(e);
    }
  },
);

export const AdminVerticalController = router;
