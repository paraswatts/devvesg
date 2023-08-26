import { NextFunction, Request, Response, Router } from 'express';
import passport from 'passport';
import * as z from 'zod';

import { ApiRes } from '../../interfaces';
import { Service, UserTypes } from '../../entities';
import { DI } from '../../index';
import { userHasType } from '../../lib/util';

const router = Router();

type ServicePostReq = {
  name: string;
};

type ServiceFetchReq = {
  serviceUuid: string;
};

const serviceNewUpdateFormSchema = z.object({
  name: z.string().nonempty(),
});

router.get(
  '/:serviceUuid',
  passport.authenticate('jwt', { session: false }),
  userHasType([UserTypes.ADMIN]),
  async (req: Request<ServiceFetchReq>, res: Response<ApiRes<Service>>, next: NextFunction) => {
    try {
      const service = await DI.serviceRepo.findOneOrFail({ uuid: req.params.serviceUuid });
      res.json({ data: service });
    } catch (e) {
      next(e);
    }
  },
);

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  userHasType([UserTypes.ADMIN]),
  async (req: Request<{}, {}, ServicePostReq>, res: Response<ApiRes<Service>>, next: NextFunction) => {
    const em = DI.orm.em.fork(false);
    try {
      const parsed = serviceNewUpdateFormSchema.parse(req.body);
      const service = new Service().assign(parsed);

      await em.persistAndFlush(service);
      res.json({ data: service });
    } catch (e) {
      next(e);
    }
  },
);

router.put(
  `/:serviceUuid`,
  passport.authenticate('jwt', { session: false }),
  userHasType([UserTypes.ADMIN]),
  async (req: Request<ServiceFetchReq, {}, ServicePostReq>, res: Response<ApiRes<Service>>, next: NextFunction) => {
    const em = DI.orm.em.fork(false);
    try {
      const service = await DI.serviceRepo.findOneOrFail({ uuid: req.params.serviceUuid });
      const parsed = serviceNewUpdateFormSchema.parse(req.body);
      service.assign(parsed);

      await em.persistAndFlush(service);
      res.json({ data: service });
    } catch (e) {
      next(e);
    }
  },
);

export const AdminServiceController = router;
