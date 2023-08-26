import React, { useState } from 'react';

import { useQuery } from '@apollo/client';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { generatePath, useNavigate } from 'react-router-dom';

import { Api, ProjectNewParams, useLazyQuery } from 'src/api';
import { useParams } from 'src/common/hooks';
import { Button } from 'src/common/interactions/Button';
import { Card, CardBody, CardSubtitle, CardTitle, CardTitles } from 'src/common/layout/cards';
import { Project, ProjectRequirementStatuses } from 'src/interfaces';
import { ClientRoutes } from 'src/routes/clients';
import {
  GetProjectTypesForInitiative,
  GetProjectTypesForInitiativeVariables,
  GetProjectTypesForInitiative_initiative_projectTypes as ProjectType,
} from 'src/routes/clients/initiative/__gql__/GetProjectTypesForInitiative';
import { GET_PROJECT_TYPES_FOR_INITIATIVE } from 'src/routes/clients/initiative/InitiativeProjectSelect.query';

export const InitiativeProjectSelectContainer = React.memo(() => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { clientUuid, initiativeUuid } = useParams<{ clientUuid: string; initiativeUuid: string }>();
  const [createQuery, createResponse] = useLazyQuery<ProjectNewParams, { data: Project }>(Api.project.new, {
    onSuccess: (response) => {
      const project = response.data;
      navigate(
        generatePath(ClientRoutes.INITIATIVE_PARTNER_SELECT, {
          clientUuid,
          initiativeUuid,
          projectUuid: project.uuid,
        }),
      );
    },
  });

  const [projectTypes, setProjectTypes] = useState<ProjectType[]>([]);
  const [selectedProject, setSelectedProject] = useState<ProjectType>();

  const { loading } = useQuery<GetProjectTypesForInitiative, GetProjectTypesForInitiativeVariables>(
    GET_PROJECT_TYPES_FOR_INITIATIVE,
    {
      variables: {
        initiativeId: initiativeUuid,
      },
      onCompleted: (response) => {
        setProjectTypes(response.initiative.projectTypes);
      },
    },
  );

  const createProject = () => {
    if (createResponse.status !== 'loading' && selectedProject) {
      createQuery({
        clientUuid,
        projectTypeUuid: selectedProject.uuid,
        name: selectedProject.name,
        description: selectedProject.objective,
        status: ProjectRequirementStatuses.NOT_STARTED,
      });
    }
  };

  const selectProject = (projectType: ProjectType) => {
    setSelectedProject(projectType);
  };

  if (loading) {
    return null;
  }

  return (
    <Card>
      <CardBody>
        <CardTitles>
          <CardTitle>{t('project.project-recommendations')}</CardTitle>
          <CardSubtitle>{t('project.project-recommendations-desc')}</CardSubtitle>
        </CardTitles>

        <div className="my-8 flex flex-col gap-4">
          {projectTypes.map((projectType) => {
            return (
              <button
                type="button"
                className={clsx(
                  'w-full px-8 py-10 bg-white border shadow-lg',
                  selectedProject?.uuid === projectType.uuid && 'ring-2 ring-blue-500',
                )}
                key={projectType.uuid}
                onClick={() => selectProject(projectType)}
              >
                <div className="md:grid md:grid-cols-6">
                  <div className="md:col-span-2">
                    <h2 className="font-bold mb-0">{projectType.name}</h2>
                  </div>
                  <div className="md:col-span-4 flex items-center">
                    <p className="mb-0">{projectType.objective}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="text-right">
          <Button.Primary disabled={!selectedProject} type="button" onClick={createProject}>
          {t('buttons.next')} <FontAwesomeIcon icon={faArrowRight} />
          </Button.Primary>
        </div>
      </CardBody>
    </Card>
  );
});
