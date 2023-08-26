import { NextFunction, Request, Response, Router } from 'express';
import { ResponseCode, WalletDetails, WalletRegistration } from '../../interfaces';
import { registerMktPlaceWallet } from '../../services/wallet.service';
import { DI } from '../../index';
import { Wallet } from '../../entities/wallet.entity';
import { WalletEmailVerificationStatus, WalletErrorStatus } from '../../enums/';
import { wrap } from '@mikro-orm/core';
import { isEmailAlreadyUsed } from '../user.controller';
import { generatePassword } from '../../lib/util';

const router = Router();

router.put('/register',
  async (req: Request<{ email?: string, password: string, userId: string }>, res: Response, next: NextFunction) => {
    const em = DI.orm.em.fork(false);
    const request: WalletRegistration = { ...req.body };

    const isAvailable = await isEmailAlreadyUsed(request.email);
    const anyUser = await DI.userRepo.findOne({ uuid: { $ne: req.body.userId }, email: request.email });
    if (isAvailable.devvio || anyUser)
      return res.status(ResponseCode.BAD_REQUEST).send({
        success: "false",
        message: "This email already used.",
        action: "REGISTER_WALLET",
        status: ResponseCode.BAD_REQUEST
      });

    const user = await DI.userRepo.findOne({ uuid: req.body.userId });
    if (!user)
      return res.status(ResponseCode.NOT_FOUND).send({
        success: "false",
        message: "User Not Found",
        action: "REGISTER_WALLET",
        status: ResponseCode.NOT_FOUND
      });

    let wallet: Wallet = await DI.walletRepo.findOne({ user: user });
    if (wallet)
      return res.status(ResponseCode.BAD_REQUEST).send({
        success: false,
        message: "User has wallet.",
        action: "REGISTER_WALLET",
        status: ResponseCode.BAD_REQUEST
      });

    const walletRegistration: WalletRegistration = {
      email: request.email,
      fullName: `${user.firstName} ${user.lastName}`,
      password: request.password
    };

    const response = await registerMktPlaceWallet(walletRegistration);
    if (response.status === ResponseCode.DONE && response.success === true) {
      const saltHash = generatePassword(request.password);
      
      if (user.email !== request.email)
        user.email = request.email;
      if (user.salt !== saltHash.salt) {
        user.salt = saltHash.salt;
        user.hash = saltHash.hash;
      }
      response.message += "Username and password has been updated, Please Login again.";
      em.persistAndFlush(user);

      const parsedWallet = {
        userName: request.email,
        emailVerified: WalletEmailVerificationStatus.NO
      };
      wallet = wrap(new Wallet()).assign(parsedWallet, { em: em });
      wallet.user = user;
      em.persistAndFlush(wallet);
      
      return res.send({ data: response });
    } else
      return res.status(response.status).send(response);

  });

export const WalletController = router;