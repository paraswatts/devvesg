import { memo } from 'react';

import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { t } from 'i18next';

import { DateFmt, NumberFmt } from 'src/common/formatters';
import { Card, CardBody } from 'src/common/layout/cards';

interface ESGImpactDisplayProps {
    value?: number;
    lastUpdated?: Date;
    title: string;
}

export const TotalCarbonImpactContainer = memo((props: ESGImpactDisplayProps) => {
    const { value, lastUpdated, title } = props;

    return (
        <Card>
            <CardBody>
                <div className="text-sm mb-2" >{title}<FontAwesomeIcon icon={faQuestionCircle} className="flex-none ml-8 white" title={t('analyse.total-carbon-impact')} /> </div>
                <div className="flex items-center text-xl" >
                    <div className="flex-1">
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
                        <div className="flex-1 text-4xl">
                            tCO<sub>2</sub>
                        </div>
                        <div className="flex-1 text-xl">
                            ({t('analyse.tons')} CO<sub>2</sub>)
                        </div>
                    </div>
                </div>

            </CardBody>
        </Card>
    );
});