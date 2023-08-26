import { memo, useState } from 'react';

import { useQuery } from '@apollo/client';
import { faLinkedin, faTwitterSquare } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faExternalLinkAlt, faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Api, useLazyQuery } from 'src/api';
import { DateIcon } from 'src/common/components';
import { ExternalLinkDisplay } from 'src/common/components/external-link-display';
import { FormField, SelectOption, SingleSelectHookInput } from 'src/common/forms';
import { useParams } from 'src/common/hooks';
import { Button } from 'src/common/interactions/Button';
import { SectionLabel } from 'src/common/typography';
import { RequirementStatus } from 'src/gql';
import { ProjectRequirementStatuses } from 'src/interfaces';
import { usePartner } from 'src/routes/partners/PartnerProvider';
import {
  GetRequirement,
  GetRequirementVariables,
  GetRequirement_partner_requirement as Requirement,
} from 'src/routes/partners/requirements/details/__gql__/GetRequirement';
import { GET_REQUIREMENT } from 'src/routes/partners/requirements/details/RequirementDetailsContainer.query';
import { RequirementNavigation } from 'src/routes/partners/requirements/RequirementNavigation';

import tableStyles from 'src/common/styles/Table.module.scss';

export const RequirementDetailsContainer = () => {
  const { partner } = usePartner();
  const { requirementUuid } = useParams<{ requirementUuid: string }>();

  const [requirement, setRequirement] = useState<Requirement>();

  useQuery<GetRequirement, GetRequirementVariables>(GET_REQUIREMENT, {
    variables: {
      partnerId: partner.uuid,
      requirementId: requirementUuid,
    },
    onCompleted: (response) => {
      setRequirement(response.partner.requirement);
    },
  });

  return (
    <div className="px-8 pb-10 bg-white shadow">
      <RequirementNavigation />

      {requirement && <RequirementClientHeader requirement={requirement} />}

      {requirement && <RequirementDetails requirement={requirement} />}
    </div>
  );
};

