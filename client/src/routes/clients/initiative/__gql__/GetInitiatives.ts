/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetInitiatives
// ====================================================

export interface GetInitiatives_initiatives_items {
  __typename: "Initiative";
  uuid: string;
  name: string;
  onboardingLogo: string;
  objective: string;
}

export interface GetInitiatives_initiatives {
  __typename: "InitiativeList";
  items: GetInitiatives_initiatives_items[];
}

export interface GetInitiatives {
  initiatives: GetInitiatives_initiatives;
}
