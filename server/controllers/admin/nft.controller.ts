import { QueryOrder, wrap } from '@mikro-orm/core';
import { NextFunction, Request, Response, Router } from 'express';

import { NftStatuses } from '../../enums';
import { Nft } from '../../entities/nft.entity';
const router = Router();
import { DI } from '../../index';
import {
    generateHashOfString,
    getMulterDocumentConfig,
    userHasType
} from '../../lib/util';
import { uploadFile } from '../../config/s3';
import { MediaEntityTypes, ResponseCode } from '../../interfaces';
import passport from 'passport';
import { UserTypes } from '../../entities/user.entity';
import { CreditType } from '../../entities/credit-type.entity';
import { getNftDetails, nftMint, nftSale, NftSale, nftVerificationRequest, overviewData, retireNft, tokenSale, transferMintedTokensToRespectiveWallet } from '../../services/nft.service';

const uploadDocs = getMulterDocumentConfig();


router.post('/',
    passport.authenticate('jwt', { session: false }),
    uploadDocs.single('asset'),
    async (req: Request, res: Response, next: NextFunction) => {

        const em = DI.orm.em.fork(false);
        const payload = req.body;

        const file = req.file;
        const parsed = JSON.parse(payload.data);

        const creditType = await DI.creditTypeRepo.findOneOrFail(parsed.creditType);
        parsed.creditType = creditType;
        req.body.projectFromDate = new Date(parsed.projectFromDate);
        req.body.projectToDate = new Date(parsed.projectToDate);

        const nft = wrap(new Nft()).assign(parsed, { em: em });
        nft.status = NftStatuses.UNDER_REVIEW;

        if (file) {
            const result = await uploadFile(file, MediaEntityTypes.NFT, 'asset', nft.mediaUuid);
            nft.assetReferenceUrlRaw = result.Location;
            nft.assetReferenceUrlHash = generateHashOfString(result.Location).hash;
        }

        nft.createdBy = await DI.userRepo.findOne(req.user.uuid);
        await em.persistAndFlush(nft);
        res.send({ data: { ...nft, creditType: { ...creditType } } });
    });

router.put(
    '/:nftId/assets',
    passport.authenticate('jwt', { session: false }),
    uploadDocs.single('asset'),
    async (req: Request, res: Response, next: NextFunction) => {

        const file = req.file;
        const nftId = req.params['nftId'];

        if (file) {
            const nft: Nft = await DI.nftRepo.findOne({ uuid: req.params['nftId'], mintId: null, status: NftStatuses.UNDER_REVIEW });

            if (nft === null) res.status(404).send({ message: 'no-record-found' });
            else {
                const result = await uploadFile(file, MediaEntityTypes.NFT, 'asset', nftId);
                nft.assetReferenceUrlRaw = result.Location;
                nft.assetReferenceUrlHash = generateHashOfString(result.Location).hash;
                DI.nftRepo.persistAndFlush(nft);
                res.send(nft);
            }
        } else {
            res.status(400).send({ message: 'incomplete-request' });
        }

    });

router.post('/all',
    passport.authenticate('jwt', { session: false }),
    async (req: Request, res: Response, next: NextFunction) => {
        const body = req.body;
        let limit: number = body.size ? body.size : 10;
        let offset: number = body.page ? (body.page - 1) * limit : 0;
        let orderBy = body?.orderBy || { createdAt: QueryOrder.DESC }
        let nfts: Nft[] = []
        const type = req.body.type;
        const creditType = await DI.creditTypeRepo.findOne({ type: type });

        if (req.user.type !== UserTypes.ADMIN) {
            nfts = await DI.nftRepo.find({ createdBy: req.user?.uuid, creditType: { uuid: creditType?.uuid } }, { offset, limit, orderBy: orderBy });
            body.total = await DI.nftRepo.count({ createdBy: req.user?.uuid, creditType: { uuid: creditType?.uuid } });
        }
        else {
            nfts = await DI.nftRepo.find({ status: { $in: [NftStatuses.UNDER_REVIEW, NftStatuses.DECLINED, NftStatuses.APPROVED] } }, { offset, limit, orderBy: orderBy });
            body.total = await DI.nftRepo.count({ status: { $in: [NftStatuses.UNDER_REVIEW, NftStatuses.DECLINED] } });
        }
        nfts.forEach(async (item) => {
            item.signMedia();
            item.creditType = await DI.creditTypeRepo.findOne({ uuid: item.creditType.uuid });
        });

        const nftsUpdated: any = [];
        for (const item of nfts) {
            nftsUpdated.push(await getNftDetails(item));
        }
        res.json({ 'data': { 'nfts': nftsUpdated, 'pagination': body } });
    });


