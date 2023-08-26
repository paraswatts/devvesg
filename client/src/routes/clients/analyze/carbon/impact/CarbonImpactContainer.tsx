import { useState } from 'react';

import { useMutation, useQuery } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import { Link, generatePath } from 'react-router-dom';
import { toast } from 'react-toastify';

import { CtaCardCarbonFootprint } from 'src/common/components/call-to-action';
import { CallToActionLayout } from 'src/common/layout';
import { Card, CardBody, CardTitle, CardTitles } from 'src/common/layout/cards';
import {
  ClientFootprintCreate,
  ClientFootprintCreateVariables,
} from 'src/routes/clients/analyze/carbon/calculator/__gql__/ClientFootprintCreate';
import { CLIENT_FOOTPRINT_CREATE } from 'src/routes/clients/analyze/carbon/calculator/CarbonCalculatorContainer.query';
import { CarbonTabBar } from 'src/routes/clients/analyze/carbon/common';
import {
  GetLatestFootprint,
  GetLatestFootprintVariables,
} from 'src/routes/clients/analyze/carbon/impact/__gql__/GetLatestFootprint';
import { GET_LATEST_FOOTPRINT } from 'src/routes/clients/analyze/carbon/impact/CarbonImpactContainer.query';
import { CarbonImpactForm, CarbonImpactFormValues } from 'src/routes/clients/analyze/carbon/impact/CarbonImpactForm';
import { ClientAbsoluteRoutes } from 'src/routes/clients/ClientRouter';
import { CarbonImpactDisplayComponent } from 'src/routes/clients/components/CarbonImpactDisplay';
import { useClient } from 'src/routes/clients/providers/ClientProvider';

export const CarbonImpactContainer = () => {
  const { client } = useClient();
  const { t } = useTranslation();
  const [impact, setImpact] = useState<{ total?: number; createdAt?: Date }>({});
  const [resetTrigger, setResetTrigger] = useState<Date | undefined>(undefined);

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

  const [createFootprint, { loading }] = useMutation<ClientFootprintCreate, ClientFootprintCreateVariables>(
    CLIENT_FOOTPRINT_CREATE,
    {
      onCompleted: (response) => {
        if (!response.clientFootprintCreate) {
          return;
        }
        toast.success(t('analyse.footprint-updated'));
        setImpact({
          total: response.clientFootprintCreate.total,
          createdAt: new Date(response.clientFootprintCreate.createdAt),
        });
        setResetTrigger(new Date());
      },
    },
  );

  const handleSubmit = (value: CarbonImpactFormValues) => {
    createFootprint({
      variables: {
        clientId: client.uuid,
        total: value.total,
      },
    });
  };

  return (
    <CallToActionLayout ctas={[<CtaCardCarbonFootprint />]}>
      <Card>
        <CarbonTabBar />

        <CardBody>
          <div className="flex flex-col gap-4">
            <CardTitles>
              <CardTitle>{t('analyse.whats-your-carbon-impact')}</CardTitle>
            </CardTitles>

            <div className="shadow-xl rounded-xl mt-3">
              <CarbonImpactDisplayComponent value={impact.total} lastUpdated={impact.createdAt} />
            </div>

            <p className="text-neutral-700">{t('analyse.already-known-impact-text')}</p>

            <CarbonImpactForm onSubmit={handleSubmit} loading={loading} resetTrigger={resetTrigger} />

            <Link to={generatePath(ClientAbsoluteRoutes.CARBON_CALCULATOR, { clientUuid: client.uuid })}>
              {t('analyse.dont-know-carbon-impact-link')}
            </Link>
          </div>
        </CardBody>
      </Card>
    </CallToActionLayout>
  );
};
