import { NextFunction, Request, Response, Router } from 'express';
import passport from 'passport';

import { ApiRes } from '../../interfaces';
import { Partner, UserTypes } from '../../entities';
import { DI } from '../../index';
import { getMulterImageConfig, userHasType } from '../../lib/util';
import { updatePartner } from '../../helpers';
import { ApprovalStatuses } from '../../enums';
import { QueryOrder } from '@mikro-orm/core';

const router = Router();

const upload = getMulterImageConfig();

router.get(
  '/unapproved',
  passport.authenticate('jwt', { session: false }),
  userHasType([UserTypes.ADMIN]),
  async (req: Request, res: Response<ApiRes<Partner[]>>, next: NextFunction) => {
    try {
      const partners = await DI.partnerRepo.find(
        { $or: [{ approvalStatus: ApprovalStatuses.PENDING }, { approvalStatus: ApprovalStatuses.DENIED }] },
        { orderBy: { name: QueryOrder.ASC } },
      );
      res.json({ data: partners });
    } catch (e) {
      next(e);
    }
  },
);

router.put(
  '/approve/:partnerUuid',
  passport.authenticate('jwt', { session: false }),
  userHasType([UserTypes.ADMIN]),
  async (req: Request, res: Response<ApiRes<Partner>>, next: NextFunction) => {
    const em = DI.orm.em.fork(false);
    try {
      const partner = await DI.partnerRepo.findOneOrFail({ uuid: req.params.partnerUuid });
      partner.approvalStatus = req.body.approvalStatus;
      await em.persistAndFlush(partner);
      res.json({ data: partner });
    } catch (e) {
      next(e);
    }
  },
);

router.get(
  '/:partnerUuid',
  passport.authenticate('jwt', { session: false }),
  userHasType([UserTypes.ADMIN]),
  async (req: Request<{ partnerUuid: string }>, res: Response<ApiRes<Partner>>, next: NextFunction) => {
    try {
      const partner = await DI.partnerRepo.findOneOrFail({ uuid: req.params.partnerUuid }, ['services', 'vertical']);
      partner.signMedia();
      res.json({ data: partner });
    } catch (e) {
      next(e);
    }
  },
);

router.put(
  `/:partnerUuid`,
  passport.authenticate('jwt', { session: false }),
  userHasType([UserTypes.ADMIN]),
  upload.single('logo'),
  updatePartner,
);

export const AdminPartnerController = router;
