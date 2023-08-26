import { NextFunction, Request, Response, Router } from 'express';

import { ApiRes, WalletRegistration, WalletDetails, ResponseBody, ResponseCode } from '../interfaces';
import { DI } from '../index';
import { User, UserTypes, Wallet } from '../entities';
import { userRefineFn } from './consts';
import { GenericHttpError } from '../classes/errors';
import { login } from '../helpers';
import { generatePassword, getUsernameFromEmail, validateCode } from '../lib/util';
import { z } from 'zod';
import { ApprovalStatuses, WalletEmailVerificationStatus } from '../enums';
import { handleSendPartnerUserAddedAdmin } from '../emails/templates';
import { getWalletInfo, registerMktPlaceWallet } from '../services/wallet.service';
import { getWalletReferenceByUserName, getServiceAccountSession } from '../config/devvio.api';

const router = Router();

export type UserPostReq = {
  email: string;
  firstName: string;
  lastName: string;
  type: UserTypes;
  clientUuid: string;
  partnerUuid: string;
  password?: string;
  passwordConfirm?: string;
  code?: string;
  onboardingComplete?: boolean;
  userAgreementCompleted: boolean;
  dateAgreementCompleted?: Date;
};

interface EmailUsed {
  devvio: boolean;
  devvesg: boolean;
}

const userNewFormSchema = z
  .object({
    firstName: z.string().nonempty(),
    lastName: z.string().nonempty(),
    email: z.string().email().nonempty(),
    type: z.enum([UserTypes.ADMIN, UserTypes.CLIENT, UserTypes.PARTNER]),
    clientUuid: z.string().optional(),
    partnerUuid: z.string().optional(),
    // TODO probably want to validate this better when a final solution is done
    code: z.string().nonempty().optional(),
    password: z.string().nonempty(),
    passwordConfirm: z.string().nonempty(),
    onboardingComplete: z.boolean(),
    userAgreementCompleted: z.boolean(),
    dateAgreementCompleted: z.string(),
  })
  .refine(userRefineFn, { message: 'invalid-combination' });

router.post(
  '/',
  async (req: Request<{}, {}, UserPostReq>, res: Response, next: NextFunction) => {
    const em = DI.orm.em.fork(false);
    try {

      if (!validateCode(req.body.code)) {
        res.status(403).send();
      } else {
        const emailAllreadyUsedAt: EmailUsed = await isEmailAlreadyUsed(req.body.email);
        if (emailAllreadyUsedAt.devvesg && emailAllreadyUsedAt.devvio) {
          return res.status(400).send({
            success: false,
            status: ResponseCode.BAD_REQUEST,
            message: `Email already used, Please try with some different email.`,
            action: "WALLET_REGISTRATION"
          });
        }
        const parsed = userNewFormSchema.parse(req.body);
        const saltHash = generatePassword(parsed.password);
        const salt = saltHash.salt;
        const hash = saltHash.hash;

        const user = new User().assign({
          firstName: parsed.firstName,
          lastName: parsed.lastName,
          email: parsed.email,
          type: parsed.type,
          salt: salt,
          hash: hash,
          code: parsed.code,
          onboardingComplete: parsed.onboardingComplete,
          userAgreementCompleted: parsed.userAgreementCompleted,
          dateAgreementCompleted: parsed.dateAgreementCompleted,
        });

        const walletRegistration: WalletRegistration = {
          email: user.email,
          fullName: `${user.firstName} ${user.lastName}`,
          password: parsed.password,
          username: getUsernameFromEmail(user.email)
        }
        const walletResponse: ResponseBody = await registerMktPlaceWallet(walletRegistration);
        if (walletResponse?.status === ResponseCode.DONE && walletResponse?.success === true) {

          let wallet: Wallet = new Wallet().assign({
            email: user.email,
            emailVerified: WalletEmailVerificationStatus.NO,
            userName: walletRegistration.username
          });

          if (parsed.clientUuid && parsed.type === UserTypes.CLIENT) {
            const client = await DI.clientRepo.findOneOrFail({ uuid: parsed.clientUuid });
            user.client = client;
            wallet.client = client;
          } else if (parsed.type === UserTypes.PARTNER) {
            user.approvalStatus = ApprovalStatuses.PENDING;
            if (parsed.partnerUuid) {
              const partner = await DI.partnerRepo.findOneOrFail({ uuid: parsed.partnerUuid });
              user.partner = partner;
              wallet.partner = partner;
              const adminUsers = await DI.userRepo.find({ type: UserTypes.ADMIN }, { fields: ['email'] });
              const adminEmails = adminUsers.map((u) => u.email);
              await handleSendPartnerUserAddedAdmin({
                to: adminEmails,
                partnerName: partner.name,
                userName: `${user.firstName} ${user.lastName}`,
              });
            }
          }

          await em.persistAndFlush(user);
          wallet.user = user;
          await em.persistAndFlush(wallet);

          const loginPayload = login(parsed.password, user);
          const walletStatus = { wallet: getWalletInfo(wallet) };
          if (loginPayload) {
            return res.status(200).json({ ...loginPayload, ...walletStatus });
          } else {
            return res.status(500).json({
              success: false,
              status: ResponseCode.UNKNOWN_ERROR,
              message: `Something went wrong. Login failed.`,
              action: "WALLET_REGISTRATION"
            });
          }
        } else if (walletResponse.status === ResponseCode.SUCCESS && walletResponse.success === true) {
          res.status(ResponseCode.BAD_REQUEST).send({
            success: false,
            status: ResponseCode.BAD_REQUEST,
            message: `Email/User already exist, Please login, will import your a/c on successfull login. Or use some other email to register.`,
            action: "WALLET_REGISTRATION"
          });
        } else {
          res.status(walletResponse.status).send(walletResponse);
        }

      }
    } catch (e) {
      next(e);
    }
  }
);

export const isEmailAlreadyUsed = async (email: string) => {
  const em = DI.orm.em.fork(false);

  /**
  * Check with devvESG.
  */
  const existingUser = await DI.userRepo.findOne({ email });
  /**
   * Check with devvio.
   */
  const serviceAccountSession = await getServiceAccountSession();
  let isOK: boolean = false;
  if (serviceAccountSession !== null && serviceAccountSession?.uuid) {
    const request = {
      "email": email,
      "uuid": serviceAccountSession?.uuid
    }
    const userWallet = await getWalletReferenceByUserName(request);
    if (userWallet !== null && userWallet?.addr && userWallet?.name) {
      isOK = true;
    }
  }
  const response: EmailUsed = { devvio: existingUser ? true : false, devvesg: isOK };
  return response;

}

router.get(
  '/check-exists/:email',
  async (req: Request<{ email: string }, {}, {}>, res: Response<ApiRes<null>>, next: NextFunction) => {

    try {
      const isUsed: { devvio: boolean, devvesg: boolean } = await isEmailAlreadyUsed(req.params.email);
      if (isUsed.devvio || isUsed.devvesg) {
        throw new GenericHttpError('Email address is already used.');
      } else {
        res.status(200).send();
      }
    } catch (e) {
      next(e);
    }
  },
);


export const UserController = router;
