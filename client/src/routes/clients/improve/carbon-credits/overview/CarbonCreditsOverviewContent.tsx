
import React, { useEffect, useState } from 'react';

import { useQuery } from '@apollo/client';
import { t } from 'i18next';
import { generatePath } from 'react-router';

import { Api, NFTOverviewPageData, useLazyQuery } from 'src/api';
import { LinkButton } from 'src/common/interactions/Button';
import { Card, CardBody } from 'src/common/layout/cards';
import { GetLatestFootprint, GetLatestFootprintVariables } from 'src/routes/clients/analyze/carbon/impact/__gql__/GetLatestFootprint';
import { GET_LATEST_FOOTPRINT } from 'src/routes/clients/analyze/carbon/impact/CarbonImpactContainer.query';
import { ClientAbsoluteRoutes } from 'src/routes/clients/ClientRouter';
import { useClient } from 'src/routes/clients/providers/ClientProvider';

import style from './CarbonCreditsOverviewContent.module.scss';
import { CarbonCreditsOwnedContainer } from './CarbonCreditsOwnedContainer';
import { CarbonCreditsPurchasedContainer } from './CarbonCreditsPurchasedContainer';
import { TotalCarbonImpactContainer } from './TotalCarbonImpactContainer';

export const CarbonCreditsOverviewContent = React.memo(() => {
    const { client } = useClient();
    const [overview, setOverview] = React.useState<NFTOverviewPageData>({});
    const [impact, setImpact] = useState<{ total?: number; createdAt?: Date }>({});
    useQuery<GetLatestFootprint, GetLatestFootprintVariables>(GET_LATEST_FOOTPRINT, {
        variables: {
            clientId: client.uuid,
        },
        onCompleted: (response) => {
            if (!response.client.latestFootprint) {
                return;
            }
            setImpact({
                total: response.client.latestFootprint.total,
                createdAt: new Date(response.client.latestFootprint.createdAt),
            });
        },
    });
    const [getCreditsInfo] = useLazyQuery<null, { data: NFTOverviewPageData }>(Api.nftOverview.getOverviewDetails, {
        onSuccess: (res) => {
            setOverview(res.data);
        }
    });

    useEffect(() => { getCreditsInfo(null) }, [getCreditsInfo]);

    return (
        <div>
            <div className={style.content}>
                <h1 className={style.title}>{t('improve.title')}</h1>
                <p className={style.subtitle}>
                    {t('improve.subtitle')}
                    <LinkButton.Primary className="ml-10" to={generatePath(ClientAbsoluteRoutes.CARBON_CREDITS_ADD, { clientUuid: client.uuid })}>
                        {t('improve.add-credits')}
                    </LinkButton.Primary>
                </p>
            </div>
            <div className="ml-10 mr-10" >
                <Card>
                    <CardBody>
                        <div className="flex flex-col gap-4">
                            {/* <div className="shadow-xl rounded-xl mt-3">
                                <CarbonImpactDisplayComponent value={impact.total} lastUpdated={impact.createdAt} />
                            </div> */}
                            <div className="shadow-xl rounded-xl">
                                <TotalCarbonImpactContainer lastUpdated={impact.createdAt} value={impact.total} title={t('analyse.total-carbon-impact')}></TotalCarbonImpactContainer>
                            </div>
                        </div>
                        <div className="flex flex-col mt-6">
                            <div className="shadow-xl rounded-xl">
                                <CarbonCreditsOwnedContainer lastUpdated={new Date()} value={overview.totalOwnedCredit} title={t('improve.carbon-credits-owned')}></CarbonCreditsOwnedContainer>
                            </div>
                        </div>
                        <div className="flex flex-col mt-6">
                            <div className="shadow-xl rounded-xl">
                                <CarbonCreditsPurchasedContainer lastUpdated={new Date()} value={overview.totalCredisPurchased} title={t('improve.carbon-credits-purchased')}></CarbonCreditsPurchasedContainer>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </div>

        </div>
    );
});
