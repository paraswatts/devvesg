import React, { useCallback } from 'react';

import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation } from 'react-i18next';

import { ProjectStatus, RequirementStatus } from 'src/gql';
import { ProjectRequirementStatuses } from 'src/interfaces';

import statusStyles from 'src/common/components/icons/StatusIcon.module.scss';

interface StatusIconProps {
  status: ProjectRequirementStatuses | ProjectStatus | RequirementStatus;
}

export const StatusIcon = React.memo((props: StatusIconProps) => {
  const { status } = props;
  const { t } = useTranslation();

  const getText = useCallback(() => {
    switch (status) {
      case ProjectRequirementStatuses.DONE:
      case ProjectStatus.DONE:
      case RequirementStatus.DONE:
        return t('project.done');
      case ProjectRequirementStatuses.NOT_STARTED:
      case ProjectStatus.NOT_STARTED:
      case RequirementStatus.NOT_STARTED:
        return t('project.not-started');
      case ProjectRequirementStatuses.IN_PROGRESS:
      case ProjectStatus.IN_PROGRESS:
      case RequirementStatus.IN_PROGRESS:
        return t('project.in-progress');
      case ProjectRequirementStatuses.ON_HOLD:
      case ProjectStatus.ON_HOLD:
      case RequirementStatus.ON_HOLD:
        return t('project.on-hold');
      default:
        return '';
    }
  }, [status, t]);

  return (
    <>
      <FontAwesomeIcon icon={faCircle} className={`${statusStyles[status]} mb-px`} size="xs" />
      <span className={`ml-2 ${statusStyles[status]}`}>{getText()}</span>
    </>
  );
});
