/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { RequirementStatus, RequirementRequestStatus } from "./../../../../../gql/__generated__/globalTypes";

// ====================================================
// GraphQL query operation: GetRequests
// ====================================================

export interface GetRequests_partner_requirementRequests_items_requirementType {
  __typename: "RequirementType";
  name: string;
}

export interface GetRequests_partner_requirementRequests_items_project_projectType {
  __typename: "ProjectType";
  name: string;
}

export interface GetRequests_partner_requirementRequests_items_project_initiative {
  __typename: "Initiative";
  name: string;
}

export interface GetRequests_partner_requirementRequests_items_project {
  __typename: "ProjectForPartner";
  name: string;
  projectType: GetRequests_partner_requirementRequests_items_project_projectType;
  initiative: GetRequests_partner_requirementRequests_items_project_initiative;
}

export interface GetRequests_partner_requirementRequests_items {
  __typename: "RequirementRequest";
  uuid: string;
  name: string;
  description: string;
  startDate: Date | null;
  endDate: Date | null;
  status: RequirementStatus;
  requestStatus: RequirementRequestStatus;
  requirementType: GetRequests_partner_requirementRequests_items_requirementType;
  project: GetRequests_partner_requirementRequests_items_project;
}

export interface GetRequests_partner_requirementRequests {
  __typename: "RequirementRequestList";
  items: GetRequests_partner_requirementRequests_items[];
}

export interface GetRequests_partner {
  __typename: "Partner";
  requirementRequests: GetRequests_partner_requirementRequests;
}

export interface GetRequests {
  partner: GetRequests_partner;
}

export interface GetRequestsVariables {
  partnerId: string;
}
