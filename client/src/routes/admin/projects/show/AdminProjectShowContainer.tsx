import React, { useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { Navigate, generatePath } from 'react-router-dom';

import {
  Api,
  ClientFetchParams,
  ProjectFetchParams,
  ProjectNewParams,
  ProjectUpdateParams,
  useLazyQuery,
} from 'src/api';
import { ProjectForm } from 'src/common/components/page-forms/ProjectForm';
import { useParams } from 'src/common/hooks';
import { LinkButton } from 'src/common/interactions/Button';
import { Client, Project } from 'src/interfaces';
import { AdminRoutes } from 'src/routes/admin/index';

export const AdminProjectShowContainer = React.memo(() => {
  const { t } = useTranslation();
  const { clientUuid, projectUuid } = useParams<{ clientUuid: string; projectUuid: string }>();

  const [updateQuery, updateResponse] = useLazyQuery<ProjectUpdateParams, { data: Project }>(Api.admin.project.update);
  const [clientQuery, clientResponse] = useLazyQuery<ClientFetchParams, { data: Client }>(Api.admin.client.fetch);
  const [projectQuery, projectResponse] = useLazyQuery<ProjectFetchParams, { data: Project }>(Api.admin.project.fetch);

  useEffect(() => {
    clientQuery({ clientUuid });
    projectQuery({ clientUuid, projectUuid });
  }, [clientUuid, clientQuery, projectQuery, projectUuid]);

  const onSubmit = async (data: Omit<ProjectNewParams, 'clientUuid' | 'projectTypeUuid'>) => {
    if (updateResponse.status === 'loading') {
      return;
    }

    const payload: ProjectUpdateParams = {
      ...data,
      clientUuid,
      projectUuid,
    };

    updateQuery(payload);
  };

  if (!clientResponse.response?.data || !projectResponse.response?.data) {
    return null;
  }

  if (updateResponse.status === 'resolved') {
    return <Navigate to={generatePath(AdminRoutes.PROJECTS_LIST, { clientUuid })} />;
  }

  const client = clientResponse.response.data;
  const project = projectResponse.response?.data;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold mb-0">
          {project.name} - {client.name}
        </h2>
        <div className="flex items-center">
          <LinkButton.Primary
            className="ml-2"
            to={generatePath(AdminRoutes.REQUIREMENTS_LIST, { clientUuid, projectUuid })}
          >
            {t('admin.view-requirements')}
          </LinkButton.Primary>
        </div>
      </div>
      <ProjectForm project={project} onSubmit={onSubmit} />
    </div>
  );
});
