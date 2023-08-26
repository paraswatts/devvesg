import React, { useCallback } from 'react';

import { useTranslation } from 'react-i18next';

import { ExternalLinkDisplay } from 'src/common/components/external-link-display';
import { FacebookIcon, LinkedInIcon, TwitterIcon } from 'src/common/components/icons';
import { RequirementInformation } from 'src/common/components/requirement-information/RequirementInformation';
import { ServiceBadge, ServiceBadges } from 'src/common/components/service-badge/ServiceBadge';
import { useParams } from 'src/common/hooks';
import { Button } from 'src/common/interactions/Button';
import { Show } from 'src/common/layout';
import { RequirementRequestStatus } from 'src/gql';
import {
  GetProjects_client_projects_items_requirements_partner as Partner,
  GetProjects_client_projects_items_requirements as Requirement,
} from 'src/routes/clients/initiatives/__gql__/GetProjects';

interface PartnerDetailModalProps {
  partner?: Partner | null;
  projectUuid?: string;
  requirement?: Requirement;
  onDisconnectPartner?: (requirement: Requirement, projectUuid: string) => void;
}

export const PartnerDetailModal = React.memo((props: PartnerDetailModalProps) => {
  const { t } = useTranslation();
  const { onDisconnectPartner, partner, projectUuid, requirement } = props;
  const { clientUuid } = useParams<{ clientUuid: string }>();
  const shouldShowSocial = useCallback(() => {
    return !!partner && (Boolean(partner.twitterUrl) || Boolean(partner.facebookUrl) || Boolean(partner.linkedInUrl));
  }, [partner]);

  if (!partner) {
    return null;
  }

  const hasLogo = !!partner.logo;

  return (
    <div className="grid grid-cols-5 gap-4">
      {partner.logo && (
        <div>
          <img src={partner.logo} alt={partner.name} className="max-w-full" />
        </div>
      )}
      <div className={hasLogo ? 'col-span-4' : 'col-span-5'}>
        <h3>{partner.name}</h3>
        <div className="pb-9">{partner.description}</div>
        <Show show={(partner.services || []).length > 0}>
          <div className="pb-9">
            <div className="mb-2">{t('profile.services')}:</div>
            <ServiceBadges>
              {(partner.services || []).map((s) => (
                <ServiceBadge key={s.uuid} name={s.name} />
              ))}
            </ServiceBadges>
          </div>
        </Show>
        <div>
          {partner.websiteUrl && (
            <div className="mb-2">
              {t('website')}: <ExternalLinkDisplay href={partner.websiteUrl}>{partner.websiteUrl}</ExternalLinkDisplay>
            </div>
          )}
          {partner.contactEmail && (
            <div className="mb-2">
              {t('profile.email')}: <a href={`mailto:${partner.contactEmail}`}>{partner.contactEmail}</a>
            </div>
          )}
          {partner.contactPhoneNumber && (
            <div className="mb-2">
              {t('profile.phone')}: {partner.contactPhoneNumber}
            </div>
          )}
        </div>
        <Show show={shouldShowSocial()}>
          <div className="pt-6">
            {partner.linkedInUrl && (
              <a href={partner.linkedInUrl} target="_blank" rel="noreferrer">
                <LinkedInIcon />
              </a>
            )}
            {partner.twitterUrl && (
              <a href={partner.twitterUrl} target="_blank" rel="noreferrer" className="ml-2">
                <TwitterIcon />
              </a>
            )}

            {partner.facebookUrl && (
              <a href={partner.facebookUrl} target="_blank" rel="noreferrer" className="ml-2">
                <FacebookIcon />
              </a>
            )}
          </div>
        </Show>
      </div>
      {requirement && projectUuid && (
        <>
          <div className="col-span-5">
            <RequirementInformation
              clientUuid={clientUuid}
              requirementUuid={requirement.uuid}
              projectUuid={projectUuid}
              canEdit={false}
            />
          </div>
          {requirement.requestStatus === RequirementRequestStatus.APPROVED && onDisconnectPartner && (
            <div className="col-span-5 text-center">
              <Button.Warning type="button" onClick={() => onDisconnectPartner(requirement, projectUuid)}>
                {t('buttons.disconnect-from-partner')}
              </Button.Warning>
            </div>
          )}
        </>
      )}
    </div>
  );
});
