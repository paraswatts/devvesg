/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetReduceImpact
// ====================================================

export interface GetReduceImpact_client_latestFootprint {
  __typename: "CarbonFootprint";
  total: number;
}

export interface GetReduceImpact_client {
  __typename: "Client";
  latestFootprint: GetReduceImpact_client_latestFootprint | null;
}

export interface GetReduceImpact_initiatives_items {
  __typename: "Initiative";
  uuid: string;
  name: string;
  objective: string;
  onboardingLogo: string;
}

export interface GetReduceImpact_initiatives {
  __typename: "InitiativeList";
  items: GetReduceImpact_initiatives_items[];
}

export interface GetReduceImpact {
  client: GetReduceImpact_client;
  initiatives: GetReduceImpact_initiatives;
}

export interface GetReduceImpactVariables {
  clientId: string;
}
