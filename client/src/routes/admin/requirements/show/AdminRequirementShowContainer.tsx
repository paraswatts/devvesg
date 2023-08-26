import React, { useEffect } from 'react';

import { Navigate, generatePath } from 'react-router-dom';

import {
  Api,
  ProjectFetchParams,
  RequirementFetchParams,
  RequirementNewParams,
  RequirementUpdateParams,
  useLazyQuery,
} from 'src/api';
import { RequirementForm } from 'src/common/components/page-forms/RequirementForm';
import { useParams } from 'src/common/hooks';
import { Partner, Project, Requirement } from 'src/interfaces';
import { AdminRoutes } from 'src/routes/admin/index';

export const AdminRequirementShowContainer = React.memo(() => {
  const { clientUuid, projectUuid, requirementUuid } =
    useParams<{ clientUuid: string; projectUuid: string; requirementUuid: string }>();

  const [updateQuery, updateResponse] = useLazyQuery<RequirementUpdateParams, { data: Requirement }>(
    Api.admin.requirement.update,
  );
  const [projectQuery, projectResponse] = useLazyQuery<ProjectFetchParams, { data: Project }>(Api.admin.project.fetch);
  const [requirementQuery, requirementResponse] = useLazyQuery<RequirementFetchParams, { data: Requirement }>(
    Api.admin.requirement.fetch,
  );
  const [partnersQuery, partnersResponse] = useLazyQuery<null, { data: Partner[] }>(Api.partner.list);

  useEffect(() => {
    projectQuery({ clientUuid, projectUuid });
    requirementQuery({ clientUuid, projectUuid, requirementUuid });
    partnersQuery(null);
  }, [clientUuid, partnersQuery, projectUuid, projectQuery, requirementQuery, requirementUuid]);

  const onSubmit = async (data: Omit<RequirementNewParams, 'projectUuid' | 'clientUuid'>) => {
    if (updateResponse.status === 'loading') {
      return;
    }

    const payload: RequirementUpdateParams = {
      ...data,
      projectUuid,
      requirementUuid,
      clientUuid,
    };

    updateQuery(payload);
  };

  if (!projectResponse.response?.data || !requirementResponse.response?.data || !partnersResponse.response?.data) {
    return null;
  }

  if (updateResponse.status === 'resolved') {
    return <Navigate to={generatePath(AdminRoutes.REQUIREMENTS_LIST, { clientUuid, projectUuid })} />;
  }

  const project = projectResponse.response.data;
  const requirement = requirementResponse.response.data;

  return (
    <div>
      <h2 className="font-bold">
        {requirement.name} - {project.name}
      </h2>
      <RequirementForm requirement={requirement} onSubmit={onSubmit} />
    </div>
  );
});
