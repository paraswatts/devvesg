import { NextFunction, Request, Response, Router } from 'express';
import * as z from 'zod';
import { ZodError } from 'zod';
import passport from 'passport';
import { NotFoundError as OrmNotFoundError, wrap } from '@mikro-orm/core';

import { DI } from '../index';
import { generatePassword, generateWalletPassword, isValidPassword } from '../lib/util';
import { Client, ClientType, User, UserTypes, Vertical, Wallet } from '../entities';
import { AuthenticationError, FormValidationError, NotFoundError } from '../classes/errors';
import { ApiRes, WalletDetails } from '../interfaces';
import { passwordRegex } from './consts';
import { ApprovalStatuses, WalletEmailVerificationStatus, WalletErrorStatus } from '../enums';
import { handleSendPasswordReset } from '../emails/templates';
import { getWalletInfo } from '../services/wallet.service';
import { RedisClient } from '../config/redis.server';
import { call, login2Devvio, WalletApi } from '../config/devvio.api';
import { login } from '../helpers';

const router = Router();
const FORGOT_PASSWORD_LIFETIME_DAYS_DEFAULT = 7;

type ForgotPasswordReq = {
  email: string;
};

type PasswordForm = {
  currentPassword: string;
  newPassword: string;
  newPasswordConfirm: string;
};

type PasswordUpdateReq = PasswordForm & {
  currentPassword: string;
};

type ResetPasswordReq = PasswordForm & {
  passwordToken: string;
};

type UserLoginReq = {
  email: string;
  password: string;
};

export type UserLoginResponse = {
  token: string;
  expires: string;
  type: string;
  clientUuid: string;
  partnerUuid: string;
  firstName: string;
  lastName: string;
  email: string;
  userAgreementCompleted: boolean;
  userWallet?: WalletDetails;
};

type UserGetResponse = {
  clientUuid: string;
  partnerUuid: string;
  email: string;
  firstName: string;
  lastName: string;
  type: string;
  uuid: string;
  userAgreementCompleted: boolean;
  code?: string;
  onboardingComplete?: boolean;
  approvalStatus: ApprovalStatuses;
  userWallet?: WalletDetails;
  clientWallet?: WalletDetails;
  partnerWallet?: WalletDetails,
};

const passwordMatchingRefinement = (data: PasswordForm) =>
  data.newPassword === data.newPasswordConfirm && data.newPassword.match(passwordRegex);
const passwordMatchingIssue = { message: 'invalid-password', path: ['newPasswordConfirm'] };

const passwordUpdateFormSchema = z
  .object({
    currentPassword: z.string(),
    newPassword: z.string(),
    newPasswordConfirm: z.string(),
  })
  .refine(passwordMatchingRefinement, passwordMatchingIssue);

const passwordResetFormSchema = z
  .object({
    newPassword: z.string(),
    newPasswordConfirm: z.string(),
    passwordToken: z.string(),
  })
  .refine(passwordMatchingRefinement, passwordMatchingIssue);

const createUserClient = async (email: string, phone: string, vertical?: Vertical, clientType?: ClientType): Promise<Client> => {
  const em = DI.orm.em.fork(false);
  const clientTypes: ClientType[] = await DI.clientTypeRepo.findAll({ limit: 1 });
  const verticals: Vertical[] = await DI.verticalRepo.findAll({ limit: 1 });

  const client: Client = wrap(new Client()).assign({
    name: 'Auto-imported-user',
    contactEmail: email,
    contactPhoneNumber: phone,
    clientType: clientType || clientTypes[0],
    vertical: vertical || verticals[0]
  }, { em: em });
  await em.persistAndFlush(client);
  return client;
}

const createUser = async (email: string, fullName: string, username: string, pass: string, client: Client) => {
  const em = DI.orm.em.fork(false);
  let saltHash = generatePassword(pass);
  const salt = saltHash.salt;
  const hash = saltHash.hash;
  const name = fullName.split(' ');

  const user = wrap(new User()).assign({
    firstName: name?.length > 0 ? name[0] : '',
    lastName: name?.length > 1 ? name[1] : '',
    type: UserTypes.CLIENT,
    hash,
    email,
    salt,
    userAgreementCompleted: false,
    dateAgreementCompleted: new Date(),
    code: 'None',
    onboardingComplete: false,
    client: client
  }, { em: em });
  await em.persistAndFlush(user);
  return user;
}

