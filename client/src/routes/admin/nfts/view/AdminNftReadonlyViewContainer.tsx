import React, { ReactNode } from 'react';

import { Modal, Tag } from 'antd';
import dayjs from "dayjs";
import { useTranslation } from 'react-i18next';

import { PDFView } from 'src/common/components/pdf-modal/pdf-view-modal';
import { Nft } from 'src/interfaces';

import styles from './nft.module.scss'


export const AdminNftReadonlyViewContainer = ({ nft }: { nft: Nft }) => {

    const { t } = useTranslation();
    const [isVisible, setIsVisible] = React.useState<boolean>(false);
    const [assetUrl, setAssetUrl] = React.useState<string>("");
    const THeading = ({ children }: { children?: ReactNode }) => {
        return (
            <td className={`w-1/6 ${styles.heading}`} >{children}</td>
        )
    }

    const TBody = ({ title, value, description }: { title: ReactNode, value: ReactNode, description?: ReactNode }) => {
        return (
            <>
                <td className={styles.tbody} >{title}</td>
                <td className={styles.tbody} >{value}</td>
                <td className={styles.tbody} >{description}</td>
            </>
        )
    }

    const TInfo = ({ children }: { children?: ReactNode }) => {
        return (
            <td className={`w-1/6 ${styles.info}`} colSpan={4} >{children}</td>
        )
    }

    const showDocument = () => {
        setAssetUrl(nft.assetReferenceUrlRaw);
        setIsVisible(true);

    }


    const assetsModalView = {assetUrl};

    return (
        <>
            <table className={styles.table_container}>
                <thead>
                    <tr>
                        <THeading>{t('item')}</THeading>
                        <THeading>{t('admin.answer')}</THeading>
                        <THeading>{t('profile.description')}</THeading>
                    </tr>
                    <tr>
                        <TInfo> {t('improve.credit-information')}
                            <span style={{ float: 'right' }} onClick={showDocument}><Tag color="magenta" title={"Click to see the attachment."}>NFT Assets</Tag></span>
                        </TInfo>

                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <TBody
                            title={t('improve.vintage-label')}
                            value={nft.projectVintage}
                            description={t('improve.vintage-desc')}
                        />
                    </tr>
                    <tr>

                        <TBody
                            title={t('improve.credit-count-label')}
                            value={nft.creditCount}
                            description={t('improve.credit-count-desc')}
                        />
                    </tr>
                    <tr>

                        <TBody
                            title={t('improve.type-label')}
                            value={nft.creditType}
                            description={t('improve.type-desc')}
                        />
                    </tr>
                    <tr>
                        <TInfo>{t('improve.project-overview')}</TInfo>
                    </tr>
                    <tr>
                        <TBody
                            title={t('project.project-name')}
                            value={nft.projectName}
                            description={t('improve.project-name-desc')}
                        />
                    </tr>
                    <tr>
                        <TBody
                            title={t('improve.project-description')}
                            value={nft.projectDescription}
                            description={t('improve.project-description-desc')}
                        />
                    </tr>
                    <tr>
                        <TBody
                            title={t('improve.project-activity')}
                            value={nft.projectActivity}
                            description={t('improve.project-activity-desc')}
                        />
                    </tr>
                    <tr>
                        <TBody
                            title={t('improve.project-start-date')}
                            value={dayjs(nft.projectFromDate).format('MMM DD,YYYY')}
                            description={t('improve.project-start-date-desc')}
                        />
                    </tr>
                    <tr>
                        <TBody
                            title={t('improve.project-end-date')}
                            value={dayjs(nft.projectToDate).format('MMM DD,YYYY')}
                            description={t('improve.project-end-date-desc')}
                        />
                    </tr>
                    <tr>
                        <TInfo>{t('improve.project-details')}</TInfo>
                    </tr>
                    <tr>
                        <TBody
                            title={t('improve.project-details')}
                            value={nft.geography}
                            description={t('improve.geography-desc')}
                        />
                    </tr>
                    <tr>
                        <TBody
                            title={t('improve.location-label')}
                            value={nft.locationCoordinates}
                            description={t('improve.location-desc')}
                        />
                    </tr>
                    <tr>
                        <TBody
                            title={t('improve.project-id-label')}
                            value={nft.projectId}
                            description={t('improve.project-id-desc')}
                        />
                    </tr>
                    <tr>
                        <TBody
                            title={t('improve.project-batch-id-label')}
                            value={nft.projectBatchId}
                            description={t('improve.project-batch-id-desc')}
                        />
                    </tr>
                    <tr>
                        <TBody
                            title={t('improve.project-code-label')}
                            value={nft.projectCode}
                            description={t('improve.project-code-desc')}
                        />
                    </tr>
                    <tr>
                        <TBody
                            title={t('improve.project-ticker-label')}
                            value={nft.projectTicker}
                            description={t('improve.project-ticker-desc')}
                        />
                    </tr>
                    <tr>
                        <TInfo>{t('improve.project-validation')}</TInfo>
                    </tr>
                    <tr>
                        <TBody
                            title={t('improve.validator-label')}
                            value={nft.projectValidator}
                            description={t('improve.validator-desc')}
                        />
                    </tr>
                    <tr>
                        <TBody
                            title={t('improve.verifier-label')}
                            value={nft.projectVerifier}
                            description={t('improve.verifier-label')}
                        />
                    </tr>
                    <tr>
                        <TBody
                            title={t('improve.standard-label')}
                            value={nft.projectStandard}
                            description={t('improve.standard-desc')}
                        />
                    </tr>
                    <tr>
                        <TBody
                            title={t('improve.methodology-label')}
                            value={nft.methodology}
                            description={t('improve.methodology-desc')}
                        />
                    </tr>
                    <tr>
                        <TBody
                            title={t('improve.project-type-label')}
                            value={nft.projectType}
                            description={t('improve.project-type-desc')}
                        />
                    </tr>
                    <tr>
                        <TBody
                            title={t('improve.registry-label')}
                            value={nft.publicRegistry}
                            description={t('improve.registry-desc')}
                        />
                    </tr>
                    <tr>
                        <TBody
                            title={t('improve.registry-link-label')}
                            value={<a href={nft.publicRegistryLink}  target="_blank" rel="noreferrer" >{nft.publicRegistryLink}</a>}
                            description={t('improve.registry-link-desc')}
                        />
                    </tr>
                </tbody>
            </table>
            <Modal
                title="NFT Assets View."
                centered
                visible={isVisible}
                onOk={() => { setIsVisible(false); }}
                onCancel={() => { setIsVisible(false); }}
                width={900}
                bodyStyle={{ overflowY: 'scroll', height: '500px' }}
            >
                <div hidden={assetUrl ? false : true}>
                    <PDFView {...assetsModalView}></PDFView>
                </div>
            </Modal>
        </>
    )
}