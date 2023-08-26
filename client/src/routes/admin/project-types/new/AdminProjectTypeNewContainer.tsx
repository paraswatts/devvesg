import React, { useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { Navigate, generatePath } from 'react-router-dom';

import { Api, InitiativeFetchParams, ProjectTypeNewParams, useLazyQuery } from 'src/api';
import { ProjectTypeForm } from 'src/common/components/page-forms/ProjectTypeForm';
import { useParams } from 'src/common/hooks';
import { Initiative, ProjectType } from 'src/interfaces';
import { AdminRoutes } from 'src/routes/admin/index';

export const AdminProjectTypeNewContainer = React.memo(() => {
  const { initiativeUuid } = useParams<{ initiativeUuid: string }>();
  const { t } = useTranslation();
  const [createQuery, createResponse] = useLazyQuery<ProjectTypeNewParams, { data: ProjectType }>(
    Api.admin.projectType.new,
  );
  const [initiativeQuery, initiativeResponse] = useLazyQuery<InitiativeFetchParams, { data: Initiative }>(
    Api.admin.initiative.fetch,
  );

  useEffect(() => {
    initiativeQuery({ initiativeUuid });
  }, [initiativeUuid, initiativeQuery]);

  const onSubmit = (result: Omit<ProjectTypeNewParams, 'initiativeUuid'>) => {
    if (createResponse.status === 'loading') {
      return;
    }
    createQuery({
      ...result,
      initiativeUuid,
    });
  };

  if (!initiativeResponse.response?.data) {
    return null;
  }

  if (createResponse.status === 'resolved') {
    return <Navigate to={generatePath(AdminRoutes.PROJECT_TYPES_LIST, { initiativeUuid })} />;
  }

  const initiative = initiativeResponse.response.data;

  return (
    <div>
      <h2 className="font-bold">
        {t('admin.new-project-type')} - {initiative.name}
      </h2>
      <ProjectTypeForm onSubmit={onSubmit} />
    </div>
  );
});
