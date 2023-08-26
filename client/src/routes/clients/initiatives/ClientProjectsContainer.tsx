import React, { useCallback, useEffect, useState } from 'react';

import { useMutation, useQuery } from '@apollo/client';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation } from 'react-i18next';
import { generatePath } from 'react-router-dom';

import { Modal } from 'src/common/components/modals/Modal';
import { useParams } from 'src/common/hooks';
import { LinkButton } from 'src/common/interactions/Button';
import { Show } from 'src/common/layout';
import { Card, CardBody } from 'src/common/layout/cards';
import { ClientAbsoluteRoutes } from 'src/routes/clients/ClientRouter';
import { ProjectHeaderSection } from 'src/routes/clients/components/ProjectHeaderSection';
import { ProjectRequirementSection } from 'src/routes/clients/components/ProjectRequirementSection';
import {
  DisconnectPartner,
  DisconnectPartnerVariables,
} from 'src/routes/clients/initiatives/__gql__/DisconnectPartner';
import {
  GetProjects_client as Client,
  GetProjects,
  GetProjectsVariables,
  GetProjects_client_projects_items_requirements as Requirement,
} from 'src/routes/clients/initiatives/__gql__/GetProjects';
import { DISCONNECT_PARTNER, GET_PROJECTS } from 'src/routes/clients/initiatives/ClientProjectsContainer.query';
import { DisconnectPartnerModal } from 'src/routes/clients/initiatives/DisconnectPartnerModal';
import { PartnerDetailModal } from 'src/routes/clients/initiatives/PartnerDetailModal';

export const ClientProjectsContainer = React.memo(() => {
  const { clientUuid } = useParams<{ clientUuid: string }>();
  const { t } = useTranslation();
  const [client, setClient] = useState<Client>();
  const [partnerModalIsOpen, setPartnerModalIsOpen] = useState(false);
  const [disconnectPartnerModalIsOpen, setDisconnectPartnerModalIsOpen] = useState(false);
  const [selectedRequirementProjectUuid, setSelectedRequirementProjectUuid] = useState<string>();
  const [selectedRequirement, setSelectedRequirement] = useState<Requirement>();
  const [connectionToDelete, setConnectionToDelete] = useState<{
    requirement: Requirement;
    projectUuid: string;
  } | null>(null);

  const { refetch } = useQuery<GetProjects, GetProjectsVariables>(GET_PROJECTS, {
    variables: { clientId: clientUuid },
    onCompleted: (response) => {
      setClient(response.client);
    },
  });
  const [partnerDisconnect, { loading: partnerDisconnectLoading }] = useMutation<
    DisconnectPartner,
    DisconnectPartnerVariables
  >(DISCONNECT_PARTNER, {
    onCompleted: () => {
      refetch();
      handleCancelDisconnectPartnerModal();
    },
  });

  useEffect(() => {
    if (selectedRequirement) {
      onOpenPartnerModal();
    }
  }, [selectedRequirement]);

  const onOpenPartnerModal = () => {
    setPartnerModalIsOpen(true);
  };

  const onOpenDisconnectPartnerModal = (requirement: Requirement, projectUuid: string) => {
    handleCancelPartnerModal();
    setConnectionToDelete({ requirement, projectUuid });
    setTimeout(() => {
      // Handles a scrollbar bug in headlessui when opening multiple dialogs quickly. See https://github.com/tailwindlabs/headlessui/issues/1000#issuecomment-1001841999
      setDisconnectPartnerModalIsOpen(true);
    }, 500);
  };

  const handleCancelPartnerModal = () => {
    setPartnerModalIsOpen(false);
    setSelectedRequirement(undefined);
    setSelectedRequirementProjectUuid(undefined);
  };

  const handleCancelDisconnectPartnerModal = () => {
    setDisconnectPartnerModalIsOpen(false);
    setConnectionToDelete(null);
  };

  const handleDisconnectPartner = useCallback(
    (reason: string) => {
      if (connectionToDelete) {
        partnerDisconnect({
          variables: {
            id: connectionToDelete.requirement.uuid,
            projectId: connectionToDelete.projectUuid,
            clientId: clientUuid,
            reason,
          },
        });
      }
    },
    [clientUuid, connectionToDelete, partnerDisconnect],
  );

  const handleClickRequirement = (requirement: Requirement, projectUuid: string) => {
    setSelectedRequirementProjectUuid(projectUuid);
    setSelectedRequirement(requirement);
  };

  const fetchClient = useCallback(() => {
    refetch();
  }, [refetch]);

  if (!client) {
    return null;
  }

  return (
    <div className="w-full flex flex-col gap-8">
      {client.projects.items.map((p) => (
        <Card key={`project-${p.uuid}`}>
          <CardBody>
            <ProjectHeaderSection initiative={p.initiative} project={p} fetchProjects={fetchClient} />

            <div className="mt-4 mb-8">{p.description}</div>

            <Show show={p.requirements.length > 0}>
              <ProjectRequirementSection
                onClickPartner={handleClickRequirement}
                initiative={p.initiative}
                requirements={p.requirements}
                projectUuid={p.uuid}
                projectName={p.name}
                clientName={client.name}
                fetchProjects={fetchClient}
              />
            </Show>
          </CardBody>
        </Card>
      ))}
      {!client.projects.items.length && (
        <Card>
          <CardBody>
            <div className="w-full border border-dashed border-neutral text-neutral-600 text-center p-12">
              <div className="mt-8 mb-12">{t('project.launch-initiative')}</div>
              <div>
                <LinkButton.Primary
                  to={generatePath(ClientAbsoluteRoutes.INITIATIVE_SELECT, { clientUuid })}
                  className="px-8"
                >
                  {t('buttons.add-initiative')} <FontAwesomeIcon icon={faPlusCircle} />
                </LinkButton.Primary>
              </div>
            </div>
          </CardBody>
        </Card>
      )}
      <Modal onCancelModal={handleCancelPartnerModal} isOpen={partnerModalIsOpen} slim>
        <PartnerDetailModal
          onDisconnectPartner={onOpenDisconnectPartnerModal}
          partner={selectedRequirement?.partner}
          requirement={selectedRequirement}
          projectUuid={selectedRequirementProjectUuid}
        />
      </Modal>
      <Modal isOpen={disconnectPartnerModalIsOpen} onCancelModal={handleCancelDisconnectPartnerModal} slim>
        <DisconnectPartnerModal
          onCancel={handleCancelDisconnectPartnerModal}
          onConfirm={handleDisconnectPartner}
          loading={partnerDisconnectLoading}
        />
      </Modal>
    </div>
  );
});
