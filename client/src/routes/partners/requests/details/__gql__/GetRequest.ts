/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { RequirementStatus, RequirementRequestStatus } from "./../../../../../gql/__generated__/globalTypes";

// ====================================================
// GraphQL query operation: GetRequest
// ====================================================

export interface GetRequest_partner_requirementRequest_requirementType {
  __typename: "RequirementType";
  name: string;
}

export interface GetRequest_partner_requirementRequest_project_projectType {
  __typename: "ProjectType";
  name: string;
}

export interface GetRequest_partner_requirementRequest_project_initiative {
  __typename: "Initiative";
  name: string;
}

export interface GetRequest_partner_requirementRequest_project {
  __typename: "ProjectForPartner";
  name: string;
  projectType: GetRequest_partner_requirementRequest_project_projectType;
  initiative: GetRequest_partner_requirementRequest_project_initiative;
}

export interface GetRequest_partner_requirementRequest {
  __typename: "RequirementRequest";
  uuid: string;
  name: string;
  description: string;
  startDate: Date | null;
  endDate: Date | null;
  status: RequirementStatus;
  requestStatus: RequirementRequestStatus;
  requirementType: GetRequest_partner_requirementRequest_requirementType;
  project: GetRequest_partner_requirementRequest_project;
}

export interface GetRequest_partner {
  __typename: "Partner";
  requirementRequest: GetRequest_partner_requirementRequest;
}

export interface GetRequest {
  partner: GetRequest_partner;
}

export interface GetRequestVariables {
  partnerId: string;
  requirementRequestId: string;
}
