import React from 'react';

import { useTranslation } from 'react-i18next';
import { Navigate } from 'react-router-dom';

import { Api, PartnerNewParams, useLazyQuery } from 'src/api';
import { PartnersForm } from 'src/common/components/page-forms/PartnersForm';
import { Partner } from 'src/interfaces';
import { AdminRoutes } from 'src/routes/admin/index';

export const AdminPartnerNewContainer = React.memo(() => {
  const { t } = useTranslation();
  const [createQuery, createResponse] = useLazyQuery<PartnerNewParams, { data: Partner }>(Api.partner.new);

  const onSubmit = async (newValue: PartnerNewParams) => {
    createQuery(newValue);
  };

  if (createResponse.status === 'resolved') {
    return <Navigate to={AdminRoutes.PARTNERS_LIST} />;
  }

  return (
    <div>
      <h2 className="font-bold">{t('admin.new-partner')}</h2>
      <PartnersForm onSubmit={onSubmit} />
    </div>
  );
});
