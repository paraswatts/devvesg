import * as z from 'zod';
import { NextFunction, Request, Response, Router } from 'express';

import { Nft } from "../entities/nft.entity";
import { Wallet } from '../entities';
import { Partner } from '../entities';
import { DI } from '../index';
import { randomUUID } from 'crypto';
import { WalletEmailVerificationStatus, WalletErrorStatus } from '../enums';
import { WalletType } from '../enums';
import { Client } from '../entities';
import { CreditType } from '../entities';
import { User } from '../entities';
import { NftStatuses } from '../enums';
import { NFTApi, call, getServiceAccountSession, getWalletReferenceByUserName } from '../config/devvio.api';
import { logger } from '../logger';
import { QueryOrder, wrap } from '@mikro-orm/core';

import {
    isValidCurency,
    formatCurrency,
    isValidAmount,
} from '../lib/util';
import { RedisClient } from '../config/redis.server';
import { UserSession } from '../config/redis.server';
import { ApiRes, ResponseBody, ResponseCode } from '../interfaces';


export const nftMintSchemaValidator = z.object({
    uuid: z.string().nullable(),
    amount: z.string().nonempty().default('1'),
    nftType: z.string().nonempty(),
    searchTags: z.string().array().nonempty().default(['esg']),
    assetName: z.string().nonempty().default('dummy1'),
    assetDescription: z.string().nonempty().default(''),
    assetReference: z.object({ rawReference: z.string().nullable(), hash: z.string().nullable() }),
    assetReferenceThumbnails: z.string().array().nonempty().default([
        `'${process.env.WEBAPP_BASE_URL}/devvesg.svg'`
    ]),
    assetDetails: z.object({
        creditCount: z.string().nonempty(),
        methodology: z.string().nonempty(),
        projectType: z.string().nonempty(),
        projectName: z.string().nonempty(),
        projectDescription: z.string().nonempty(),
        projectActivity: z.string().nonempty(),
        projectCode: z.string().nonempty(),
        projectId: z.string().nonempty(),
        projectBatchId: z.string().nonempty(),
        projectTicker: z.string().nonempty(),
        geography: z.string().nonempty(),
        locationCoordinates: z.string().nonempty(),
        projectStandard: z.string().nonempty(),
        creditType: z.string().nonempty(),
        projectVintage: z.string().nonempty(),
        projectVerifier: z.string().nonempty(),
        projectValidator: z.string().nonempty(),
        publicRegistry: z.string().nonempty(),
        publicRegistryLink_url: z.string().nonempty()
    }),
    forSale: z.boolean().default(true),
    salePrice: z.string(),
    saleCurrency: z.string(),
    saleDescription: z.string(),
    saleLocation: z.string(),
    saleLink_url: z.string(),
    creator: z.string().nonempty().default('DevvESG'),
    artist: z.string().nonempty().default('DevvESG')
});

export interface NftSale {
    uuid: string;
    nftUri: string;
    saleLink?: string;
    salePrice?: string;
    marketWallet?: string;
    saleCurrency?: string;
    saleLocation?: string;
    saleDescription?: string;
    assetReferenceThumbnails?: string[]
}

