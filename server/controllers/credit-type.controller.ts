import { NextFunction, Request, Response, Router } from 'express';
import { QueryOrder } from '@mikro-orm/core';

import { ApiRes } from '../interfaces';
import { DI } from '../index';
import { CreditType } from '../entities';

const router = Router();

router.get('/', async (req: Request, res: Response<ApiRes<CreditType[]>>, next: NextFunction) => {
  try {
    const creditType = await DI.creditTypeRepo.findAll({ orderBy: { name: QueryOrder.ASC } });
    res.json({ data: creditType });
  } catch (e) {
    next(e);
  }
});

export const CreditTypeController = router;
