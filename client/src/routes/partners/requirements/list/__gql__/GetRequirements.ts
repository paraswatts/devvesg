/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { RequirementStatus, RequirementRequestStatus } from "./../../../../../gql/__generated__/globalTypes";

// ====================================================
// GraphQL query operation: GetRequirements
// ====================================================

export interface GetRequirements_partner_requirements_items_requirementType {
  __typename: "RequirementType";
  name: string;
}

export interface GetRequirements_partner_requirements_items_project_projectType {
  __typename: "ProjectType";
  name: string;
}

export interface GetRequirements_partner_requirements_items_project_initiative {
  __typename: "Initiative";
  name: string;
}

export interface GetRequirements_partner_requirements_items_project_client {
  __typename: "ClientInfo";
  name: string;
  logo: string | null;
}

export interface GetRequirements_partner_requirements_items_project {
  __typename: "ProjectForPartner";
  name: string;
  projectType: GetRequirements_partner_requirements_items_project_projectType;
  initiative: GetRequirements_partner_requirements_items_project_initiative;
  client: GetRequirements_partner_requirements_items_project_client | null;
}

export interface GetRequirements_partner_requirements_items {
  __typename: "Requirement";
  uuid: string;
  name: string;
  description: string;
  startDate: Date | null;
  endDate: Date | null;
  status: RequirementStatus;
  requestStatus: RequirementRequestStatus;
  requirementType: GetRequirements_partner_requirements_items_requirementType;
  project: GetRequirements_partner_requirements_items_project;
}

export interface GetRequirements_partner_requirements {
  __typename: "RequirementList";
  items: GetRequirements_partner_requirements_items[];
}

export interface GetRequirements_partner {
  __typename: "Partner";
  requirements: GetRequirements_partner_requirements;
}

export interface GetRequirements {
  partner: GetRequirements_partner;
}

export interface GetRequirementsVariables {
  partnerId: string;
}
