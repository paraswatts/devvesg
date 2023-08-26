import React, { useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { Navigate, generatePath } from 'react-router-dom';

import { Api, ProjectFetchParams, RequirementNewParams, useLazyQuery } from 'src/api';
import { RequirementForm } from 'src/common/components/page-forms/RequirementForm';
import { useParams } from 'src/common/hooks';
import { Project, Requirement } from 'src/interfaces';
import { AdminRoutes } from 'src/routes/admin/index';

export const AdminRequirementNewContainer = React.memo(() => {
  const { clientUuid, projectUuid } = useParams<{ clientUuid: string; projectUuid: string }>();
  const { t } = useTranslation();
  const [createQuery, createResponse] = useLazyQuery<RequirementNewParams, { data: Requirement }>(
    Api.admin.requirement.new,
  );
  const [projectQuery, projectResponse] = useLazyQuery<ProjectFetchParams, { data: Project }>(Api.admin.project.fetch);

  useEffect(() => {
    projectQuery({ clientUuid, projectUuid });
  }, [clientUuid, projectUuid, projectQuery]);

  const onSubmit = async (data: Omit<RequirementNewParams, 'projectUuid' | 'clientUuid'>) => {
    if (createResponse.status === 'loading') {
      return;
    }

    const payload: RequirementNewParams = {
      ...data,
      projectUuid,
      clientUuid,
    };

    createQuery(payload);
  };

  if (!projectResponse.response?.data) {
    return null;
  }

  if (createResponse.status === 'resolved') {
    return <Navigate to={generatePath(AdminRoutes.REQUIREMENTS_LIST, { clientUuid, projectUuid })} />;
  }

  const project = projectResponse.response.data;

  return (
    <div>
      <h2 className="font-bold">
        {t('admin.new-requirement')} - {project.name}
      </h2>
      <RequirementForm onSubmit={onSubmit} />
    </div>
  );
});