const createWallet = async (user: User, emailVerified: boolean): Promise<Wallet> => {
  const em = DI.orm.em.fork(false);
  const wallet = wrap(new Wallet()).assign({
    userName: user.email,
    email: user.email,
    user,
    emailVerified: emailVerified ? WalletEmailVerificationStatus.YES : WalletEmailVerificationStatus.NO,
  }, { em: em });
  await em.persistAndFlush(wallet);
  return wallet
}

const setupDevvESGUserAccount = async (pass: string, walletSession: string): Promise<User> => {

  const walletSetting = await call(WalletApi.SETTINGS, { uuid: walletSession });
  if (walletSetting?.status === 200 && walletSetting?.data && walletSetting?.data?.settings) {
    const { email, fullName, phone, userName, emailVerified } = walletSetting?.data?.settings;
    /**
     * Create client pick
     * for now pick random vertical and clientType.
     */
    const client: Client = await createUserClient(email, phone);
    /**
     * Create User
     */
    const user = await createUser(email, fullName, userName, pass, client);
    /**
     * Create Wallet. with login response data.
     */
    const wallet = await createWallet(user, emailVerified);
    if (client && user && wallet) return user;
  }
  return null;
}

router.get(
  '/currentUser',
  passport.authenticate('jwt', { session: false }),
  async (req: any, res: Response<ApiRes<UserGetResponse>>, next: NextFunction) => {
    try {
      const user = await DI.userRepo.findOneOrFail({ uuid: req.user.uuid }, { populate: ['client', 'partner'] });
      const {
        email,
        firstName,
        lastName,
        type,
        uuid,
        userAgreementCompleted,
        code,
        onboardingComplete,
        approvalStatus,
      } = user;

      const resp: UserGetResponse = {
        clientUuid: user.client?.uuid,
        partnerUuid: user.partner?.uuid,
        email,
        firstName,
        lastName,
        type,
        uuid,
        userAgreementCompleted,
        code,
        onboardingComplete,
        approvalStatus,

      };

      const userWallet = await DI.walletRepo.findOne({ user: user });
      resp.userWallet = getWalletInfo(userWallet);

      if (user.type == UserTypes.CLIENT) {
        const client = await DI.clientRepo.findOne({ uuid: user.client?.uuid });
        const clientWallet = await DI.walletRepo.findOne({ client: client });
        resp.clientWallet = getWalletInfo(clientWallet);
      } else if (user.type == UserTypes.PARTNER) {
        const partner = await DI.partnerRepo.findOne({ uuid: user.partner?.uuid });
        const partnerWallet = await DI.walletRepo.findOne({ partner: partner });
        resp.partnerWallet = getWalletInfo(partnerWallet);
      }
      resp.partnerWallet = {};
      resp.clientWallet = null;
      res.json({ data: resp });
    } catch (e) {
      next(e);
    }
  },
);

router.post(
  '/forgotPassword',
  async (req: Request<{}, {}, ForgotPasswordReq>, res: Response<ApiRes<boolean>>, next: NextFunction) => {
    const em = DI.orm.em.fork(false);
    try {
      const user = await DI.userRepo.findOne({ email: req.body.email });

      if (user) {
        user.renewResetPasswordFields();

        await em.persistAndFlush(user);
        await handleSendPasswordReset({
          to: [user.email],
          subject: 'mail.reset-password-instructions-subject',
          includeDisclaimer: true,
          resetPasswordToken: user.resetPasswordToken,
        });
      }
      res.json({ data: true });
    } catch (e) {
      next(e);
    }
  },
);