export const parseToDevvioNftMintJson = (nft: Nft, uuid: string = null) => {
    const {
        assetReferenceUrlHash,
        assetReferenceUrlRaw,
        creator,
        artist,
        amount,
        forSale,
        salePrice,
        saleCurrency,
        saleDescription,
        saleLocation,
        saleLink,
        creditCount,
        methodology,
        projectType,
        projectName,
        projectDescription,
        projectActivity,
        projectCode,
        projectId,
        projectBatchId,
        projectTicker,
        geography,
        locationCoordinates,
        projectStandard,
        creditType,
        projectVintage,
        projectVerifier,
        projectValidator,
        publicRegistry,
        publicRegistryLink
    } = nft;

    const devvioNftMintObject = {
        uuid,
        amount,
        searchTags: ['esg', creditType.name],
        nftType: `DevvESG ${creditType.name}`,
        assetName: (projectName),
        assetDescription: (projectDescription),
        assetReference: { rawReference: assetReferenceUrlRaw, hash: assetReferenceUrlHash },
        assetReferenceThumbnails: getNftImageUrls(nft.creditType.name),
        assetDetails: {
            creditCount,
            methodology,
            projectType,
            projectName,
            projectDescription,
            projectActivity,
            projectCode,
            projectId,
            projectBatchId,
            projectTicker,
            geography,
            locationCoordinates,
            projectStandard,
            creditType: creditType.name,
            projectVintage,
            projectVerifier,
            projectValidator,
            publicRegistry,
            publicRegistryLink_url: publicRegistryLink,
        },
        forSale,
        salePrice,
        saleCurrency,
        saleDescription,
        saleLocation,
        saleLink_url: saleLink,
        creator,
        artist
    };
    return devvioNftMintObject;
}

const getNftImageUrls = (nftType: string) => {
    const urls: string[] = [`'${process.env.WEBAPP_BASE_URL}/devvesg.svg'`];
    if (nftType.toLowerCase() === 'carbon') {
        urls.push(`'${process.env.WEBAPP_BASE_URL}/d57e23ec-bb2d-4dd6-899f-87b3b6cded1c-carbon.jpg'`);
    } else {
        urls.push(`'${process.env.WEBAPP_BASE_URL}/5be6688f-4266-424f-bb58-ea1ea10785ce-plastic.jpg'`);
    }
    return urls;
}

export const nftSale = async (req: Request<NftSale>, res: Response, nft: Nft) => {

    if (!nft || !nft.mintId || NftStatuses.OWNED !== nft.status)
        return res.status(ResponseCode.BAD_REQUEST).send({
            message: 'Invalid request',
            status: ResponseCode.BAD_REQUEST,
            success: false
        });

    const loginSession: UserSession = await RedisClient.getValue(nft.createdBy.uuid);
    if (loginSession === null)
        return res.status(ResponseCode.UNAUTHORISED).send({
            status: ResponseCode.UNAUTHORISED,
            success: false,
            message: `User wallet session has expire. Please Login.`,
        });
    else if (loginSession?.code || loginSession?.message)
        return res.status(ResponseCode.BAD_REQUEST).send({
            status: ResponseCode.BAD_REQUEST,
            success: false,
            message: `User wallet session not active: ${loginSession?.message}`,
        });

    const payload = {
        'uuid': loginSession.walletSessionId,
        'salePrice': req.body.salePrice,
        'saleCurrency': req.body.saleCurrency,
        'saleLocation': req.body.saleLocation,
        'saleLink_url': req.body.saleLink,
        'saleDescription': req.body.saleDescription,
        'nftUri': nft.mintReceiptUri,
        'assetReferenceThumbnails': getNftImageUrls(nft.creditType.name)
    };
    const sale2Mktplace = await call(NFTApi.SALE, payload);

    if (sale2Mktplace !== null && sale2Mktplace.status === 200 && sale2Mktplace.data.receiptUri) {
        nft.saleReceiptUri = sale2Mktplace.data.receiptUri;
        nft.salePrice = req.body.salePrice;
        nft.saleCurrency = req.body.saleCurrency;
        nft.saleLocation = req.body.saleLocation;
        nft.saleDescription = req.body.saleDescription;
        nft.saleLink = req.body.saleLink;
        nft.status = NftStatuses.LISTED_FOR_SALE;
        nft.forSale = true;
        await DI.nftRepo.persistAndFlush(nft);
        res.status(ResponseCode.SUCCESS).send({
            data: {
                message: "Nft posted for sell, Please verify on marketplace.",
                status: ResponseCode.SUCCESS,
                success: true,
                action: NftStatuses.LISTED_FOR_SALE
            }
        });
    } else {
        logger.error(JSON.stringify(sale2Mktplace));
        res.status(ResponseCode.UNKNOWN_ERROR).send({
            message: "Nft sell failed,,",
            status: ResponseCode.UNKNOWN_ERROR,
            success: false
        });
    }


}

