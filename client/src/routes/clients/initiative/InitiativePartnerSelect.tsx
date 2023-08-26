import React, { useState } from 'react';

import { useQuery } from '@apollo/client';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faHandshake, faLaptop, faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation } from 'react-i18next';
import { generatePath } from 'react-router-dom';

import { Api, RequirementFetchParams, useLazyQuery } from 'src/api';
import { Modal, ServiceBadge, ServiceBadges } from 'src/common/components';
import { ExternalLinkDisplay } from 'src/common/components/external-link-display';
import { useParams } from 'src/common/hooks';
import { Button, LinkButton } from 'src/common/interactions/Button';
import { Show } from 'src/common/layout';
import { Card, CardBody, CardSubtitle, CardTitle, CardTitles } from 'src/common/layout/cards';
import { RequirementRequestStatus } from 'src/gql';
import { Requirement } from 'src/interfaces';
import { ClientRoutes } from 'src/routes/clients';
import {
  GetPartnersForClientProject,
  GetPartnersForClientProjectVariables,
  GetPartnersForClientProject_client_project_requirements_requirementType_partners as Partner,
  GetPartnersForClientProject_client_project as Project,
} from 'src/routes/clients/initiative/__gql__/GetPartnersForClientProject';
import { GET_PARTNERS_FOR_CLIENT_PROJECT } from 'src/routes/clients/initiative/InitiativePartnerSelect.query';

export const InitiativePartnerSelectContainer = React.memo(() => {
  const { t } = useTranslation();
  const [assignPartnerQuery, assignPartnerResponse] = useLazyQuery<
    RequirementFetchParams & { partnerUuid: string },
    { data: Requirement }
  >(Api.requirement.assignPartner, {
    onSuccess: () => {
      setSelectedPartner(undefined);
      setActiveRequirement(undefined);
      refetch();
    },
  });
  const { clientUuid, projectUuid } = useParams<{ clientUuid: string; projectUuid: string }>();
  const [connectionModalIsOpen, setConnectionModalIsOpen] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState<Partner>();
  const [activeRequirement, setActiveRequirement] = useState<string>();
  const [project, setProject] = useState<Project>();

  const { loading, refetch } = useQuery<GetPartnersForClientProject, GetPartnersForClientProjectVariables>(
    GET_PARTNERS_FOR_CLIENT_PROJECT,
    {
      variables: {
        clientId: clientUuid,
        projectId: projectUuid,
      },
      onCompleted: (response) => {
        setProject(response.client.project);
      },
    },
  );

  const toggleConnectionModal = () => {
    setConnectionModalIsOpen(!connectionModalIsOpen);
  };

  const selectPartner = (partner: Partner, requirementUuid: string) => {
    setSelectedPartner(partner);
    setActiveRequirement(requirementUuid);
    toggleConnectionModal();
  };

  const confirmConnect = () => {
    // Assign partner to the requirement in question
    if (assignPartnerResponse.status !== 'loading' && selectedPartner && activeRequirement) {
      assignPartnerQuery({
        clientUuid,
        projectUuid,
        requirementUuid: activeRequirement,
        partnerUuid: selectedPartner.uuid,
      });
      toggleConnectionModal();
    }
  };

  if (!project) {
    return null;
  }

  return (
    <>
      <Card>
        <CardBody>
          <CardTitles>
            <CardTitle> {t('project.partner-recommendations')}</CardTitle>
            <CardSubtitle>{t('project.partner-recommendations-desc')}</CardSubtitle>
          </CardTitles>

          <div className="my-8 flex flex-col gap-12">
            {project.requirements.map((req) => (
              <div key={req.uuid}>
                <h3 className="font-bold mb-0">{req.name}</h3>
                <p className="font-bold text-xs mt-0">{t('project.suggested-partners')}</p>
                <div className="flex flex-col gap-4">
                  {req.requirementType.partners.map((partner) => (
                    <PartnerCard
                      key={partner.uuid}
                      partner={partner}
                      requestStatus={req.requestStatus}
                      loading={Boolean(req.partner?.uuid) || loading || assignPartnerResponse.status === 'loading'}
                      connected={req.partner?.uuid === partner.uuid}
                      onClick={() => selectPartner(partner, req.uuid)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="text-right">
            <LinkButton.Primary to={generatePath(ClientRoutes.LAUNCHPAD, { clientUuid })}>
              {t('buttons.go-to-launchpad')}
            </LinkButton.Primary>
          </div>
        </CardBody>
      </Card>

      <Modal onCancelModal={toggleConnectionModal} isOpen={connectionModalIsOpen} slim={true}>
        <div className="text-center">
          <p>{t('project.send-connection-request-desc')}</p>
          <Button.Primary type="button" onClick={confirmConnect}>
            {t('buttons.send-connection-request')} <FontAwesomeIcon icon={faEnvelope} />
          </Button.Primary>
          <div className="mt-4">
            <Button.Link onClick={toggleConnectionModal}>{t('profile.cancel-delete-account')}</Button.Link>
          </div>
        </div>
      </Modal>
    </>
  );
});

interface PartnerCardProps {
  partner: Partner;
  loading?: boolean;
  connected?: boolean;
  requestStatus: RequirementRequestStatus;
  onClick: () => void;
}
const PartnerCard = (props: PartnerCardProps) => {
  const { t } = useTranslation();
  const { partner, loading, connected, requestStatus, onClick } = props;

  return (
    <div className="flex flex-col md:flex-row items-center rounded-md shadow" key={partner.uuid}>
      <div className="flex-1">
        <div className="px-4 text-xl font-bold">{partner.name}</div>
      </div>

      <div className="flex-1 p-4">
        {partner.description && <p>{partner.description}</p>}
        {partner.services && (
          <ServiceBadges>
            {partner.services.map((service) => (
              <ServiceBadge key={service.uuid} name={service.name} />
            ))}
          </ServiceBadges>
        )}
      </div>

      <div className="flex-1 p-4">
        {partner.websiteUrl && (
          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon={faLaptop} fixedWidth />
            <ExternalLinkDisplay href={partner.websiteUrl}>{partner.websiteUrl}</ExternalLinkDisplay>
          </div>
        )}
        {partner.contactEmail && (
          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon={faEnvelope} fixedWidth />
            <a href={`mailto:${partner.contactEmail}`} target="_blank" rel="noreferrer">
              {partner.contactEmail}
            </a>
          </div>
        )}
        {partner.contactPhoneNumber && (
          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon={faPhone} fixedWidth />
            <span>{partner.contactPhoneNumber}</span>
          </div>
        )}
      </div>
      <div className="flex-1 p-4 text-center">
        <Show show={requestStatus === RequirementRequestStatus.APPROVED && connected}>
          <Button.Accent type="button" disabled>
            {t('buttons.connected')} <FontAwesomeIcon icon={faHandshake} />
          </Button.Accent>
        </Show>
        <Show show={requestStatus === RequirementRequestStatus.PENDING && connected}>
          <Button.Accent type="button" disabled>
            {t('buttons.connection-requested')} <FontAwesomeIcon icon={faHandshake} />
          </Button.Accent>
        </Show>
        <Show show={requestStatus === RequirementRequestStatus.UNASSIGNED}>
          <Button.Primary type="button" disabled={loading} onClick={onClick}>
            {t('buttons.request-connection')} <FontAwesomeIcon icon={faHandshake} />
          </Button.Primary>
        </Show>
      </div>
    </div>
  );
};
