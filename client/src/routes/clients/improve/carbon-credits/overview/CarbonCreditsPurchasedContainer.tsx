import React from 'react';

import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { t } from 'i18next';
import { Link, generatePath } from 'react-router-dom';

import { DateFmt, NumberFmt } from 'src/common/formatters';
import { Card, CardBody } from 'src/common/layout/cards';
import { ClientAbsoluteRoutes } from 'src/routes/clients/ClientRouter';
import { useClient } from 'src/routes/clients/providers/ClientProvider';

import styles from  './CarbonCreditsOverviewContent.module.scss';


interface ESGImpactDisplayProps {
    value?: number;
    lastUpdated?: Date;
    title: string;
}
export const CarbonCreditsPurchasedContainer = React.memo((props: ESGImpactDisplayProps) => {
    const { client } = useClient();
    const { value, lastUpdated, title } = props;

    return (
        <Card>
            <CardBody>
                <div className="flex items-center">
                    <div className="flex-1">
                    <div className="text-sm mb-2" >{title}<FontAwesomeIcon icon={faQuestionCircle} title={t('improve.carbon-credits-purchased')} className="flex-none ml-8 white" /></div>
                        <span className="text-4xl">
                            <NumberFmt value={value} fallback="&#8212;" maximumFractionDigits={1} />
                        </span>
                        <div className="text-xs mt-1">
                            {t('analyse.last-updated')}:
                            <span className="ml-1">
                                <DateFmt value={lastUpdated} fallback="&#8212;" day="2-digit" month="short" year="numeric" />
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-1 items-center">
                        <div className="mr-10 text-4xl">
                            {t('credits')}
                        </div>
                        <div className={styles.circlearea} >
                            <div className={`flex-1 text-xl pt-8 ${styles.circletext}`} >
                                CO<sub>2</sub>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="text-lg mt-3 underline">
                    <Link to={generatePath(ClientAbsoluteRoutes.CARBON_CREDITS_CREDITS, { clientUuid: client.uuid })}>{t('improve.view-purchase-credits')}</Link>
                </div>
            </CardBody>
        </Card>
    );
});