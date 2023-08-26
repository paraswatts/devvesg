
import axios, { AxiosInstance } from 'axios';

import { logger } from '../logger';
import { RedisClient } from './redis.server';


const API: AxiosInstance = axios.create({
    baseURL: process.env.DEVVIO_SHARD_MAIN_URL,
    headers: {
        "Content-type": "application/json"
    }
});

/**
 * How to use: 
 * IMPORT WalletApi and call with respective api url and payload.
 * @param url This can be any one from WalletApi like,
 * WalletApi.ASSETS,
 * WalletApi.SETTINGS,
 * WalletApi.MODIFY_SETTINGS,
 * WalletApi.BALANCES and other simillar apis.
 * @param payload  Payload will varry as per request url. 
 * @returns HTTP-STATUS-CODE as status and response as data.
 */

export const call = async (url: string, payload: any) => {
    try {
        let response = await API.post(url, payload);
        const { status, data } = response;
        return { data, status };
    } catch (er) {
        logger.error(er);
    }
    return null;
}

export const createWallet = async (req) => {
    try {
        let response = await axios.post(`${process.env.DEVVIO_SHARD_REGISTER_URL}${WalletAuthApi.REGISTER}`, req);
        const { status, data } = response;
        return { status, data };
    } catch (werr) {
        logger.error(werr);
    }
    return null;
};


export const login2Devvio = async (payload: { user: string, pass: string }) => {
    return await call(WalletAuthApi.LOGIN, payload);
}

export const getServiceAccountSession = async () => {
    try {
        const uuid: string = await RedisClient.getServiceAccountSession();
        if (uuid)
            return { uuid };
        const payload = {
            "user": "sgiri",
            "pass": "716687672e55cc3c61b32ee3ea951dd3144d6b76392b87348945c0b3d6611457"
        }
        const serviceAccount = await login2Devvio(payload);

        if (serviceAccount.status === 200 && Object.keys(serviceAccount.data).includes('uuid')) {
            RedisClient.setServiceAccountSession(serviceAccount.data.uuid);
            return serviceAccount.data;
        } else {
            logger.info({
                status: "Fail to get serviceAccount session",
                success: false,
                ...serviceAccount
            });
        }
    } catch (e) {
        logger.error(`Fail to get serviceAccount session.${e}`);
    }
    return null;
}

export const getCurrentUserSession = async (uuid: string) => {
    return await RedisClient.getValue(uuid);
}

export const getWalletReferenceByUserName = async (payload: any) => {
    try {
        const reference = await call(WalletApi.WALLET_REFERENCE, payload);
        if (reference?.status === 200)
            if (reference?.data && reference?.data?.wallets.length > 0) {
                const wallets = reference.data.wallets;
                return wallets.length >= 1 ? wallets[0] : null;
            } else
                logger.warn(`Wallet not Found with username ${payload.email}`);
        else
            logger.error(`Fail to get Wallet reference ${JSON.stringify(reference)}`);
    } catch (err) {
        logger.error(`${JSON.stringify(err)}`);
    }
    return null;
}

/**
 * WalletApi urls end points configuration.
 */

export class WalletApi {
    static readonly ASSETS = '/core/wallet/assets';
    static readonly SETTINGS = '/core/wallet/settings';
    static readonly MODIFY_SETTINGS = '/core/settings/modify';
    static readonly BALANCES = '/core/wallet/balances';
    static readonly WALLET_REFERENCE = '/core/search/username';
}

export class WalletAuthApi {
    static readonly REGISTER = '/register';
    static readonly LOGIN = '/login';
    static readonly LOGOUT = '/logout';
}

export class NFTApi {
    static readonly MINT = '/core/nft/mint';
    static readonly GET_ALL = '/core/nft/all';
    static readonly SALE = '/core/nft/sell';
    static readonly RETRACT = '/core/nft/retract';
    static readonly TRANSFER = '/core/nft17/send';
}
