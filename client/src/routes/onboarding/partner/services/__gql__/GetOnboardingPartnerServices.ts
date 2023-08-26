/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetOnboardingPartnerServices
// ====================================================

export interface GetOnboardingPartnerServices_initiatives_items_projectTypes_requirementTypes {
  __typename: "RequirementType";
  name: string;
  uuid: string;
}

export interface GetOnboardingPartnerServices_initiatives_items_projectTypes {
  __typename: "ProjectType";
  uuid: string;
  name: string;
  requirementTypes: GetOnboardingPartnerServices_initiatives_items_projectTypes_requirementTypes[];
}

export interface GetOnboardingPartnerServices_initiatives_items {
  __typename: "Initiative";
  uuid: string;
  name: string;
  projectTypes: GetOnboardingPartnerServices_initiatives_items_projectTypes[];
}

export interface GetOnboardingPartnerServices_initiatives {
  __typename: "InitiativeList";
  items: GetOnboardingPartnerServices_initiatives_items[];
}

export interface GetOnboardingPartnerServices_clientTypes {
  __typename: "ClientType";
  uuid: string;
  name: string;
}

export interface GetOnboardingPartnerServices {
  initiatives: GetOnboardingPartnerServices_initiatives;
  clientTypes: GetOnboardingPartnerServices_clientTypes[];
}
