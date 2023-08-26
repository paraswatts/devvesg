import { memo } from 'react';

import { useTranslation } from 'react-i18next';

import { DateFmt, NumberFmt } from 'src/common/formatters';
import { Card, CardBody } from 'src/common/layout/cards';

interface CarbonImpactDisplayProps {
  value?: number;
  lastUpdated?: Date;
}

export const CarbonImpactDisplayComponent = memo((props: CarbonImpactDisplayProps) => {
  const { value, lastUpdated } = props;
  const { t } = useTranslation();

  return (
    <Card>
      <CardBody>
        <div className="text-sm mb-2" >{t('analyse.total-carbon-impact')}</div>
        <div className="flex items-center"
          style={{
            font: 'normal normal normal 40px/42px Archivo',
            'color': 'var(---101011-900)',
            'textAlign': 'left'
          }}
        >
          <div className="flex-1">
            <span className="text-4xl">
              <NumberFmt value={value} fallback="&#8212;" maximumFractionDigits={1} />
            </span>
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
        <div className="text-xs mt-1">
          {t('analyse.last-updated')}:
          <span className="ml-1">
            <DateFmt value={lastUpdated} fallback="&#8212;" day="2-digit" month="2-digit" year="numeric" />
          </span>
        </div>
      </CardBody>
    </Card>
  );
});
