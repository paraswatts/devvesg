import { Request, Response, Router } from 'express';
import passport from 'passport';

import { ApiRes } from '../interfaces';

const router = Router();

router.get('/', (req: Request, res: Response<ApiRes<string>>) => {
  res.json({ data: 'success' });
});

router.get(
  '/withAuth',
  passport.authenticate('jwt', { session: false }),
  (req: Request, res: Response<ApiRes<string>>) => {
    res.json({ data: 'success logged in!' });
  },
);

export const TestController = router;
