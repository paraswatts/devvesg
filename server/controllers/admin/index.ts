import { Router } from 'express';
import { AdminController } from './admin.controller';

import { AdminClientController } from './client.controller';
import { AdminInitiativeController } from './initiative.controller';
import { AdminPartnerController } from './partner.controller';
import { AdminServiceController } from './service.controller';
import { AdminUserController } from './user.controller';
import { AdminVerticalController } from './vertical.controller';

const adminRouter = Router();

adminRouter.use('/clients', AdminClientController);
adminRouter.use('/initiatives', AdminInitiativeController);
adminRouter.use('/partners', AdminPartnerController);
adminRouter.use('/services', AdminServiceController);
adminRouter.use('/users', AdminUserController);
adminRouter.use('/verticals', AdminVerticalController);
adminRouter.use('/admin', AdminController);

export const AdminRouter = adminRouter;
