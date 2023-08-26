import React from 'react';

import { useTranslation } from 'react-i18next';

import { NftStatuses } from 'src/api';
import { ConfirmationModal } from 'src/common/components';
import { Textarea } from 'src/common/forms/Textarea';
import { Button } from 'src/common/interactions/Button';

import style from './nft.module.scss';
export const NftReviewFormContainer = (props: any) => {
    const { nft, onChange, backToList, approve, declined, spinner, nftMintApi } = props;

    const [confirmModal, setConfirmModal] = React.useState(false);

    const handleValidSubmit = (e: any) => {
        setConfirmModal(false)
        approve(e);
    }

    const { t } = useTranslation();
    return (
        <form>
            <div className={style.nftreviewdiv}>
                <div className={style.textarediv}>
                    <Textarea id="comment" name="comment" className={style.textarea} disabled={
                        nft.status !== NftStatuses.UNDER_REVIEW &&
                        nft.status !== NftStatuses.DECLINED
                    } rows={5} placeholder={t('placeholder.type-comment-here')} defaultValue={nft.notes} onChange={onChange} />
                </div>
                <div className={style.buttonarea}>
                    <div className={style.btndiv}>
                        <Button.Outline type="button" className={`${style.btn} uppercase`} onClick={backToList} >
                            {t('buttons.back')}
                        </Button.Outline>
                    </div>
                    <div className={style.btndiv} hidden={!(nft.status === NftStatuses.UNDER_REVIEW || nft.status === NftStatuses.DECLINED)}>
                        <Button.Primary type="button" className={`${style.btn} uppercase`} disabled={!spinner} onClick={() => setConfirmModal(true)} >
                            {t('buttons.approve')}
                        </Button.Primary>
                    </div>
                    <div className={style.btndiv} hidden={!(nft.status === NftStatuses.UNDER_REVIEW || nft.status === NftStatuses.DECLINED)}>
                        <Button.Secondary type="button" className={`${style.btn} uppercase`} disabled={!spinner} onClick={declined}>
                            {t('buttons.decline')}
                        </Button.Secondary>
                    </div>
                    <div className={style.btndiv} hidden={!(nft.status === NftStatuses.APPROVED)}>
                        <Button.Primary type="button" className={`${style.btn} uppercase`} disabled={!spinner} onClick={nftMintApi}>
                            {t('buttons.mint')}
                        </Button.Primary>
                    </div>
                </div>
            </div>
            <ConfirmationModal isOpen={confirmModal} onCancelModal={() => setConfirmModal(false)} title="Mint nft on approval.">
                <div className="px-20 mt-4">
                    <span className="text-500">{t('admin.mint-credits-confirmation')}</span>
                    <div className="flex justify-center mt-5">
                        <Button.Outline type="button" className="mr-4" onClick={() => setConfirmModal(false)}>
                            {t('buttons.nevermind')}
                        </Button.Outline>
                        <Button.Primary type="submit" onClick={handleValidSubmit}>
                            {t('buttons.yes')}
                        </Button.Primary>
                    </div>
                </div>
            </ConfirmationModal>
        </form>
    );
}
