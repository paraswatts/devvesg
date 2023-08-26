import { useCallback, useState } from 'react';

import { useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import { generatePath, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { CtaCardCarbonFootprint } from 'src/common/components/call-to-action';
import { CallToActionLayout } from 'src/common/layout';
import { Card, CardBody, CardSubtitle, CardTitle, CardTitles } from 'src/common/layout/cards';
import {
  ClientFootprintCreate,
  ClientFootprintCreateVariables,
} from 'src/routes/clients/analyze/carbon/calculator/__gql__/ClientFootprintCreate';
import { CLIENT_FOOTPRINT_CREATE } from 'src/routes/clients/analyze/carbon/calculator/CarbonCalculatorContainer.query';
import { CarbonCalculatorForms } from 'src/routes/clients/analyze/carbon/calculator/CarbonCalculatorForms';
import { CarbonTabBar } from 'src/routes/clients/analyze/carbon/common';
import { ClientAbsoluteRoutes } from 'src/routes/clients/ClientRouter';
import { CarbonImpactDisplayComponent } from 'src/routes/clients/components/CarbonImpactDisplay';
import { useClient } from 'src/routes/clients/providers/ClientProvider';

export const CarbonCalculatorContainer = () => {
  const navigate = useNavigate();
  const { client } = useClient();
  const { t } = useTranslation();
  const [total, setTotal] = useState(0);

  const [create, { loading }] = useMutation<ClientFootprintCreate, ClientFootprintCreateVariables>(
    CLIENT_FOOTPRINT_CREATE,
    {
      variables: {
        clientId: client.uuid,
        total,
      },
      onCompleted: (response) => {
        toast.success('Footprint updated!');
        navigate(generatePath(ClientAbsoluteRoutes.CARBON_IMPACT, { clientUuid: client.uuid }));
      },
    },
  );

  const handleTotalChange = useCallback((total: number) => setTotal(total), []);
  const handleSubmit = useCallback(() => create(), [create]);

  return (
    <CallToActionLayout ctas={[<CtaCardCarbonFootprint />]}>
      <Card>
        <CarbonTabBar />

        <CardBody>
          <div className="flex flex-col gap-4">
            <CardTitles>
              <CardTitle>{t('analyse.carbon-impact-calculator')}</CardTitle>

              <CardSubtitle>{t('analyse.carbon-impact-calculator-desc')}</CardSubtitle>
            </CardTitles>

            <div className="shadow-xl rounded-xl">
              <CarbonImpactDisplayComponent value={total} />
            </div>

            <CarbonCalculatorForms onChange={handleTotalChange} onSubmit={handleSubmit} loading={loading} />
          </div>
        </CardBody>
      </Card>
    </CallToActionLayout>
  );
};
