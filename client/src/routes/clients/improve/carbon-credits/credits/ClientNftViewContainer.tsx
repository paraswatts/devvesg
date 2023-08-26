import React, { useEffect, useState } from 'react';

import { Badge, Space, Spin } from 'antd';
import dayjs from "dayjs";
import { useTranslation } from 'react-i18next';
import { generatePath, useNavigate } from 'react-router';
import { toast } from 'react-toastify';

import { Api, NftStatuses, useLazyQuery } from 'src/api';
import { ConfirmationModal, Modal } from 'src/common/components';
import { useParams } from 'src/common/hooks';
import { Button } from 'src/common/interactions/Button';
import { CallToActionLayout } from 'src/common/layout';
import { Card, CardBody } from 'src/common/layout/cards';
import { getNftStatus, statusBadgeColor } from 'src/common/util';
import { Nft, NftSale, ResponseOK, RetireNFT } from 'src/interfaces';
import { AdminNftSaleContainer } from 'src/routes/admin/nfts/sale/AdminNftSaleContainer';
import { AdminNftReadonlyViewContainer } from 'src/routes/admin/nfts/view/AdminNftReadonlyViewContainer';
import 'src/common/styles/Table.module.scss';
import { RetireNFTModal } from 'src/routes/admin/nfts/view/RetireNFTModal';
import { ClientAbsoluteRoutes } from 'src/routes/clients/ClientRouter';
import { useClient } from 'src/routes/clients/providers/ClientProvider';
import { WalletRegistrationNotification } from 'src/routes/clients/wallet/WalletRegistrationNotification';

import style from 'src/routes/admin/nfts/view/nft.module.scss';
interface ModalControl {
    title?: string,
    isOpen: boolean,
    uuid?: string
}

export const ClientNftViewContainer = React.memo(() => {

    const { t } = useTranslation();
    const { nftUuid, type } = useParams<{ nftUuid: string, type: string }>();
    const { client } = useClient();
    const [confirmModal, showConfirmModal] = useState<boolean>(false);
    const [spinner, setSpinner] = useState<boolean>(true);
    const [modalControlData, setModalControlData] = useState<ModalControl>({
        title: t('admin.nft-sale'),
        isOpen: false,
    });
    const navigate = useNavigate();

    const successHandler = (response: { data: ResponseOK }) => {
        spinnerControl(true);
        toast.success(response?.data?.message);
        navigate(generatePath(type === '1' ? ClientAbsoluteRoutes.CARBON_CREDITS_CREDITS : ClientAbsoluteRoutes.PLASTIC_CREDITS_CREDITS, { clientUuid: client.uuid }));
    }
    const errorHandler = (error: ResponseOK) => {
        spinnerControl(true);
        cancelModal();
    }

    const [nftsQuery, nftsResponse] = useLazyQuery<string, { data: Nft }>(Api.nft.view);
    const [nftsFullViewQuery, nftsFullViewResponse] = useLazyQuery<string, { data: Nft }>(Api.nft.fetch);
    const [nftsSaleQuery] = useLazyQuery<NftSale, { data: ResponseOK }>(Api.nft.nftSale, {
        onSuccess: successHandler,
        onError: errorHandler
    });

    useEffect(() => {
        nftsQuery(nftUuid);
        nftsFullViewQuery(nftUuid);
    }, [nftUuid, nftsQuery, nftsFullViewQuery]);

    const [nftsRetireQuery] = useLazyQuery<RetireNFT, { data: ResponseOK }>(Api.nft.retire, {
        onSuccess: successHandler,
        onError: errorHandler
    });
    const backToList = () => {
        navigate(generatePath(type === '1' ? ClientAbsoluteRoutes.CARBON_CREDITS_CREDITS : ClientAbsoluteRoutes.PLASTIC_CREDITS_CREDITS, { clientUuid: client.uuid }));
    }

    const spinnerControl = (flag: boolean) => {
        setSpinner(flag);
    }

    const submitRetireNFT = (data: RetireNFT) => {
        spinnerControl(false);
        nftsRetireQuery(data);
        showConfirmModal(false);
    }

    const submitNFTSaleDetails = (data: NftSale) => {
        setSpinner(false);
        nftsSaleQuery(data);
        return false;
    }

    const showNftSaleModal = () => {
        setModalControlData(prevState => ({ ...prevState, isOpen: true }))
    }

    const cancelModal = () => {
        setModalControlData(prevState => ({ ...prevState, isOpen: false }));
    }

    if (!nftsFullViewResponse.response?.data) {
        return null;
    }

    if (!nftsResponse.response?.data) {
        return null;
    }

    const nft = nftsResponse.response.data;
    const nftRetireModal = { nft, showConfirmModal, submitRetireNFT };

    return (
        <CallToActionLayout>
            <Card>
                <CardBody>
                    <Card>
                        <div>
                            <span className={style.headertext}>{t('improve.carbon-credit-form')}:
                                <Space size="middle" hidden={spinner}> <Spin size="large" /> </Space>
                            </span>
                        </div>
                        <WalletRegistrationNotification></WalletRegistrationNotification>
                        <div className="mt-10">
                            <div className="ml-5">
                                <div><h2>{t('admin.by')} {nft.nftClientName}. </h2></div>
                                <div className="mb-10">
                                    <span>
                                        <span className={style.contenttext}>{t('admin.submitted')}: </span>{dayjs(nft.createdAt).format('MMM DD,YYYY')}
                                    </span>
                                    <Badge.Ribbon text={getNftStatus(nft.status)} color={statusBadgeColor(nft.status)} />
                                </div>
                            </div>
                        </div>
                    </Card>
                    <AdminNftReadonlyViewContainer nft={nft}></AdminNftReadonlyViewContainer>
                    <div className='p-5'>
                        <div className={style.btndiv}>
                            <Button.Outline type="button" className={`${style.btn} uppercase`} onClick={backToList} >
                                {t('buttons.back')}
                            </Button.Outline>
                        </div>
                        <div className={style.btndiv} hidden={!(nft.status === NftStatuses.OWNED || nft.status === NftStatuses.LISTED_FOR_SALE)}>
                            <Button.Primary type="button" className={`${style.btn} uppercase`} disabled={!spinner} onClick={() => showConfirmModal(true)} >
                                {t('buttons.retire')}
                            </Button.Primary>
                        </div>
                        <div className={style.btndiv} hidden={!(nft.status === NftStatuses.OWNED)}>
                            <Button.Primary type="button" className={`${style.btn} uppercase`} disabled={!spinner} onClick={showNftSaleModal} >
                                {t('buttons.list-for-sale')}
                            </Button.Primary>
                        </div>
                    </div>
                </CardBody>
            </Card>
            <ConfirmationModal isOpen={confirmModal} onCancelModal={() => showConfirmModal(false)} title={t('admin.retire-carbon-credits')} >
                <RetireNFTModal {...nftRetireModal}></RetireNFTModal>
            </ConfirmationModal>
            <div className="md:grid">
                <Modal
                    title={modalControlData.title}
                    isOpen={modalControlData.isOpen}
                    onCancelModal={cancelModal}
                    slim={false}
                >
                    <AdminNftSaleContainer nft={nft} submitNFTSaleDetails={submitNFTSaleDetails} cancelModal={cancelModal}></AdminNftSaleContainer>
                </Modal>
            </div>
        </CallToActionLayout>
    );
});

