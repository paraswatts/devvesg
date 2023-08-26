import { NextFunction, Request, Response, Router } from 'express';
import { QueryOrder } from '@mikro-orm/core';

import { ClientType } from '../entities';
import { ApiRes } from '../interfaces';
import { DI } from '../index';

const router = Router();

router.get('/', async (req: Request, res: Response<ApiRes<ClientType[]>>, next: NextFunction) => {
  try {
    const clientTypes = await DI.clientTypeRepo.findAll({ orderBy: { name: QueryOrder.ASC } });
    res.json({ data: clientTypes });
  } catch (e) {
    next(e);
  }
});

export const ClientTypeController = router;
