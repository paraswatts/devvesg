import { wrap } from "@mikro-orm/core";
import { DI } from '../index';
import { createWallet, getWalletReferenceByUserName, getServiceAccountSession } from "../config/devvio.api";
import { Client, Partner, User, UserTypes, Wallet } from "../entities";
import { WalletEmailVerificationStatus, WalletErrorStatus } from "../enums";
import { WalletRegistration, WalletDetails, ResponseCode, ResponseBody } from "../interfaces";
import { encryptPassword } from "../lib/util";
import { modifyEmail } from "../lib/util";
import { generateRandomString } from "../lib/util";
import { getUsernameFromEmail } from "../lib/util";
import { generateWalletPassword } from "../lib/util";
import { generateWalletEmailHash } from "../lib/util";
import { logger } from "../logger";

export const getWalletInfo = (wallet: Wallet) => {
    const res: WalletDetails ={  };
    if (wallet) {
        res.status = WalletErrorStatus.OK;
        res.isVerified = wallet.emailVerified;
        res.success = true
    } else {
        res.status = WalletErrorStatus.NO_WALLET;
        res.success = false;
        res.message = "You don't have any wallet, Please register your wallet to accessmore features ie. NFT Upload/retire/sell etc.";
    }
    return res;
}

export const registerMktPlaceWallet = async (walletObject: WalletRegistration): Promise<ResponseBody> => {
    const em = DI.orm.em.fork(false);

    if (!walletObject.username)
        walletObject.username = getUsernameFromEmail(walletObject.email);

    const walletPassword = generateWalletPassword(walletObject.password, walletObject.username);

    const walletRequest = {
        apiKey: process.env.DEVVIO_SHARD_REGISTER_API_KEY || undefined,
        email: walletObject.email,
        emailHash: generateWalletEmailHash(walletObject.password, walletObject.email),
        fullName: walletObject.fullName,
        pass: walletPassword,
        user: walletObject.username
    }

    let response = null;
    try {
        response = await createWallet(walletRequest);
    } catch (err) {
        logger.error(`Exception: ${JSON.stringify(err)}`);
    }

    if (response !== null && response.status === 200) {

        if (response.data.code === 4030) {
            const res = Object.keys(response.data);
            if (res.includes("email") && res.includes("pub") && res.includes("roles") && res.includes("user")) {
                return {
                    success: true,
                    status: ResponseCode.DONE,
                    message: `Registration Success, Please ${response.data.message}`,
                    action: "WALLET_REGISTRATION"
                };
            } else {
                return {
                    success: false,
                    status: ResponseCode.BAD_REQUEST,
                    message: `You are already registered. Please ${response.data.message}`,
                    action: "WALLET_REGISTRATION"
                };
            }
        } else {
            logger.error(`Error while registration: ${JSON.stringify(response)}`);
            return {
                status: ResponseCode.UNKNOWN_ERROR,
                success: false,
                message: response.data.message,
                action: "WALLET_REGISTRATION"
            };
        }
    } else {
        logger.error(`Error while registration: ${JSON.stringify(response)}`);
        return {
            status: ResponseCode.UNKNOWN_ERROR,
            success: false,
            message: response.data.message,
            action: "WALLET_REGISTRATION"
        };
    }
}