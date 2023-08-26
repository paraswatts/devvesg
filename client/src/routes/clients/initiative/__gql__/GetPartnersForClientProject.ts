/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { RequirementRequestStatus } from "./../../../../gql/__generated__/globalTypes";

// ====================================================
// GraphQL query operation: GetPartnersForClientProject
// ====================================================

export interface GetPartnersForClientProject_client_project_requirements_partner {
  __typename: "PartnerInfo";
  uuid: string;
}

export interface GetPartnersForClientProject_client_project_requirements_requirementType_partners_services {
  __typename: "Service";
  uuid: string;
  name: string;
}

export interface GetPartnersForClientProject_client_project_requirements_requirementType_partners {
  __typename: "PartnerInfo";
  uuid: string;
  name: string;
  description: string;
  websiteUrl: string | null;
  contactEmail: string | null;
  contactPhoneNumber: string | null;
  services: GetPartnersForClientProject_client_project_requirements_requirementType_partners_services[];
}

export interface GetPartnersForClientProject_client_project_requirements_requirementType {
  __typename: "RequirementType";
  partners: GetPartnersForClientProject_client_project_requirements_requirementType_partners[];
}

export interface GetPartnersForClientProject_client_project_requirements {
  __typename: "RequirementForClient";
  uuid: string;
  name: string;
  requestStatus: RequirementRequestStatus;
  partner: GetPartnersForClientProject_client_project_requirements_partner | null;
  requirementType: GetPartnersForClientProject_client_project_requirements_requirementType;
}

export interface GetPartnersForClientProject_client_project {
  __typename: "Project";
  requirements: GetPartnersForClientProject_client_project_requirements[];
}

export interface GetPartnersForClientProject_client {
  __typename: "Client";
  project: GetPartnersForClientProject_client_project;
}

export interface GetPartnersForClientProject {
  client: GetPartnersForClientProject_client;
}

export interface GetPartnersForClientProjectVariables {
  clientId: string;
  projectId: string;
}