const verifyNft = async (payload: { comment: string, uuid: string, status: NftStatuses }, res: Response) => {
    if (!payload.uuid || !payload.status)
        return res.status(ResponseCode.BAD_REQUEST).send({
            message: 'Invalid request',
            status: ResponseCode.BAD_REQUEST,
            success: false
        });

    const nft: Nft = await DI.nftRepo.findOne({ uuid: payload.uuid });
    if (nft === null || ![NftStatuses.UNDER_REVIEW, NftStatuses.DECLINED].includes(nft.status))
        return res.status(ResponseCode.BAD_REQUEST).send({
            message: `Invalid request: ${nft.status} => ${payload.status} status can't be applied.`,
            status: ResponseCode.BAD_REQUEST,
            success: false
        });

    if (payload.status === NftStatuses.DECLINED) {
        if (nft.status === NftStatuses.UNDER_REVIEW) {
            nft.status = payload.status;
            nft.notes = payload.comment;
            await DI.nftRepo.persistAndFlush(nft);
            return res.send({
                data: {
                    status: ResponseCode.SUCCESS,
                    message: `Nft successfuly ${nft.status}.`,
                    success: true,
                    action: payload.status
                }
            });
        } else
            return res.status(ResponseCode.BAD_REQUEST).send({
                message: `Nft status is in ${nft.status} state.`,
                success: false,
                status: ResponseCode.BAD_REQUEST
            });
    } else if (payload.status === NftStatuses.APPROVED) {
        if ([NftStatuses.UNDER_REVIEW, NftStatuses.DECLINED].includes(nft.status)) {

            nft.status = payload.status;
            nft.notes = payload.comment;
            await DI.nftRepo.persistAndFlush(nft);
            const result = await nftMint(nft);
            if (result.data.status === ResponseCode.SUCCESS && result.data.success)
                return res.status(result.data.status).send({ data: result.data });
            else
                return res.status(result.data.status).send({ ...result.data });
        } else
            return res.status(ResponseCode.BAD_REQUEST).send({
                message: "Invalid request cant be processed.",
                success: false,
                status: ResponseCode.BAD_REQUEST
            });
    } else
        return res.status(ResponseCode.BAD_REQUEST).send({
            message: "Invalid request: Can't be processed.",
            success: false,
            status: ResponseCode.BAD_REQUEST
        });
}

