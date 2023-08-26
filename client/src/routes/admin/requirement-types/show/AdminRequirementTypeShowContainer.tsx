import React, { useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { Navigate, generatePath } from 'react-router-dom';

import {
  Api,
  InitiativeFetchParams,
  ProjectTypeFetchParams,
  RequirementTypeFetchParams,
  RequirementTypeNewParams,
  RequirementTypeUpdateParams,
  useLazyQuery,
} from 'src/api';
import { RequirementTypeForm } from 'src/common/components/page-forms/RequirementTypeForm';
import { useParams } from 'src/common/hooks';
import { Initiative, ProjectType, RequirementType } from 'src/interfaces';
import { AdminRoutes } from 'src/routes/admin/index';

export const AdminRequirementTypeShowContainer = React.memo(() => {
  const { initiativeUuid, projectTypeUuid, requirementTypeUuid } =
    useParams<{ initiativeUuid: string; projectTypeUuid: string; requirementTypeUuid: string }>();
  const { t } = useTranslation();
  const [updateQuery, updateResponse] = useLazyQuery<RequirementTypeUpdateParams, { data: RequirementType }>(
    Api.admin.requirementType.update,
  );
  const [initiativeQuery, initiativeResponse] = useLazyQuery<InitiativeFetchParams, { data: Initiative }>(
    Api.admin.initiative.fetch,
  );

  const [projectTypesQuery, projectTypesResponse] = useLazyQuery<ProjectTypeFetchParams, { data: ProjectType }>(
    Api.admin.projectType.fetch,
  );

  const [requirementTypeQuery, requirementTypeResponse] = useLazyQuery<
    RequirementTypeFetchParams,
    { data: RequirementType }
  >(Api.admin.requirementType.fetch);

  useEffect(() => {
    initiativeQuery({ initiativeUuid });
    projectTypesQuery({ initiativeUuid, projectTypeUuid });
    requirementTypeQuery({ initiativeUuid, projectTypeUuid, requirementTypeUuid });
  }, [initiativeUuid, projectTypeUuid, requirementTypeUuid, initiativeQuery, projectTypesQuery, requirementTypeQuery]);

  const onSubmit = (result: RequirementTypeNewParams) => {
    if (updateResponse.status === 'loading') {
      return;
    }
    updateQuery({
      ...result,
      requirementTypeUuid,
    });
  };

  if (
    !initiativeResponse.response?.data ||
    !projectTypesResponse.response?.data ||
    !requirementTypeResponse.response?.data
  ) {
    return null;
  }

  if (updateResponse.status === 'resolved') {
    return <Navigate to={generatePath(AdminRoutes.REQUIREMENT_TYPES_LIST, { initiativeUuid, projectTypeUuid })} />;
  }

  const initiative = initiativeResponse.response.data;
  const projectType = projectTypesResponse.response.data;
  const requirementType = requirementTypeResponse.response.data;

  return (
    <div>
      <h2 className="font-bold">
        {t('project.requirement-type')} - {initiative.name} - {projectType.name}
      </h2>
      <RequirementTypeForm currentValues={requirementType} onSubmit={onSubmit} />
    </div>
  );
});
