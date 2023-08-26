/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { RequirementRequestStatus } from "./../../../../../gql/__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: RequirementRequestStatusChange
// ====================================================

export interface RequirementRequestStatusChange_requirementRequestStatusChange {
  __typename: "RequirementRequest";
  uuid: string;
  requestStatus: RequirementRequestStatus;
}

export interface RequirementRequestStatusChange {
  requirementRequestStatusChange: RequirementRequestStatusChange_requirementRequestStatusChange;
}

export interface RequirementRequestStatusChangeVariables {
  requirementRequestId: string;
  requestStatus: RequirementRequestStatus;
}