router.put(
  '/resetPassword',
  async (req: Request<{}, {}, ResetPasswordReq>, res: Response<ApiRes<User>>, next: NextFunction) => {
    const em = DI.orm.em.fork(false);
    try {
      const validTokenDays = process.env.FORGOT_PASSWORD_LIFETIME_DAYS
        ? parseInt(process.env.FORGOT_PASSWORD_LIFETIME_DAYS)
        : FORGOT_PASSWORD_LIFETIME_DAYS_DEFAULT;
      const validTokenMax = new Date();
      validTokenMax.setDate(validTokenMax.getDate() - validTokenDays);
      const parsed = passwordResetFormSchema.parse(req.body);

      const user = await DI.userRepo.findOneOrFail({
        resetPasswordToken: req.body.passwordToken,
        resetPasswordSentAt: { $gte: validTokenMax },
      });

      user.assign(generatePassword(parsed.newPassword));
      user.renewResetPasswordFields(); // Change the password reset token to prevent the same token from being used again
      await em.persistAndFlush(user);

      if (user) {
        res.json({ data: user });
      }
    } catch (e) {
      next(e);
    }
  },
);

//Login User
router.post(
  '/login',
  async (req: Request<{}, {}, UserLoginReq>, res: Response<ApiRes<UserLoginResponse>>, next: NextFunction) => {
    const { email, password } = req.body;
    let loginPayload = null;
    let error = null;
    try {
      error = new AuthenticationError(
        'Your username or password was incorrect or does not exist. Please try again.',
      );

      let user: User = await DI.userRepo.findOne({ email });
      if (user)
        loginPayload = login(password, user);

      if (!user || !loginPayload)
        throw error;
      else if (user && user.type === UserTypes.ADMIN) {
        res.status(200).json(loginPayload);
      } else {
        const walletPassword = generateWalletPassword(password, email);
        const walletLoginResponse = await login2Devvio({ user: email, pass: walletPassword });
        if (walletLoginResponse && walletLoginResponse?.status === 200 && walletLoginResponse?.data) {
          const { data } = walletLoginResponse;
          if (data?.pub && data?.email && data?.username && data?.uuid) {
            const { pub, uuid } = data;
            if (!user) {
              user = await setupDevvESGUserAccount(password, uuid);
            }
            RedisClient.setValue({ userId: user.uuid, walletSessionId: uuid, walletPub: pub });
            loginPayload.data.userWallet.isWalletSessionActive = true;
            return res.status(200).json(loginPayload);
          } else {
            if (data?.code === 1140 || data?.code === 1143) {
              error = new AuthenticationError(
                data.message
              );
            } else {
              error = new AuthenticationError(
                data.message
              );
            }
            if (user && loginPayload) {
              RedisClient.setValue({ userId: user.uuid, message: data.message, code: data.code });
              loginPayload.data.userWallet.message = data.message;
              return res.status(200).json(loginPayload);
            } else
              throw error;
          }
        } else {
          RedisClient.setValue({ userId: user.uuid, message: 'Something went wrong, Please try after sometime.', code: 500 });
          return res.status(200).json(loginPayload);
        }
      }
    } catch (e) {
      next(e);
    }
  },
);

router.put(
  '/password',
  passport.authenticate('jwt', { session: false }),
  async (req: Request<any, any, PasswordUpdateReq>, res: Response<ApiRes<null>>, next: NextFunction) => {
    const em = DI.orm.em.fork(false);

    try {
      const user: any = await DI.userRepo.findOneOrFail({ email: req.user.email });

      const schema = passwordUpdateFormSchema.refine(
        (data: PasswordForm) => isValidPassword(data.currentPassword, user.hash, user.salt),
        { message: 'incorrect-current-password', path: ['currentPassword'] },
      );

      const parsed = schema.parse(req.body);
      user.assign(generatePassword(parsed.newPassword));
      await em.persistAndFlush(user);

      res.status(200).json({
        data: null,
      });
    } catch (e) {
      if (e instanceof ZodError) {
        e = new FormValidationError('password-update-failed', e.issues);
      } else if (e instanceof OrmNotFoundError) {
        e = new NotFoundError('user-not-found');
      }
      next(e);
    }
  },
);

router.put(
  '/agreeToTerms',
  passport.authenticate('jwt', { session: false }),
  async (req: any, res: Response<ApiRes<null>>, next: NextFunction) => {
    try {
      const em = DI.orm.em.fork(false);
      const user = await DI.userRepo.findOneOrFail({ uuid: req.user.uuid });
      user.userAgreementCompleted = true;
      user.dateAgreementCompleted = new Date();
      await em.persistAndFlush(user);
      res.status(200).send();
    } catch (e) {
      next(e);
    }
  },
);

export const AuthController = router;
