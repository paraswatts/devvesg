import React, { useEffect, useState } from 'react';

import { Badge, Space, Spin } from 'antd';
import dayjs from "dayjs";
import { useTranslation } from 'react-i18next';
import { Navigate, generatePath, useNavigate } from 'react-router';
import { toast } from 'react-toastify';

import { Api, NftReviewUpdateParams, NftStatuses, useLazyQuery } from 'src/api';
import { useParams } from 'src/common/hooks';
import { Card, CardBody } from 'src/common/layout/cards';
import { getNftStatus, statusBadgeColor } from 'src/common/util';
import { Nft, ResponseOK } from 'src/interfaces';
import { AdminRoutes } from 'src/routes/admin/index';

import { AdminNftReadonlyViewContainer } from './AdminNftReadonlyViewContainer';
import style from './nft.module.scss';
import { NftReviewFormContainer } from './NftReviewFormContainer';
import 'src/common/styles/Table.module.scss';

export const AdminNftViewContainer = React.memo(() => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { nftUuid } = useParams<{ nftUuid: string }>();
    const [comment, setComment] = useState<string>("");
    const [spinner, setSpinner] = useState<boolean>(true);

    const spinnerController = (flag: boolean) => {
        setSpinner(flag);
    }
    
    const successHandler = (response: { data: ResponseOK }) => {
        spinnerController(true);
        toast.success(response?.data?.message);
        backToList(new Event("submited"));
    }
    
    const errorHandler = (error: ResponseOK) => {
        spinnerController(true);
        backToList(new Event("submited"));
    }  
    
    const [nftsQuery, nftsResponse] = useLazyQuery<string, { data: Nft }>(Api.nft.view);
    const [nftsReviewUpdate, nftsReviewUpdateResponse] = useLazyQuery<NftReviewUpdateParams, { data: ResponseOK }>(
        Api.nft.nftReviewUpdate, {
        onSuccess: successHandler,
        onError: errorHandler
    });

    const [nftMint] = useLazyQuery<string, { data: ResponseOK }>(
        Api.nft.nftMint, {
        onSuccess: successHandler,
        onError: errorHandler
    });  
    

    useEffect(() => {
        nftsQuery(nftUuid);
    }, [nftUuid, nftsQuery]);

    if (nftsReviewUpdateResponse.status === 'resolved') {
        return <Navigate to={generatePath(AdminRoutes.NFTS_LIST)} />;
    }

    const onChange = (event: any) => {
        setComment(event.target.value);
    }

    const nftMintApi = () => {
        spinnerController(false);
        nftMint(nft.uuid);
    }

    const submit = (action: string) => {
        const payload: NftReviewUpdateParams = {
            status: action,
            uuid: nftUuid
        };
        payload.comment = comment.length > 0 ? comment : nft.notes;
        nftsReviewUpdate(payload);
    }

    const declined = (event: any) => {
        setSpinner(false);
        submit(NftStatuses.DECLINED);
    }

    const approve = (event: any) => {
        setSpinner(false);
        submit(NftStatuses.APPROVED);
    }

    const backToList = (event: any) => {
        setSpinner(true);
        navigate(AdminRoutes.NFTS_LIST);
    }

    if (!nftsResponse.response?.data) {
        return null;
    }

    const nft = nftsResponse.response.data;

    const nftReview = { nft, onChange, backToList, approve, declined, spinner, nftMintApi };

    return (
        <>
            <div>
                <Card>
                    <CardBody>
                        <div>
                            <span className={style.headertext}>{t('admin.carbon-credits-form')}:
                                <Space size="middle" hidden={spinner}> <Spin size="large" /> </Space>
                            </span>
                        </div>
                        <div>
                            <div className="ml-5">
                                <div><h2>{t('admin.by')} {nft.nftClientName}. </h2></div>
                                <div>
                                    <span>
                                        <span className={style.contenttext}>{t('admin.submitted')}: </span>{dayjs(nft.createdAt).format('MMM DD,YYYY')}
                                    </span>
                                    <Badge.Ribbon text={getNftStatus(nft.status)} color={statusBadgeColor(nft.status)} />
                                </div>
                            </div>
                        </div>
                    </CardBody>
                </Card>
                <Card>
                    <CardBody>
                        <div>
                            <div>
                                <AdminNftReadonlyViewContainer nft={nft}></AdminNftReadonlyViewContainer>
                            </div>
                            <div>
                                <NftReviewFormContainer {...nftReview}></NftReviewFormContainer>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </>
    );
});
