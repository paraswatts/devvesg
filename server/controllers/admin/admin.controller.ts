import { NextFunction, Request, Response, Router } from 'express';
import passport from 'passport';

import { ApiRes } from '../../interfaces';
import { DI } from '../../index';
import { userHasType } from '../../lib/util';
import { UserTypes } from '../../entities';

type DashboardResponse = {
  clients: number;
  initiatives: number;
  partners: number;
  users: number;
  projects: number;
  requirements: number;
};

const router = Router();

router.get(
  '/dashboard-stats',
  passport.authenticate('jwt', { session: false }),
  userHasType([UserTypes.ADMIN]),
  async (req: Request, res: Response<ApiRes<DashboardResponse>>, next: NextFunction) => {
    try {
      const clients = await DI.clientRepo.count();
      const initiatives = await DI.initiativeRepo.count();
      const partners = await DI.partnerRepo.count();
      const users = await DI.partnerRepo.count();
      const projects = await DI.projectRepo.count();
      const requirements = await DI.requirementRepo.count();
      const resp: DashboardResponse = {
        clients,
        initiatives,
        partners,
        users,
        projects,
        requirements,
      };
      res.json({ data: resp });
    } catch (e) {
      next(e);
    }
  },
);

export const AdminController = router;
