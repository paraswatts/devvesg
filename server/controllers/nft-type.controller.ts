import { NextFunction, Request, Response, Router } from 'express';
import { QueryOrder } from '@mikro-orm/core';

import { NftType } from '../entities';
import { ApiRes } from '../interfaces';
import { DI } from '../index';

const router = Router();

router.get('/', async (req: Request, res: Response<ApiRes<NftType[]>>, next: NextFunction) => {
  try {
    const nftType = await DI.nftTypeRepo.findAll({ orderBy: { name: QueryOrder.ASC } });
    res.json({ data: nftType });
  } catch (e) {
    next(e);
  }
});

export const NftTypeController = router;
