import React, { useEffect } from 'react';

import { Navigate, generatePath } from 'react-router-dom';

import {
  Api,
  InitiativeFetchParams,
  ProjectTypeFetchParams,
  ProjectTypeNewParams,
  ProjectTypeUpdateParams,
  useLazyQuery,
} from 'src/api';
import { ProjectTypeForm } from 'src/common/components/page-forms/ProjectTypeForm';
import { useParams } from 'src/common/hooks';
import { Initiative, ProjectType } from 'src/interfaces';
import { AdminRoutes } from 'src/routes/admin/index';

export const AdminProjectTypeShowContainer = React.memo(() => {
  const { initiativeUuid, projectTypeUuid } = useParams<{ initiativeUuid: string; projectTypeUuid: string }>();

  const [initiativeQuery, initiativeResponse] = useLazyQuery<InitiativeFetchParams, { data: Initiative }>(
    Api.admin.initiative.fetch,
  );
  const [projectTypeQuery, projectTypeResponse] = useLazyQuery<ProjectTypeFetchParams, { data: ProjectType }>(
    Api.admin.projectType.fetch,
  );
  const [updateQuery, updateResponse] = useLazyQuery<ProjectTypeUpdateParams, { data: ProjectType }>(
    Api.admin.projectType.update,
  );

  useEffect(() => {
    initiativeQuery({ initiativeUuid });
    projectTypeQuery({ initiativeUuid, projectTypeUuid });
  }, [initiativeUuid, initiativeQuery, projectTypeUuid, projectTypeQuery]);

  const onSubmit = (result: Omit<ProjectTypeNewParams, 'initiativeUuid'>) => {
    if (updateResponse.status === 'loading') {
      return;
    }
    updateQuery({
      ...result,
      initiativeUuid,
      projectTypeUuid,
    });
  };

  if (!initiativeResponse.response?.data || !projectTypeResponse.response?.data) {
    return null;
  }

  if (updateResponse.status === 'resolved') {
    return <Navigate to={generatePath(AdminRoutes.PROJECT_TYPES_LIST, { initiativeUuid })} />;
  }

  const initiative = initiativeResponse.response.data;
  const projectType = projectTypeResponse.response.data;

  return (
    <div>
      <h2 className="font-bold">
        {initiative.name} - {projectType.name}
      </h2>
      <ProjectTypeForm currentValues={projectType} onSubmit={onSubmit} />
    </div>
  );
});