export const nftVerificationRequest = async (req: Request<{ comment: string, uuid: string, status: NftStatuses }>, res: Response<ApiRes<ResponseBody>>, next: NextFunction) => {
    const payload = req.body;
    return await verifyNft(payload, res);
}
export const nftMint = async (nft: Nft): Promise<ApiRes<ResponseBody>> => {

    if (nft === null)
        return {
            data: {
                message: `Invalid Nft`,
                status: ResponseCode.BAD_REQUEST,
                success: false
            }
        };

    const serviceAccountSession = await getServiceAccountSession(); //serviceAccount session.
    if (serviceAccountSession === null)
        return {
            data: {
                message: "Fail to get service a/c session.",
                success: false,
                status: ResponseCode.UNKNOWN_ERROR
            }
        };

    const recipientDevESGWallet = await DI.walletRepo.findOne({ user: nft.createdBy }); //get recipient wallet
    if (recipientDevESGWallet === null) {
        return {
            data: {
                status: ResponseCode.BAD_REQUEST,
                message: "<b>No wallet:</b> User don't have any wallet.",
                success: false,
            }
        };
    }

    const receipientDevioWallet = await getWalletReferenceByUserName({ email: recipientDevESGWallet.email, uuid: serviceAccountSession?.uuid });
    if (receipientDevioWallet === null)
        return {
            data: {
                status: ResponseCode.BAD_REQUEST,
                message: `No wallet: User don't have any wallet registered with ${recipientDevESGWallet.email} id.`,
                success: false,
            }
        };

    nft.creditType = await DI.creditTypeRepo.findOne({ uuid: nft.creditType.uuid });
    try {
        const serviceAccount = await getServiceAccountSession();
        if (serviceAccount === null || !Object.keys(serviceAccount).includes('uuid'))
            return {
                data: {
                    message: 'Fail to retrive service a/c session',
                    status: ResponseCode.UNKNOWN_ERROR,
                    success: false
                }
            };

        const devvioNftMintObject = nftMintSchemaValidator.parse(parseToDevvioNftMintJson(nft, serviceAccount.uuid));
        const response = await call(NFTApi.MINT, devvioNftMintObject);
        if (response === null || response.status !== 200 || !Object.keys(response.data).includes('mintId')) {
            return {
                data: {
                    message: response.data.message,
                    status: ResponseCode.UNKNOWN_ERROR,
                    success: false
                }
            };
        }

        nft.status = NftStatuses.OWNED;
        nft.mintId = response.data.mintId;
        nft.mintReceiptUri = response.data.immutableUris[0];
        await DI.nftRepo.persistAndFlush(nft);

        const transfer = await transferNft(nft,);
        if (transfer.data.success === true && transfer.data.status === ResponseCode.SUCCESS)
            return {
                data: transfer.data
            }
        else
            return {
                data: transfer.data
            }
    } catch (err) {
        logger.error(err);
    }
    return {
        data: {
            message: "Something went wrong.",
            status: ResponseCode.UNKNOWN_ERROR,
            success: false
        }
    };

}

export const createNFTWithRemainingCreaditCount = async (nft: Nft) => {
    const em = DI.orm.em.fork(false);
    const {
        amount, artist, assetDescription, assetName, assetReferenceUrlHash, assetReferenceUrlRaw, createdBy,
        creditCount, creditType, creator, geography, locationCoordinates, mediaUuid, methodology, nftType, projectActivity,
        projectBatchId, projectCode, projectDescription, projectFromDate, projectName, projectId, projectStandard, projectTicker,
        projectToDate, projectType, projectValidator, projectVerifier, projectVintage, publicRegistry, publicRegistryLink, status
    } = nft;

    const nftData = {
        amount, artist, assetDescription, assetName, assetReferenceUrlHash, assetReferenceUrlRaw, createdBy,
        creditCount, creditType, creator, geography, locationCoordinates, mediaUuid, methodology, nftType, projectActivity,
        projectBatchId, projectCode, projectDescription, projectFromDate, projectName, projectId, projectStandard, projectTicker,
        projectToDate, projectType, projectValidator, projectVerifier, projectVintage, publicRegistry, publicRegistryLink, status
    };
    const newNft = wrap(new Nft()).assign(nftData, { em: em });
    newNft.status = NftStatuses.APPROVED;
    await DI.nftRepo.persistAndFlush(newNft);
    return newNft;
}

