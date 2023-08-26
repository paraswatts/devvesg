import React, { useCallback, useState } from 'react';

import { faHandshake } from '@fortawesome/free-regular-svg-icons';
import { faInfoCircle, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation } from 'react-i18next';
import { generatePath } from 'react-router-dom';

import { LogoDecorator, Modal } from 'src/common/components';
import { StatusIcon } from 'src/common/components/icons';
import { Button, LinkButton } from 'src/common/interactions/Button';
import { RequirementRequestStatus } from 'src/gql';
import { ClientAbsoluteRoutes } from 'src/routes/clients/ClientRouter';
import { EditStatusModal } from 'src/routes/clients/components/EditStatusModal';
import {
  GetProjects_client_projects_items_initiative as Initiative,
  GetProjects_client_projects_items_requirements as Requirement,
} from 'src/routes/clients/initiatives/__gql__/GetProjects';
import { useClient } from 'src/routes/clients/providers/ClientProvider';

import tableStyles from 'src/common/styles/Table.module.scss';

interface ProjectRequirementSectionProps {
  initiative: Initiative;
  requirements: Requirement[];
  onClickPartner: (requirement: Requirement, projectUuid: string) => void;
  projectName: string;
  projectUuid: string;
  clientName: string;
  fetchProjects: () => void;
}

export const ProjectRequirementSection = React.memo((props: ProjectRequirementSectionProps) => {
  const { initiative, onClickPartner, projectUuid, requirements, fetchProjects } = props;
  const { t } = useTranslation();

  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [selectedRequirement, setSelectedRequirement] = useState<Requirement>();

  const { client } = useClient();

  const toggleStatusModal = useCallback(() => setStatusModalOpen((prevValue) => !prevValue), []);

  const modalClosed = () => {
    toggleStatusModal();
    fetchProjects();
  };

  const editRequirement = (req: Requirement) => {
    setSelectedRequirement(req);
    toggleStatusModal();
  };

  return (
    <div>
      <p className="font-bold pb-6">{t('project.project-requirements')}</p>
      <div className={tableStyles.scrollXTableContainer}>
        <table className={tableStyles.devvEsgTable}>
          <thead>
            <tr>
              <td className="md:w-1/4">{t('project.requirement')}</td>
              <td className="md:w-1/2">{t('project.partner')}</td>
              <td className="md:w-1/8">{t('project.status')}</td>
              <td className="md:w-1/8">{t('buttons.edit')}</td>
            </tr>
          </thead>
          <tbody>
            {requirements.map((requirement) => {
              return (
                <tr key={`requirement-${requirement.uuid}`}>
                  <td>{requirement.name}</td>
                  <td>
                    {requirement.partner ? (
                      <>
                        <Button.Link onClick={() => onClickPartner(requirement, projectUuid)} type="button">
                          <div className="flex items-center gap-2">
                            <LogoDecorator name={requirement.partner.name} logo={requirement.partner.logo}>
                              {requirement.partner.name}
                            </LogoDecorator>

                            <FontAwesomeIcon icon={faInfoCircle} size="lg" />
                          </div>
                        </Button.Link>
                        {requirement.requestStatus === RequirementRequestStatus.PENDING && <p>{t('project.pending-acceptance')}</p>}
                      </>
                    ) : (
                      <LinkButton.Primary
                        to={generatePath(ClientAbsoluteRoutes.INITIATIVE_PARTNER_SELECT, {
                          clientUuid: client.uuid,
                          initiativeUuid: initiative.uuid,
                          projectUuid: projectUuid,
                        })}
                      >
                        {t('project.find-a-partner')} <FontAwesomeIcon className="ml-1" icon={faHandshake} size="lg" />
                      </LinkButton.Primary>
                    )}
                  </td>
                  <td>
                    <StatusIcon status={requirement.status} />
                  </td>
                  <td>
                    <Button.Primary type="button" onClick={() => editRequirement(requirement)}>
                      {t('buttons.edit')} <FontAwesomeIcon icon={faPencilAlt} />
                    </Button.Primary>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Modal isOpen={statusModalOpen} onCancelModal={toggleStatusModal}>
        <EditStatusModal projectUuid={projectUuid} requirement={selectedRequirement} onCloseModal={modalClosed} />
      </Modal>
    </div>
  );
});
