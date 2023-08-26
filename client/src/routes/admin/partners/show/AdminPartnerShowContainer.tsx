import React, { useEffect } from 'react';

import { Navigate, generatePath } from 'react-router-dom';

import { Api, PartnerFetchParams, PartnerNewParams, PartnerUpdateParams, useLazyQuery } from 'src/api';
import { PartnersForm } from 'src/common/components/page-forms/PartnersForm';
import { useParams } from 'src/common/hooks';
import { Partner } from 'src/interfaces';
import { AdminRoutes } from 'src/routes/admin/index';

export const AdminPartnerShowContainer = React.memo(() => {
  const { partnerUuid } = useParams<{ partnerUuid: string }>();

  const [partnerQuery, partnerResponse] = useLazyQuery<PartnerFetchParams, { data: Partner }>(Api.admin.partner.fetch);
  const [updateQuery, updateResponse] = useLazyQuery<PartnerUpdateParams, { data: Partner }>(Api.admin.partner.update);

  useEffect(() => {
    partnerQuery({ partnerUuid });
  }, [partnerUuid, partnerQuery]);

  const onSubmit = async (payload: PartnerNewParams) => {
    updateQuery({ partnerUuid, ...payload });
  };

  if (!partnerResponse.response?.data) {
    return null;
  }

  if (updateResponse.status === 'resolved') {
    return <Navigate to={generatePath(AdminRoutes.PARTNERS_LIST)} />;
  }

  const partner = partnerResponse.response.data;

  return (
    <div>
      <h2 className="font-bold">{partner.name}</h2>
      <PartnersForm currentValues={partner} onSubmit={onSubmit} />
    </div>
  );
});