export const retireNft = async (req: Request, nft: Nft, payload: { nftRetireDate: Date, credits: string }, res: Response) => {

    if (nft === null)
        return res.status(ResponseCode.NOT_FOUND).send({
            status: ResponseCode.NOT_FOUND,
            success: false,
            message: `Oops! : No data found.`
        });

    if (Number(nft.creditCount) < Number(payload.credits))
        return res.status(ResponseCode.BAD_REQUEST).send({
            status: ResponseCode.BAD_REQUEST,
            success: false,
            message: `Oops! : Retire credits value(${payload.credits}) can't be greater than actual credits(${nft.creditCount})`
        });

    const loginSession: UserSession = await RedisClient.getValue(nft.createdBy.uuid);
    if (loginSession === null)
        return res.status(ResponseCode.UNAUTHORISED).send({
            status: ResponseCode.UNAUTHORISED,
            success: false,
            message: `User wallet session has expire. Please Login.`,
        });
    else if (loginSession?.code || loginSession?.message)
        return res.status(ResponseCode.BAD_REQUEST).send({
            status: ResponseCode.BAD_REQUEST,
            success: false,
            message: `Oops! : Invalid User wallet session, ${loginSession?.message}`
        });

    if (![NftStatuses.LISTED_FOR_SALE, NftStatuses.OWNED].includes(nft.status))
        return res.status(ResponseCode.BAD_REQUEST).send({
            status: ResponseCode.BAD_REQUEST,
            success: false,
            message: `Oops! : ${nft.status} Nft can't be retired`
        });
    /**
     * Retract NFT from marketplace if its already listed for sale.
     */
    if (nft.status === NftStatuses.LISTED_FOR_SALE) {

        const retractResponse = await call(NFTApi.RETRACT,
            {
                uuid: loginSession.walletSessionId,
                nftUri: nft.mintReceiptUri
            });
        if (retractResponse === null)
            return res.status(ResponseCode.UNKNOWN_ERROR).send({
                status: ResponseCode.UNKNOWN_ERROR,
                success: false,
                message: "Failed to retract, retract API failed"
            });

        if (retractResponse?.status !== 200 || retractResponse?.data?.code === 1010 || !Object.keys(retractResponse?.data).includes('nftUri'))
            return res.status(ResponseCode.UNKNOWN_ERROR).send({
                status: ResponseCode.UNKNOWN_ERROR,
                success: false,
                message: retractResponse?.data?.message
            });
    }

    if (nft.creditCount === payload.credits) {
        nft.status = NftStatuses.RETIRED;
        nft.retiredOn = payload.nftRetireDate;
        nft.creditCount = payload.credits;
        nft.saleReceiptUri = '';
        await DI.nftRepo.persistAndFlush(nft);
        return res.send({
            data: {
                status: ResponseCode.SUCCESS,
                success: true,
                message: `Nft has been ${nft.status} successfuly.`,
                action: NftStatuses.RETIRED
            }
        });
    } else {
        const allCreditsValue = Number.parseInt(nft.creditCount);

        nft.creditCount = payload.credits;
        nft.retiredOn = payload.nftRetireDate;
        nft.status = NftStatuses.RETIRED;
        await DI.nftRepo.persistAndFlush(nft);

        const wNft: Nft = cloneNftFrom(nft);
        wNft.creditCount = (Number(allCreditsValue) - Number(payload.credits)).toString();
        wNft.status = NftStatuses.UNDER_REVIEW;

        wNft.createdBy = nft.createdBy;
        await DI.nftRepo.persistAndFlush(wNft);

        return await verifyNft({
            comment: "Nft retired, left credits auto approval",
            uuid: wNft.uuid,
            status: NftStatuses.APPROVED
        }, res);
    }
}

const cloneNftFrom = (nft: Nft) => {
    const em = DI.orm.em.fork(false);
    return wrap(new Nft()).assign({
        ...getCreditsInformation(nft),
        ...getProjectOverview(nft),
        ...getProjectDetails(nft),
        ...getProjectValidation(nft)
    }, { em: em });
}

const getCreditsInformation = (nft: Nft) => {
    const { creditType, projectVintage, creditCount, nftType, assetName, assetDescription } = nft;
    return { creditType, projectVintage, creditCount, nftType, assetName, assetDescription };
}

const getProjectOverview = (nft: Nft) => {
    const { projectName, projectDescription, projectActivity, projectFromDate, projectToDate, amount, artist } = nft;
    return { projectName, projectDescription, projectActivity, projectFromDate, projectToDate, amount, artist };
}

