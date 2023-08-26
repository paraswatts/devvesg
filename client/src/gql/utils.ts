import { ProjectStatus, RequirementStatus } from 'src/gql/__generated__/globalTypes';
import { ProjectRequirementStatuses } from 'src/interfaces';

export const translateProjectStatusForRest = (status: ProjectStatus) => {
  switch (status) {
    case ProjectStatus.DONE:
      return ProjectRequirementStatuses.DONE;
    case ProjectStatus.NOT_STARTED:
      return ProjectRequirementStatuses.NOT_STARTED;
    case ProjectStatus.IN_PROGRESS:
      return ProjectRequirementStatuses.IN_PROGRESS;
    case ProjectStatus.ON_HOLD:
      return ProjectRequirementStatuses.ON_HOLD;
    default:
      return ProjectRequirementStatuses.NOT_STARTED;
  }
};

export const translateRequirementStatusForRest = (status: RequirementStatus) => {
  switch (status) {
    case RequirementStatus.DONE:
      return ProjectRequirementStatuses.DONE;
    case RequirementStatus.NOT_STARTED:
      return ProjectRequirementStatuses.NOT_STARTED;
    case RequirementStatus.IN_PROGRESS:
      return ProjectRequirementStatuses.IN_PROGRESS;
    case RequirementStatus.ON_HOLD:
      return ProjectRequirementStatuses.ON_HOLD;
    default:
      return ProjectRequirementStatuses.NOT_STARTED;
  }
};
