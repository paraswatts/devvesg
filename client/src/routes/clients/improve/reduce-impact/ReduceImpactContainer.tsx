import { useState } from 'react';

import { useQuery } from '@apollo/client';
import { useTranslation } from 'react-i18next';

import { GlassBlockBanner } from 'src/common/components/glassblock-banner/glassblock-banner';
import { Card, CardBody, } from 'src/common/layout/cards';
import { InitiativeGrid } from 'src/routes/clients/components/InitiativesGrid';
import {
  GetReduceImpact,
  GetReduceImpactVariables,
  GetReduceImpact_initiatives_items,
} from 'src/routes/clients/improve/reduce-impact/__gql__/GetReduceImpact';
import { GET_REDUCE_IMPACT } from 'src/routes/clients/improve/reduce-impact/ReduceImpactContainer.query';
import { useClient } from 'src/routes/clients/providers/ClientProvider';


export const ReduceImpactContainer = () => {
  const { t } = useTranslation();
  const { client } = useClient();
  const [initiatives, setInitiatives] = useState<GetReduceImpact_initiatives_items[]>([]);

  useQuery<GetReduceImpact, GetReduceImpactVariables>(GET_REDUCE_IMPACT, {
    variables: {
      clientId: client.uuid,
    },
    onCompleted: (response) => {
      setInitiatives(response.initiatives.items);
    },
  });

  return (
    <Card>
      <CardBody>
        <div className="text-4xl font-bold mt-4" >{t('improve.heading-a')}</div>
        <GlassBlockBanner/>
        <div className="text-4xl font-bold mt-4">{t('improve.create-initiative')}</div>
        <div className="text-xl text-blue-500 mt-2">{t('improve.select-initiative')}</div>

        <div className="mt-8">
          <InitiativeGrid initiatives={initiatives} />
        </div>
      </CardBody>
    </Card>
  );
};
