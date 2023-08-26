import { useState } from 'react';

import { useTranslation } from 'react-i18next';
import {  generatePath, useNavigate } from 'react-router-dom';

import { Api, NftNewParams, useLazyQuery } from 'src/api';
import { CtaCardDevvXMarketplace } from 'src/common/components/call-to-action';
import { Button } from 'src/common/interactions/Button';
import { CallToActionLayout } from 'src/common/layout';
import { Card, CardBody } from 'src/common/layout/cards';
import { ClientAbsoluteRoutes } from 'src/routes/clients/ClientRouter';
import { CarbonCreditsTabBar } from 'src/routes/clients/improve/carbon-credits/common';
import { useClient } from 'src/routes/clients/providers/ClientProvider';

import { NftForm } from './NftForm';

export const CarbonCreditsAddContainer = () => {
  const { t } = useTranslation();
  const { client } = useClient();
  const [showNftForm, setShowNftForm] = useState(false)
  let navigate = useNavigate();

  const [createQuery, createResponse] = useLazyQuery<NftNewParams, { data: NftNewParams }>(Api.nft.new, {
    onSuccess: (response) => {
      // @ts-ignore
      navigate(generatePath(response.data?.creditType?.type === '1' ? ClientAbsoluteRoutes.CARBON_CREDITS_CREDITS : ClientAbsoluteRoutes.PLASTIC_CREDITS_CREDITS, { clientUuid: client.uuid }));
    }
  });
  const onSubmit = async (newValue: NftNewParams) => {
    createQuery(newValue);
  };

  const closeNftForm = () => {
    setShowNftForm(false)
  }

  return (
    <CallToActionLayout ctas={showNftForm ? [] : [<CtaCardDevvXMarketplace />]}>
      <Card>
        {!showNftForm && <CarbonCreditsTabBar />}
        <CardBody>
          {showNftForm ?
            <NftForm onSubmit={onSubmit} loading={createResponse.status === 'loading'} closeNftForm={closeNftForm} /> :
            <div className="flex">
              <div className="m-auto">
                <div className="text-4xl font-bold mt-4">{t('improve.upload-carbon-credits')}</div>
                <div className="text-lg my-4">{t('improve.upload-certification-pdf')}</div>
                <Button.Primary type="submit" className="w-24" onClick={() => setShowNftForm(true)}>
                  {t('buttons.start')}
                </Button.Primary>
              </div>
            </div>}
        </CardBody>
      </Card>
    </CallToActionLayout >
  );
};