const getProjectDetails = (nft: Nft) => {
    const { geography, locationCoordinates, projectId, projectBatchId, projectCode, projectTicker } = nft;
    return { geography, locationCoordinates, projectId, projectBatchId, projectCode, projectTicker };
}

const getProjectValidation = (nft: Nft) => {
    const { projectValidator, projectVerifier, projectStandard, methodology, mediaUuid,
        projectType, publicRegistry, publicRegistryLink, assetReferenceUrlHash, assetReferenceUrlRaw } = nft;
    return {
        projectValidator, projectVerifier, projectStandard, methodology, mediaUuid,
        projectType, publicRegistry, publicRegistryLink, assetReferenceUrlHash, assetReferenceUrlRaw
    };
}

export const getNftDetails = async (nft: Nft) => {
    let nftClientName;
    const creditType: CreditType = await DI.creditTypeRepo.findOne({ uuid: nft.creditType.uuid });
    if (nft !== null && nft.createdBy !== null) {
        const user: User = await DI.userRepo.findOne({ uuid: nft.createdBy.uuid });
        if (user !== null && user.type === 'client') {
            const client: Client = await DI.clientRepo.findOne({ uuid: user.client.uuid });
            nftClientName = client.name;
        }
    }

    return {
        ...nft,
        nftClientName,
        creditType: creditType.name,
    };
}

export const createDummyRetirementWallet = async () => {
    const partner: Partner = await DI.partnerRepo.findOne({ contactEmail: 'sales@devvesg.stream' });
    const wallet: Wallet = new Wallet();
    wallet.userName = 'DevvESG';
    wallet.partner = partner;
    wallet.emailVerified = WalletEmailVerificationStatus.NO;
    wallet.email = 'sales@devvesg.stream';
    await DI.walletRepo.persistAndFlush(wallet);
}

export const tokenSale = async (req: Request, res: Response) => {
    const {
        mint_id,
        payment_processor,
        sale_currency,
        sale_amount,
        item_uuid,
        order_id,
        buyer_wallet
    } = req.body;
    logger.info(`NFT sale callback from marketplace ${JSON.stringify(req.body)}`);
    try {
        const nft: Nft = await DI.nftRepo.findOne({ mintId: mint_id });

        if (nft !== null && nft.saleReceiptUri !== null && nft.status === NftStatuses.LISTED_FOR_SALE) {
            nft.soldPrice = sale_amount && isValidAmount(sale_amount) ? formatCurrency(sale_amount) : '';
            nft.soldCurrency = sale_currency && isValidCurency(sale_currency) ? sale_currency : '';
            nft.soldToWallet = buyer_wallet || '';
            nft.soldOrderId = order_id || '';
            nft.soldItemReference = item_uuid || '';
            nft.soldPaymentType = payment_processor || '';
            nft.status = NftStatuses.SOLD;

            await DI.nftRepo.persistAndFlush(nft);
            res.send({
                success: true,
                message: 'Sell Acknowledged'
            });
        } else {
            logger.error(`/tokenSale API Invalid request data: ${JSON.stringify(req.body)}`);
            res.status(400).send({
                success: false,
                message: "Invalid request"
            });
        }
    } catch (err) {
        logger.error(`/tokenSale API error:  ${JSON.stringify(err)}`);
        res.status(400).send({
            success: false,
            message: "Resource not found",
            error: err
        });
    }
}

export const transferMintedTokensToRespectiveWallet = async (req: Request, res: Response, next: NextFunction) => {

    const nfts: Nft[] = await DI.nftRepo.find({ status: NftStatuses.OWNED, transferReceiptUri: { $eq: null } }, { limit: 10, orderBy: { 'updatedAt': QueryOrder.DESC } });
    logger.info(`Total nft found ${nfts.length} to process.`);
    if (nfts !== null) {
        let totalProcessedNFT = 0;
        for (let i = 0; i < nfts.length; i++) {
            let nft: Nft = nfts[i];
            const response = await transferNft(nft);
            if (response.data.success == true && response.data.status === ResponseCode.SUCCESS) totalProcessedNFT++;
        }
        return res.send({ data: { totalProcessedNFT }, status: 'Transfer Completed Completed', success: true });
    } else {
        res.send({
            status: `All Processed, No Pending Transfer`,
            success: true
        });
    }
}

