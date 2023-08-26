import React, { useEffect } from 'react';

import { Navigate, generatePath } from 'react-router-dom';

import { Api, VerticalFetchParams, VerticalNewParams, VerticalUpdateParams, useLazyQuery } from 'src/api';
import { VerticalForm } from 'src/common/components/page-forms/VerticalForm';
import { useParams } from 'src/common/hooks';
import { Vertical } from 'src/interfaces';
import { AdminRoutes } from 'src/routes/admin/index';

export const AdminVerticalShowContainer = React.memo(() => {
  const { verticalUuid } = useParams<{ verticalUuid: string }>();

  const [verticalQuery, verticalResponse] = useLazyQuery<VerticalFetchParams, { data: Vertical }>(
    Api.admin.vertical.fetch,
  );
  const [updateQuery, updateResponse] = useLazyQuery<VerticalUpdateParams, { data: Vertical }>(
    Api.admin.vertical.update,
  );

  useEffect(() => {
    verticalQuery({ verticalUuid });
  }, [verticalUuid, verticalQuery]);

  const onSubmit = async (data: VerticalNewParams) => {
    if (updateResponse.status === 'loading') {
      return;
    }

    const payload: VerticalUpdateParams = {
      ...data,
      verticalUuid,
    };
    updateQuery(payload);
  };

  if (!verticalResponse.response?.data) {
    return null;
  }

  if (updateResponse.status === 'resolved') {
    return <Navigate to={generatePath(AdminRoutes.VERTICALS_LIST)} />;
  }

  const vertical = verticalResponse.response.data;

  return (
    <div>
      <h2 className="font-bold">{vertical.name}</h2>
      <VerticalForm vertical={vertical} onSubmit={onSubmit} />
    </div>
  );
});
