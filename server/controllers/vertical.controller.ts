import { NextFunction, Request, Response, Router } from 'express';
import { QueryOrder } from '@mikro-orm/core';

import { Vertical } from '../entities';
import { ApiRes } from '../interfaces';
import { DI } from '../index';

const router = Router();

router.get('/', async (req: Request, res: Response<ApiRes<Vertical[]>>, next: NextFunction) => {
  try {
    const verticals = await DI.verticalRepo.findAll({ orderBy: { name: QueryOrder.ASC } });
    res.json({ data: verticals });
  } catch (e) {
    next(e);
  }
});

export const VerticalController = router;
