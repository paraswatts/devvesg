import React from 'react';

import { useTranslation } from 'react-i18next';
import { Navigate } from 'react-router-dom';

import { Api, InitiativeNewParams, useLazyQuery } from 'src/api';
import { InitiativeForm } from 'src/common/components/page-forms/InitiativeForm';
import { Initiative } from 'src/interfaces';
import { AdminRoutes } from 'src/routes/admin/index';

export const AdminInitiativeNewContainer = React.memo(() => {
  const { t } = useTranslation();
  const [createQuery, createResponse] = useLazyQuery<InitiativeNewParams, { data: Initiative }>(
    Api.admin.initiative.new,
  );

  const onSubmit = async (payload: InitiativeNewParams) => {
    if (createResponse.status === 'loading') {
      return;
    }

    createQuery(payload);
  };

  if (createResponse.status === 'resolved') {
    return <Navigate to={AdminRoutes.INITIATIVES_LIST} />;
  }

  return (
    <div>
      <h2 className="font-bold">{t('new-initiative')}</h2>
      <InitiativeForm onSubmit={onSubmit} />
    </div>
  );
});
