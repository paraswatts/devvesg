import React, { useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { Navigate, generatePath } from 'react-router-dom';

import { Api, InitiativeFetchParams, InitiativeNewParams, InitiativeUpdateParams, useLazyQuery } from 'src/api';
import { InitiativeForm } from 'src/common/components/page-forms/InitiativeForm';
import { useParams } from 'src/common/hooks';
import { LinkButton } from 'src/common/interactions/Button';
import { Initiative } from 'src/interfaces';
import { AdminRoutes } from 'src/routes/admin/index';

export const AdminInitiativeShowContainer = React.memo(() => {
  const { initiativeUuid } = useParams<{ initiativeUuid: string }>();
  const { t } = useTranslation();

  const [initiativeQuery, initiativeResponse] = useLazyQuery<InitiativeFetchParams, { data: Initiative }>(
    Api.admin.initiative.fetch,
  );
  const [updateQuery, updateResponse] = useLazyQuery<InitiativeUpdateParams, { data: Initiative }>(
    Api.admin.initiative.update,
  );

  useEffect(() => {
    initiativeQuery({ initiativeUuid });
  }, [initiativeUuid, initiativeQuery]);

  const onSubmit = async (payload: InitiativeNewParams) => {
    if (updateResponse.status === 'loading') {
      return;
    }

    updateQuery({
      ...payload,
      initiativeUuid,
    });
  };

  if (!initiativeResponse.response?.data) {
    return null;
  }

  if (updateResponse.status === 'resolved') {
    return <Navigate to={generatePath(AdminRoutes.INITIATIVES_LIST)} />;
  }

  const initiative = initiativeResponse.response.data;

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="font-bold">{initiative.name}</h2>
        <LinkButton.Primary to={generatePath(AdminRoutes.PROJECT_TYPES_LIST, { initiativeUuid })}>
          {t('admin.view-project-types')}
        </LinkButton.Primary>
      </div>
      <InitiativeForm initiative={initiative} onSubmit={onSubmit} />
    </div>
  );
});
