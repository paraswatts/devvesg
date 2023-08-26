import React from 'react';

import { useTranslation } from 'react-i18next';
import { Navigate } from 'react-router-dom';

import { Api, ServiceNewParams, useLazyQuery } from 'src/api';
import { ServiceForm } from 'src/common/components/page-forms/ServiceForm';
import { Service } from 'src/interfaces';
import { AdminRoutes } from 'src/routes/admin/index';

export const AdminServiceNewContainer = React.memo(() => {
  const { t } = useTranslation();
  const [createQuery, createResponse] = useLazyQuery<ServiceNewParams, { data: Service }>(Api.admin.service.new);

  const onSubmit = async (data: ServiceNewParams) => {
    if (createResponse.status === 'loading') {
      return;
    }

    createQuery(data);
  };

  if (createResponse.status === 'resolved') {
    return <Navigate to={AdminRoutes.SERVICES_LIST} />;
  }

  return (
    <div>
      <h2 className="font-bold">{t('admin.new-service')}</h2>
      <ServiceForm onSubmit={onSubmit} />
    </div>
  );
});