router.put('/:nftId/verification',
    passport.authenticate('jwt', { session: false }),
    userHasType([UserTypes.ADMIN]),
    nftVerificationRequest
);

router.post('/:nftId/mint',
    passport.authenticate('jwt', { session: false }),
    userHasType([UserTypes.ADMIN]),
    async (req: Request, res: Response, next: NextFunction) => {
        const nft: Nft = await DI.nftRepo.findOne({ uuid: req.params['nftId'], status: NftStatuses.APPROVED, mintId: null });
        const result = await nftMint(nft);
        if (result.data.status === ResponseCode.SUCCESS && result.data.success)
            return res.status(result.data.status).send(result);
        else
            return res.status(result.data.status).send(result.data);
    });

router.put('/:nftId/sale',
    passport.authenticate('jwt', { session: false }),
    async (req: Request<NftSale>, res: Response, next) => {
        const nft: Nft = await DI.nftRepo.findOne({ uuid: req.params['nftId'], status: NftStatuses.OWNED });
        try {
            nft.creditType = await DI.creditTypeRepo.findOne({ uuid: nft.creditType.uuid });
            return await nftSale(req, res, nft);
        } catch (ex) {
            res.status(500).send({ 'message': 'something-went-wrong.' });
        }
    });

router.get('/transfer',
    userHasType([UserTypes.ADMIN, UserTypes.CLIENT]),
    async (req: Request, res: Response, next: NextFunction) => {
        return await transferMintedTokensToRespectiveWallet(req, res, next);
    });

router.get('/:nftId',
    passport.authenticate('jwt', { session: false }),
    async (req: Request, res: Response, next: NextFunction) => {
        const nft: Nft = await DI.nftRepo.findOne({ uuid: req.params['nftId'] });
        if (nft !== null) {
            nft.signMedia();
            const creditType: CreditType = await DI.creditTypeRepo.findOne({ uuid: nft.creditType.uuid });
            res.send({ 'data': { ...nft, creditType: creditType?.name } });
        } else {
            res.status(404).send();
        }
    });

router.get('/:nftId/view',
    passport.authenticate('jwt', { session: false }),
    async (req: Request, res: Response, next: NextFunction) => {
        const nft: Nft = await DI.nftRepo.findOne({ uuid: req.params['nftId'] });
        let otherdetails = {};
        if (nft !== null) {
            nft.signMedia();
            const data = await getNftDetails(nft);
            res.send({
                data
            });
        } else {
            res.status(404).send({ success: false });
        }
    });

router.post('/tokenSale',
    async (req: Request, res: Response, next: NextFunction) => {
        return await tokenSale(req, res);
    });


router.post('/:nftId/retire',
    passport.authenticate('jwt', { session: false }),
    userHasType([UserTypes.ADMIN, UserTypes.CLIENT]),
    async (req: Request<{ uuid, nftRetireDate, credits }>, res: Response, next: NextFunction) => {
        const nft: Nft = await DI.nftRepo.findOne({ uuid: req.params['nftId'] || req.body.uuid });
        const payload = req.body;
        await retireNft(req, nft, payload, res);

    });

router.get('/overview/data',
    passport.authenticate('jwt', { session: false }),
    userHasType([UserTypes.ADMIN, UserTypes.CLIENT]),
    async (req: Request, res: Response, next: NextFunction) => {
        const data = await overviewData(req, res, next);
        res.send({
            data
        });
    });


export const NftController = router;
