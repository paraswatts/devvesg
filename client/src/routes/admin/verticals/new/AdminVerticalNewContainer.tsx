import React from 'react';

import { useTranslation } from 'react-i18next';
import { Navigate } from 'react-router-dom';

import { Api, VerticalNewParams, useLazyQuery } from 'src/api';
import { VerticalForm } from 'src/common/components/page-forms/VerticalForm';
import { Vertical } from 'src/interfaces';
import { AdminRoutes } from 'src/routes/admin/index';

export const AdminVerticalNewContainer = React.memo(() => {
  const { t } = useTranslation();
  const [createQuery, createResponse] = useLazyQuery<VerticalNewParams, { data: Vertical }>(Api.admin.vertical.new);

  const onSubmit = async (data: VerticalNewParams) => {
    if (createResponse.status === 'loading') {
      return;
    }

    createQuery(data);
  };

  if (createResponse.status === 'resolved') {
    return <Navigate to={AdminRoutes.VERTICALS_LIST} />;
  }

  return (
    <div>
      <h2 className="font-bold">{t('admin.new-vertical')}</h2>
      <VerticalForm onSubmit={onSubmit} />
    </div>
  );
});
