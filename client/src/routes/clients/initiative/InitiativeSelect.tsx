import React, { useState } from 'react';

import { useQuery } from '@apollo/client';
import { useTranslation } from 'react-i18next';

import { Card, CardBody, CardSubtitle, CardTitle, CardTitles } from 'src/common/layout/cards';
import { InitiativeGrid } from 'src/routes/clients/components/InitiativesGrid';
import {
  GetInitiatives,
  GetInitiatives_initiatives_items as Initiative,
} from 'src/routes/clients/initiative/__gql__/GetInitiatives';
import { GET_INITIATIVES } from 'src/routes/clients/initiative/InitiativeSelect.query';

export const InitiativeSelectContainer = React.memo(() => {
  const { t } = useTranslation();
  const [initiatives, setInitiatives] = useState<Initiative[]>([]);

  useQuery<GetInitiatives>(GET_INITIATIVES, {
    onCompleted: (response) => setInitiatives(response.initiatives.items),
  });

  return (
    <Card>
      <CardBody>
        <CardTitles>
          <CardTitle>{t('improve.select-initiative-title')}</CardTitle>
          <CardSubtitle>{t('improve.select-initiative-sub-title')}</CardSubtitle>
        </CardTitles>

        <div className="mt-8">
          <InitiativeGrid initiatives={initiatives} />
        </div>
      </CardBody>
    </Card>
  );
});
