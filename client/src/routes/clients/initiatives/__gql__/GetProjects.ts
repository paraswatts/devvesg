/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ProjectStatus, RequirementStatus, RequirementRequestStatus } from "./../../../../gql/__generated__/globalTypes";

// ====================================================
// GraphQL query operation: GetProjects
// ====================================================

export interface GetProjects_client_projects_items_initiative {
  __typename: "Initiative";
  uuid: string;
  name: string;
  onboardingLogo: string;
}

export interface GetProjects_client_projects_items_requirements_partner_services {
  __typename: "Service";
  uuid: string;
  name: string;
}

export interface GetProjects_client_projects_items_requirements_partner {
  __typename: "PartnerInfo";
  name: string;
  description: string;
  logo: string | null;
  contactPhoneNumber: string | null;
  twitterUrl: string | null;
  facebookUrl: string | null;
  linkedInUrl: string | null;
  websiteUrl: string | null;
  contactEmail: string | null;
  services: GetProjects_client_projects_items_requirements_partner_services[];
}

export interface GetProjects_client_projects_items_requirements {
  __typename: "RequirementForClient";
  uuid: string;
  name: string;
  status: RequirementStatus;
  startDate: Date | null;
  endDate: Date | null;
  requestStatus: RequirementRequestStatus;
  partner: GetProjects_client_projects_items_requirements_partner | null;
}

export interface GetProjects_client_projects_items {
  __typename: "Project";
  uuid: string;
  name: string;
  startDate: Date | null;
  endGoalDate: Date | null;
  completionDate: Date | null;
  status: ProjectStatus;
  description: string;
  initiative: GetProjects_client_projects_items_initiative;
  requirements: GetProjects_client_projects_items_requirements[];
}

export interface GetProjects_client_projects {
  __typename: "ProjectList";
  items: GetProjects_client_projects_items[];
}

export interface GetProjects_client {
  __typename: "Client";
  projects: GetProjects_client_projects;
  uuid: string;
  name: string;
  logo: string | null;
}

export interface GetProjects {
  client: GetProjects_client;
}

export interface GetProjectsVariables {
  clientId: string;
}