interface RequirementClientHeaderProps {
  requirement: Requirement;
}
const RequirementClientHeader = memo(({ requirement }: RequirementClientHeaderProps) => {
  const client = requirement.project.client;
  const { t } = useTranslation();
  if (!client) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:gap-8">
      <div className="flex-grow">
        <div className="mb-2">
          <SectionLabel>{t('partner.client-name')}</SectionLabel>
        </div>
        <div aria-label={t('partner.client-name')}>{client.name}</div>
      </div>

      {client.logo && (
        <div>
          <div className="mb-2">
            <SectionLabel>{t('profile.logo')}</SectionLabel>
          </div>
          <div>
            <img className="max-w-[150px]" src={client.logo} alt={`${client.name} logo`} />
          </div>
        </div>
      )}

      <div>
        <div className="mb-2">
          <SectionLabel>{t('partner.contact-info')}</SectionLabel>
        </div>
        <div className="flex flex-col gap-1">
          {client.websiteUrl && (
            <div className="flex gap-2 items-center">
              <FontAwesomeIcon icon={faExternalLinkAlt} />
              <ExternalLinkDisplay href={client.websiteUrl}>{client.websiteUrl}</ExternalLinkDisplay>
            </div>
          )}
          {client.contactEmail && (
            <div className="flex gap-2 items-center">
              <FontAwesomeIcon icon={faEnvelope} />

              <a href={`mailto:${client.contactEmail}`}>{client.contactEmail}</a>
            </div>
          )}
          {client.contactPhoneNumber && (
            <div className="flex gap-2 items-center">
              <FontAwesomeIcon icon={faPhone} />
              {client.contactPhoneNumber}
            </div>
          )}

          {client.linkedInUrl && (
            <div className="flex gap-2 items-center">
              <FontAwesomeIcon icon={faLinkedin} />

              <a href={client.linkedInUrl} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            </div>
          )}

          {client.twitterUrl && (
            <div className="flex gap-2 items-center">
              <FontAwesomeIcon icon={faTwitterSquare} />

              <a href={client.twitterUrl} target="_blank" rel="noreferrer">
                Twitter
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

// TODO: Can remove this after migrating to pure GQL calls
const StatusNewToOldMap: Record<RequirementStatus, ProjectRequirementStatuses> = {
  [RequirementStatus.DONE]: ProjectRequirementStatuses.DONE,
  [RequirementStatus.IN_PROGRESS]: ProjectRequirementStatuses.IN_PROGRESS,
  [RequirementStatus.NOT_STARTED]: ProjectRequirementStatuses.NOT_STARTED,
  [RequirementStatus.ON_HOLD]: ProjectRequirementStatuses.ON_HOLD,
};

const StatusOldToNewMap: Record<ProjectRequirementStatuses, RequirementStatus> = {
  [ProjectRequirementStatuses.DONE]: RequirementStatus.DONE,
  [ProjectRequirementStatuses.IN_PROGRESS]: RequirementStatus.IN_PROGRESS,
  [ProjectRequirementStatuses.NOT_STARTED]: RequirementStatus.NOT_STARTED,
  [ProjectRequirementStatuses.ON_HOLD]: RequirementStatus.ON_HOLD,
};

interface RequirementDetailsProps {
  requirement: Requirement;
}
const RequirementDetails = memo(({ requirement }: RequirementDetailsProps) => {
  const { handleSubmit, control, formState, resetField } = useForm<{ status: RequirementStatus }>({
    defaultValues: { status: requirement.status },
  });
  const { t } = useTranslation();
  const [updateQuery, updateQueryResponse] = useLazyQuery(Api.requirement.updateStatus, {
    enableSuccessToast: true,
    onSuccess: (response) => {
      resetField('status', {
        keepDirty: false,
        keepTouched: false,
        keepError: false,
        defaultValue: StatusOldToNewMap[response.data.status],
      });
    },
  });

  const updateStatus = (value: { status: RequirementStatus }) => {
    const { status } = value;
    if (requirement && requirement.project.client) {
      updateQuery({
        status: StatusNewToOldMap[status],
        startDate: requirement.startDate,
        endDate: requirement.endDate,
        clientUuid: requirement.project.client.uuid,
        projectUuid: requirement.project.uuid,
        requirementUuid: requirement.uuid,
      });
    }
  };

  let initiative = '';
  if (requirement.project.initiative) {
    initiative = requirement.project.initiative.name;
  }

  let projectType = '';
  if (requirement.project.projectType) {
    projectType = requirement.project.projectType.name;
  }

  const requirementStatusOptions = [
    {
      value: RequirementStatus.NOT_STARTED,
      label: t('project.not-started'),
    },
    {
      value: RequirementStatus.IN_PROGRESS,
      label: t('project.in-progress'),
    },
    {
      value: RequirementStatus.DONE,
      label: t('project.done'),
    },
    {
      value: RequirementStatus.ON_HOLD,
      label: t('project.on-hold'),
    },
  ];

  return (
    <div className="mt-8">
      <div className="px-4 py-6 shadow-md">
        <SectionLabel>{t('partner.project-requirement-information')}</SectionLabel>
      </div>

      <div className={tableStyles.scrollXTableContainer}>
        <table className={tableStyles.devvEsgTable}>
          <tbody>
            <tr>
              <td>
                <SectionLabel>{t('partner.esg-initiative')}</SectionLabel>
              </td>
              <td aria-label={t('partner.esg-initiative')}>{initiative}</td>
            </tr>
            <tr>
              <td>
                <SectionLabel>{t('improve.project-type-label')}</SectionLabel>
              </td>
              <td aria-label={t('improve.project-type-label')}>{projectType}</td>
            </tr>
            <tr>
              <td>
                <SectionLabel>{t('project.requirement')}</SectionLabel>
              </td>
              <td aria-label={t('project.requirement')}>{requirement.name}</td>
            </tr>
            <tr>
              <td>
                <SectionLabel>{t('project.start-date')}</SectionLabel>
              </td>
              <td aria-label={t('project.start-date')}>
                {requirement.startDate && <DateIcon date={requirement.startDate} hideIcon />}
              </td>
            </tr>
            <tr>
              <td>
                <SectionLabel>{t('project.end-date')}</SectionLabel>
              </td>
              <td aria-label={t('project.end-date')}>
                {requirement.endDate && <DateIcon date={requirement.endDate} hideIcon />}
              </td>
            </tr>
            <tr>
              <td>
                <SectionLabel>{t('project.status')}</SectionLabel>
              </td>
              <td aria-label={t('project.status')}>
                <form onSubmit={handleSubmit(updateStatus)}>
                  <div className="flex flex-row gap-3">
                    <FormField
                      id="requirement-status"
                      name="status"
                      label={t('project.status')}
                      labelSrOnly
                      disableHelpTextAllocation
                    >
                      <SingleSelectHookInput control={control}>
                        {requirementStatusOptions.map((option) => (
                          <SelectOption key={option.value} value={option.value} label={option.label}>
                            {option.label}
                          </SelectOption>
                        ))}
                      </SingleSelectHookInput>
                    </FormField>
                    <div>
                      <Button.Primary
                        type="submit"
                        disabled={!formState.isDirty || updateQueryResponse.status === 'loading'}
                      >
                        {t('buttons.save')}
                      </Button.Primary>
                    </div>
                  </div>
                </form>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
});
