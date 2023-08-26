import React, { useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { Navigate, generatePath } from 'react-router-dom';

import { Api, ClientFetchParams, ProjectNewParams, useLazyQuery } from 'src/api';
import { ProjectForm } from 'src/common/components/page-forms/ProjectForm';
import { useParams } from 'src/common/hooks';
import { Client, Initiative, Project } from 'src/interfaces';
import { AdminRoutes } from 'src/routes/admin/index';

export const AdminProjectNewContainer = React.memo(() => {
  const { t } = useTranslation();
  const { clientUuid } = useParams<{ clientUuid: string }>();

  const [createQuery, createResponse] = useLazyQuery<ProjectNewParams, { data: Project }>(Api.project.new);
  const [clientQuery, clientResponse] = useLazyQuery<ClientFetchParams, { data: Client }>(Api.admin.client.fetch);
  const [initiativesQuery, initiativesResponse] = useLazyQuery<null, { data: Initiative[] }>(Api.initiative.list);

  useEffect(() => {
    clientQuery({ clientUuid });
    initiativesQuery(null);
  }, [clientUuid, clientQuery, initiativesQuery]);

  const onSubmit = (data: Omit<ProjectNewParams, 'clientUuid' | 'projectTypeUuid'>, uuid?: string) => {
    if (createResponse.status === 'loading') {
      return;
    }

    let payload: ProjectNewParams = {
      ...data,
      projectTypeUuid: uuid as string,
      clientUuid,
    };

    createQuery(payload);
  };

  if (!clientResponse.response?.data || !initiativesResponse.response?.data) {
    return null;
  }

  if (createResponse.status === 'resolved') {
    return <Navigate to={generatePath(AdminRoutes.PROJECTS_LIST, { clientUuid })} />;
  }

  const client = clientResponse.response.data;
  const initiatives = initiativesResponse.response.data;

  return (
    <div>
      <h2 className="font-bold">
        {t('admin.new-project')} - {client.name}
      </h2>
      <ProjectForm initiatives={initiatives} onSubmit={onSubmit} />
    </div>
  );
});
