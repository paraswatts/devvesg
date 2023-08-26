/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { RequirementStatus, RequirementRequestStatus } from "./../../../../../gql/__generated__/globalTypes";

// ====================================================
// GraphQL query operation: GetRequirement
// ====================================================

export interface GetRequirement_partner_requirement_requirementType {
  __typename: "RequirementType";
  name: string;
}

export interface GetRequirement_partner_requirement_project_projectType {
  __typename: "ProjectType";
  name: string;
}

export interface GetRequirement_partner_requirement_project_initiative {
  __typename: "Initiative";
  name: string;
}

export interface GetRequirement_partner_requirement_project_client {
  __typename: "ClientInfo";
  uuid: string;
  name: string;
  logo: string | null;
  websiteUrl: string | null;
  contactEmail: string | null;
  contactPhoneNumber: string | null;
  linkedInUrl: string | null;
  twitterUrl: string | null;
}

export interface GetRequirement_partner_requirement_project {
  __typename: "ProjectForPartner";
  uuid: string;
  name: string;
  projectType: GetRequirement_partner_requirement_project_projectType;
  initiative: GetRequirement_partner_requirement_project_initiative;
  client: GetRequirement_partner_requirement_project_client | null;
}

export interface GetRequirement_partner_requirement {
  __typename: "Requirement";
  uuid: string;
  name: string;
  description: string;
  startDate: Date | null;
  endDate: Date | null;
  status: RequirementStatus;
  requestStatus: RequirementRequestStatus;
  requirementType: GetRequirement_partner_requirement_requirementType;
  project: GetRequirement_partner_requirement_project;
}

export interface GetRequirement_partner {
  __typename: "Partner";
  requirement: GetRequirement_partner_requirement;
}

export interface GetRequirement {
  partner: GetRequirement_partner;
}

export interface GetRequirementVariables {
  partnerId: string;
  requirementId: string;
}
