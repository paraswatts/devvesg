import React, { useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { Navigate, generatePath } from 'react-router-dom';

import { Api, InitiativeFetchParams, ProjectTypeFetchParams, RequirementTypeNewParams, useLazyQuery } from 'src/api';
import { RequirementTypeForm } from 'src/common/components/page-forms/RequirementTypeForm';
import { useParams } from 'src/common/hooks';
import { Initiative, ProjectType, RequirementType } from 'src/interfaces';
import { AdminRoutes } from 'src/routes/admin/index';

export const AdminRequirementTypeNewContainer = React.memo(() => {
  const { initiativeUuid, projectTypeUuid } = useParams<{ initiativeUuid: string; projectTypeUuid: string }>();
  const { t } = useTranslation();
  const [createQuery, createResponse] = useLazyQuery<RequirementTypeNewParams, { data: RequirementType }>(
    Api.admin.requirementType.new,
  );
  const [initiativeQuery, initiativeResponse] = useLazyQuery<InitiativeFetchParams, { data: Initiative }>(
    Api.admin.initiative.fetch,
  );

  const [projectTypesQuery, projectTypesResponse] = useLazyQuery<ProjectTypeFetchParams, { data: ProjectType }>(
    Api.admin.projectType.fetch,
  );

  useEffect(() => {
    initiativeQuery({ initiativeUuid });
    projectTypesQuery({ initiativeUuid, projectTypeUuid });
  }, [initiativeUuid, projectTypeUuid, initiativeQuery, projectTypesQuery]);

  const onSubmit = (result: RequirementTypeNewParams) => {
    if (createResponse.status === 'loading') {
      return;
    }
    createQuery({
      ...result,
    });
  };

  if (!initiativeResponse.response?.data || !projectTypesResponse.response?.data) {
    return null;
  }

  if (createResponse.status === 'resolved') {
    return <Navigate to={generatePath(AdminRoutes.REQUIREMENT_TYPES_LIST, { initiativeUuid, projectTypeUuid })} />;
  }

  const initiative = initiativeResponse.response.data;
  const projectType = projectTypesResponse.response.data;

  return (
    <div>
      <h2 className="font-bold">
        {t('admin.new-requirement-type')} - {initiative.name} - {projectType.name}
      </h2>
      <RequirementTypeForm onSubmit={onSubmit} />
    </div>
  );
});