const transferNft = async (nft: Nft): Promise<ApiRes<ResponseBody>> => {
    if (!nft || nft.mintId === null || !nft.mintReceiptUri.includes('://') || nft.status !== NftStatuses.OWNED)
        return {
            data: {
                status: ResponseCode.BAD_REQUEST,
                message: "Nft can't be transfered",
                success: false
            }
        };

    const serviceAccountSession = await getServiceAccountSession(); //serviceAccount session.
    if (serviceAccountSession === null)
        return {
            data: {
                message: "Fail to get service a/c session.",
                success: false,
                status: ResponseCode.UNKNOWN_ERROR
            }
        };

    const recipientDevESGWallet = await DI.walletRepo.findOne({ user: nft.createdBy }); //get recipient wallet
    if (recipientDevESGWallet === null) {
        return {
            data: {
                status: ResponseCode.BAD_REQUEST,
                message: "No wallet: User don't have any wallet.",
                success: false,
            }
        };
    }

    const receipientDevioWallet = await getWalletReferenceByUserName({ email: recipientDevESGWallet.email, uuid: serviceAccountSession?.uuid });
    if (receipientDevioWallet === null)
        return {
            data: {
                status: ResponseCode.BAD_REQUEST,
                message: `No wallet: User don't have any wallet registered with ${recipientDevESGWallet.email} id.`,
                success: false,
            }
        };
    /**
     * Prepare tansfer payload
    */
    const transferInfo = {
        uuid: serviceAccountSession.uuid,
        nftUri: nft.mintReceiptUri,
        recipientAddr: receipientDevioWallet?.addr,
        clientId: randomUUID(),
        comment: `DevvEsg nft transfer to ${recipientDevESGWallet.userName}`
    };
    const transferResponse = await call(NFTApi.TRANSFER, transferInfo);
    if (transferResponse != null && transferResponse.status === 200) {
        if (Object.keys(transferResponse.data).includes("receiptUri") || Object.keys(transferResponse.data).includes('nftUri')) {
            nft.transferReceiptUri = transferResponse.data.receiptUri;
            nft.transferClientId = transferResponse.data.clientId;
            await DI.nftRepo.persistAndFlush(nft);
            return {
                data: {
                    status: ResponseCode.SUCCESS,
                    message: 'NFT Transfer completed.',
                    success: true,
                    action: 'TRANSFER',
                }
            }
        } else
            return {
                data: {
                    status: ResponseCode.UNKNOWN_ERROR,
                    message: `Transfer failed: ${transferResponse.data.message}`,
                    success: false,
                }
            };

    } else {
        logger.error(`Transfer service failed ${JSON.stringify(transferResponse)}`);
        return {
            data: {
                status: ResponseCode.UNKNOWN_ERROR,
                message: "Transfer service failed.",
                success: false,
            }
        };
    }

}

export const overviewData = async (req: Request, res: Response, next: NextFunction) => {

    const user = await DI.userRepo.findOne({ uuid: req.user.uuid });
    const driver = DI.orm.em.getDriver();
    const total = await driver.execute(`SELECT sum(cast(credit_count AS integer)) as credits from public.nft where status='OWNED' and created_by_uuid='${user.uuid}'`);
    return {
        totalCreditImpact: total[0].credits,  //number of credits == number of tons carbon. 
        totalOwnedCredit: total[0].credits,   // user owned credits
        totalCredisPurchased: total[0].credits // since we are not capturing prchase data, just for now.
    }
}