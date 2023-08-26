import { NextFunction, Request, Response, Router } from 'express';
import { QueryOrder, wrap } from '@mikro-orm/core';
import passport from 'passport';
import * as z from 'zod';
import { v4 as uuid } from 'uuid';

import { ApiRes, WalletRegistration, WalletDetails } from '../../interfaces';
import { DI } from '../../index';
import { generatePassword, userHasType } from '../../lib/util';
import { User, UserTypes } from '../../entities';
import { userRefineFn } from '../consts';
import { UserPostReq } from '..';
import { UnprocessableEntityError } from '../../classes/errors';
import { ApprovalStatuses } from '../../enums';
import {
  handleSendPartnerUserApprovedAdmin,
  handleSendPartnerUserApprovedPartner,
  handleSendPartnerUserDeniedAdmin,
  handleSendPasswordReset,
} from '../../emails/templates';
import { registerMktPlaceWallet } from '../../services/wallet.service';

const router = Router();

const userUpdateFormSchema = z
  .object({
    firstName: z.string().nonempty(),
    lastName: z.string().nonempty(),
    email: z.string().email().nonempty(),
    type: z.enum([UserTypes.ADMIN, UserTypes.CLIENT, UserTypes.PARTNER]),
    clientUuid: z.string().optional(),
    partnerUuid: z.string().optional(),
  })
  .refine(userRefineFn, { message: 'Invalid combination of user type and client or partner association' });

const userNewFormSchema = z
  .object({
    firstName: z.string().nonempty(),
    lastName: z.string().nonempty(),
    email: z.string().email().nonempty(),
    type: z.enum([UserTypes.ADMIN, UserTypes.CLIENT, UserTypes.PARTNER]),
    clientUuid: z.string().optional(),
    partnerUuid: z.string().optional(),
  })
  .refine(userRefineFn, { message: 'Invalid combination of user type and client or partner association' });

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  userHasType([UserTypes.ADMIN]),
  async (req: Request, res: Response<ApiRes<User[]>>, next: NextFunction) => {
    try {
      const users = await DI.userRepo.findAll({ orderBy: { lastName: QueryOrder.ASC } });
      res.json({ data: users });
    } catch (e) {
      next(e);
    }
  },
);

router.get(
  '/unapproved',
  passport.authenticate('jwt', { session: false }),
  userHasType([UserTypes.ADMIN]),
  async (req: Request, res: Response<ApiRes<User[]>>, next: NextFunction) => {
    try {
      const users = await DI.userRepo.find(
        { $or: [{ approvalStatus: ApprovalStatuses.PENDING }, { approvalStatus: ApprovalStatuses.DENIED }] },
        { orderBy: { lastName: QueryOrder.ASC }, populate: ['partner'] },
      );
      res.json({ data: users });
    } catch (e) {
      next(e);
    }
  },
);

router.put(
  '/approve/:userUuid',
  passport.authenticate('jwt', { session: false }),
  userHasType([UserTypes.ADMIN]),
  async (req: Request, res: Response<ApiRes<User>>, next: NextFunction) => {
    const em = DI.orm.em.fork(false);
    try {
      const user = await DI.userRepo.findOneOrFail({ uuid: req.params.userUuid }, ['partner']);
      user.approvalStatus = req.body.approvalStatus;
      await em.persistAndFlush(user);
      const adminUsers = await DI.userRepo.find({ type: UserTypes.ADMIN }, { fields: ['email'] });
      const adminEmails = adminUsers.map((u) => u.email);
      const userName = `${user.firstName} ${user.lastName}`;
      if (req.body.approvalStatus === ApprovalStatuses.APPROVED) {
        // send partner user approval email
        await handleSendPartnerUserApprovedPartner({ userName, to: [user.email] });
        // send admin partner user approval emails
        await handleSendPartnerUserApprovedAdmin({
          partnerName: user.partner.name,
          userName,
          to: adminEmails,
        });
      } else if (req.body.approvalStatus === ApprovalStatuses.DENIED) {
        // send admin partner user denial emails
        await handleSendPartnerUserDeniedAdmin({ partnerName: user.partner.name, userName, to: adminEmails });
      }
      res.json({ data: user });
    } catch (e) {
      next(e);
    }
  },
);

