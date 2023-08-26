import { NextFunction, Request, Response, Router } from 'express';
import { QueryOrder } from '@mikro-orm/core';
import passport from 'passport';

import { ApiRes } from '../interfaces';
import { Service, UserTypes } from '../entities';
import { DI } from '../index';
import { userHasType } from '../lib/util';

const router = Router();

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req: Request, res: Response<ApiRes<Service[]>>, next: NextFunction) => {
    try {
      const services = await DI.serviceRepo.findAll({ orderBy: { name: QueryOrder.ASC } });
      res.json({ data: services });
    } catch (e) {
      next(e);
    }
  },
);

export const ServiceController = router;
