import React, { useState } from 'react';

import { useQuery } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import { generatePath } from 'react-router-dom';

import { LogoDecorator } from 'src/common/components';
import { ExternalLinkDisplay } from 'src/common/components/external-link-display';
import { DateIcon, FacebookIcon, LinkedInIcon, StatusIcon, TwitterIcon } from 'src/common/components/icons';
import { ServiceBadge, ServiceBadges } from 'src/common/components/service-badge/ServiceBadge';
import { LinkButton } from 'src/common/interactions/Button';
import { Show } from 'src/common/layout';
import { usePartner } from 'src/routes/partners/PartnerProvider';
import { PartnerAbsoluteRoutes } from 'src/routes/partners/PartnerRouter';
import {
  GetRequirements,
  GetRequirementsVariables,
  GetRequirements_partner_requirements_items as Requirement,
} from 'src/routes/partners/requirements/list/__gql__/GetRequirements';
import { GET_REQUIREMENTS } from 'src/routes/partners/requirements/list/RequirementsListContainer.query';

import tableStyles from 'src/common/styles/Table.module.scss';

export const RequirementsListContainer = React.memo(() => {
  const { partner } = usePartner();
  const { t } = useTranslation();
  const [requirements, setRequirements] = useState<Requirement[]>([]);

  const { loading, called } = useQuery<GetRequirements, GetRequirementsVariables>(GET_REQUIREMENTS, {
    variables: {
      partnerId: partner.uuid,
    },
    onCompleted: (response) => {
      setRequirements(response.partner.requirements.items);
    },
  });

  return (
    <>
      <div className="px-8 py-10 bg-white shadow">
        <div className="grid grid-cols-3 mb-8">
          <div className="col-span-2">
            <h1 className="font-bold">{partner.name}</h1>
            {partner.description}
            <div className="mt-4">
              {t('profile.services')}:
              <div className="mt-2">
                <ServiceBadges>
                  {(partner.services || []).map((service) => {
                    return <ServiceBadge key={service.uuid} name={service.name} />;
                  })}
                </ServiceBadges>
              </div>
            </div>
          </div>
          <div>
            <Show show={Boolean(partner.websiteUrl)}>
              <div className="mb-2">
                {t('website')}:{' '}
                <ExternalLinkDisplay href={partner.websiteUrl}>{partner.websiteUrl}</ExternalLinkDisplay>
              </div>
            </Show>
            <Show show={partner.contactEmail.length > 0}>
              <div className="mb-2">
                {t('profile.email')}:{' '}
                <a href={`mailto:${partner.contactEmail}`} target="_blank" rel="noreferrer">
                  {partner.contactEmail}
                </a>
              </div>
            </Show>
            <Show show={partner.contactPhoneNumber.length > 0}>
              <div className="mb-2">
                {t('profile.phone')}: {partner.contactPhoneNumber}
              </div>
            </Show>
            <div className="mb-8">
              <Show show={Boolean(partner.facebookUrl)}>
                <span className="mr-2">
                  <ExternalLinkDisplay href={partner.facebookUrl}>
                    <FacebookIcon />
                  </ExternalLinkDisplay>
                </span>
              </Show>
              <Show show={Boolean(partner.linkedInUrl)}>
                <span className="mr-2">
                  <ExternalLinkDisplay href={partner.linkedInUrl}>
                    <LinkedInIcon />
                  </ExternalLinkDisplay>
                </span>
              </Show>
              <Show show={Boolean(partner.twitterUrl)}>
                <span className="mr-2">
                  <ExternalLinkDisplay href={partner.twitterUrl}>
                    <TwitterIcon />
                  </ExternalLinkDisplay>
                </span>
              </Show>
            </div>
          </div>
        </div>

        <h1 className="font-bold">{t('partner.client-requirements')}</h1>

        <Show show={requirements.length === 0 && called && !loading}>
          <EmptyMessage partnerUuid={partner.uuid} t={t} />
        </Show>

        <RequirementsTable requirements={requirements} t={t} />
      </div>
    </>
  );
});

interface EmptyMessageProps {
  partnerUuid: string;
  t: (p: string) => string;
}
const EmptyMessage = ({ partnerUuid, t }: EmptyMessageProps) => {
  return (
    <div className="flex flex-col items-center gap-6 my-8">
      <h1 className="mb-0">{t('partner.lets-get-started')}</h1>
      <p className="mb-0">{t('partner.lets-get-started-desc')}</p>
      <LinkButton.Primary
        to={generatePath(PartnerAbsoluteRoutes.REQUESTS, {
          partnerUuid: partnerUuid,
        })}
      >
        {t('partner.requests')}
      </LinkButton.Primary>
    </div>
  );
};

interface RequirementsTableProps {
  requirements: Requirement[];
  t: (p: string) => string;
}
const RequirementsTable = React.memo(({ requirements, t }: RequirementsTableProps) => {
  const { partner } = usePartner();

  if (requirements.length === 0) {
    return null;
  }

  return (
    <div className={tableStyles.scrollXTableContainer}>
      <table className={tableStyles.devvEsgTable}>
        <thead>
          <tr>
            <th>{t('onboarding.client')}</th>
            <th>{t('project.requirement')}</th>
            <th>{t('project.status')}</th>
            <th>{t('project.start-date')}</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {requirements.map((requirement) => {
            const {
              uuid,
              name,
              status,
              startDate,
              project: { projectType, client },
            } = requirement;
            return (
              <tr key={uuid}>
                <td>{client && <LogoDecorator {...client}>{client.name}</LogoDecorator>}</td>
                <td>
                  {projectType.name}: {name}
                </td>
                <td>
                  <StatusIcon status={status} />
                </td>
                <td>{startDate && <DateIcon date={startDate} hideIcon />}</td>
                <td>
                  <LinkButton.Primary
                    small
                    to={generatePath(PartnerAbsoluteRoutes.REQUIREMENT_DETAILS, {
                      partnerUuid: partner.uuid,
                      requirementUuid: requirement.uuid,
                    })}
                  >
                    {t('partner.details')}
                  </LinkButton.Primary>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
});