router.get(
  '/:userUuid',
  passport.authenticate('jwt', { session: false }),
  userHasType([UserTypes.ADMIN]),
  async (req: Request<{ userUuid: string }>, res: Response<ApiRes<User>>, next: NextFunction) => {
    try {
      const user = await DI.userRepo.findOneOrFail({ uuid: req.params.userUuid }, { populate: ['client', 'partner'] });

      res.json({ data: user });
    } catch (e) {
      next(e);
    }
  },
);

router.put(
  '/:userUuid',
  passport.authenticate('jwt', { session: false }),
  userHasType([UserTypes.ADMIN]),
  async (
    req: Request<
      { userUuid: string },
      {},
      Pick<UserPostReq, 'email' | 'firstName' | 'lastName' | 'type' | 'clientUuid' | 'partnerUuid'>
    >,
    res: Response<ApiRes<User>>,
    next: NextFunction,
  ) => {
    const em = DI.orm.em.fork(false);
    try {
      const user = await DI.userRepo.findOneOrFail({ uuid: req.params.userUuid });
      const parsed = userUpdateFormSchema.parse(req.body);

      user.assign(parsed);
      user.client = null;
      user.partner = null;

      if (parsed.clientUuid) {
        const client = await DI.clientRepo.findOneOrFail({ uuid: parsed.clientUuid });
        user.client = client;
      } else if (parsed.partnerUuid) {
        const partner = await DI.partnerRepo.findOneOrFail({ uuid: parsed.partnerUuid });
        user.partner = partner;
      }

      await em.persistAndFlush(user);

      res.json({ data: user });
    } catch (e) {
      next(e);
    }
  },
);

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  userHasType([UserTypes.ADMIN]),
  async (req: Request<{}, {}, UserPostReq>, res: Response<ApiRes<User>>, next: NextFunction) => {
    const em = DI.orm.em.fork(false);
    try {
      const parsed = userNewFormSchema.parse(req.body);
      // The user is assigned a random password here as they will have a reset email sent to them
      const password = uuid();
      const saltHash = generatePassword(password);

      const salt = saltHash.salt;
      const hash = saltHash.hash;

      const user = new User().assign({
        firstName: parsed.firstName,
        lastName: parsed.lastName,
        email: parsed.email,
        type: parsed.type,
        salt: salt,
        hash: hash,
      });

      if (parsed.clientUuid && parsed.type === UserTypes.CLIENT) {
        const client = await DI.clientRepo.findOneOrFail({ uuid: parsed.clientUuid });
        user.client = client;
      } else if (parsed.partnerUuid && parsed.type === UserTypes.PARTNER) {
        const partner = await DI.partnerRepo.findOneOrFail({ uuid: parsed.partnerUuid });
        user.partner = partner;
      }
      const walletRegistration: WalletRegistration = {
        uuid: user.uuid,
        email: user.email,
        password,
        fullName: `${user.firstName} ${user.lastName}`,
      };
      const walletRegistrationStatus = await registerMktPlaceWallet(walletRegistration);

      await em.persistAndFlush(user);

      await handleSendPasswordReset({
        to: [user.email],
        subject: 'mail.welcome-to-devvesg',
        includeDisclaimer: false,
        resetPasswordToken: user.resetPasswordToken,
      });

      res.json({ data: user });
    } catch (e) {
      next(e);
    }
  },
);

router.delete(
  '/:userUuid',
  passport.authenticate('jwt', { session: false }),
  userHasType([UserTypes.ADMIN]),
  async (req: any, res: Response<ApiRes<null>>, next: NextFunction) => {
    const em = DI.orm.em.fork(false);
    try {
      if (req.user.uuid !== req.params.userUuid) {
        const user = await DI.userRepo.findOneOrFail({ uuid: req.params.userUuid });
        await em.removeAndFlush(user);

        res.status(200).send();
      } else {
        throw new UnprocessableEntityError();
      }
    } catch (e) {
      next(e);
    }
  },
);

export const AdminUserController = router;
