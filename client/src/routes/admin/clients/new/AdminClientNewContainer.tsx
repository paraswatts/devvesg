import React from 'react';

import { useTranslation } from 'react-i18next';
import { Navigate } from 'react-router-dom';

import { Api, ClientNewParams, useLazyQuery } from 'src/api';
import { ClientForm } from 'src/common/components/page-forms/ClientForm';
import { Client } from 'src/interfaces';
import { AdminRoutes } from 'src/routes/admin/index';

export const AdminClientNewContainer = React.memo(() => {
  const { t } = useTranslation();
  const [createQuery, createResponse] = useLazyQuery<ClientNewParams, { data: Client }>(Api.admin.client.new);

  const onSubmit = async (payload: ClientNewParams) => {
    if (createResponse.status === 'loading') {
      return;
    }

    createQuery(payload);
  };

  if (createResponse.status === 'resolved') {
    return <Navigate to={AdminRoutes.CLIENTS_LIST} />;
  }

  return (
    <div>
      <h2 className="font-bold">{t('admin.new-client')}</h2>
      <ClientForm onSubmit={onSubmit} />
    </div>
  );
});
