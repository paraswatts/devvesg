import { useTranslation } from 'react-i18next';

import { CtaCardCarbonFootprint, CtaCardDevvXMarketplace } from 'src/common/components/call-to-action';
import { GlassBlockBanner } from 'src/common/components/glassblock-banner/glassblock-banner';
import { CallToActionLayout } from 'src/common/layout';
import { Card, CardBody } from 'src/common/layout/cards';
import { CarbonCreditsTabBar } from 'src/routes/clients/improve/carbon-credits/common';


import { CarbonCreditsOverviewContent } from './CarbonCreditsOverviewContent';


export const CarbonCreditsOverviewContainer = () => {
  const { t } = useTranslation();
  return (
    <CallToActionLayout ctas={[<CtaCardDevvXMarketplace />, <CtaCardCarbonFootprint />]}>
      <Card>
        <CarbonCreditsTabBar />
        <CardBody>
          <div className="text-3xl font-bold" role="heading" aria-level={1}>{t('improve.heading-a')}</div>
          <GlassBlockBanner/>
        </CardBody>
        <CarbonCreditsOverviewContent></CarbonCreditsOverviewContent>
      </Card>
    </CallToActionLayout>
  );
};
