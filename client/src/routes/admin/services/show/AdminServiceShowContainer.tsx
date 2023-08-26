import React, { useEffect } from 'react';

import { Navigate, generatePath } from 'react-router-dom';

import { Api, ServiceFetchParams, ServiceNewParams, ServiceUpdateParams, useLazyQuery } from 'src/api';
import { ServiceForm } from 'src/common/components/page-forms/ServiceForm';
import { useParams } from 'src/common/hooks';
import { Service } from 'src/interfaces';
import { AdminRoutes } from 'src/routes/admin/index';

export const AdminServiceShowContainer = React.memo(() => {
  const { serviceUuid } = useParams<{ serviceUuid: string }>();

  const [serviceQuery, serviceResponse] = useLazyQuery<ServiceFetchParams, { data: Service }>(Api.admin.service.fetch);
  const [updateQuery, updateResponse] = useLazyQuery<ServiceUpdateParams, { data: Service }>(Api.admin.service.update);

  useEffect(() => {
    serviceQuery({ serviceUuid });
  }, [serviceUuid, serviceQuery]);

  const onSubmit = async (data: ServiceNewParams) => {
    if (updateResponse.status === 'loading') {
      return;
    }

    const payload: ServiceUpdateParams = {
      ...data,
      serviceUuid,
    };
    updateQuery(payload);
  };

  if (!serviceResponse.response?.data) {
    return null;
  }

  if (updateResponse.status === 'resolved') {
    return <Navigate to={generatePath(AdminRoutes.SERVICES_LIST)} />;
  }

  const service = serviceResponse.response.data;

  return (
    <div>
      <h2 className="font-bold">{service.name}</h2>
      <ServiceForm service={service} onSubmit={onSubmit} />
    </div>
  );
});
