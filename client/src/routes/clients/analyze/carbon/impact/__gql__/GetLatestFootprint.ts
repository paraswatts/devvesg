/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetLatestFootprint
// ====================================================

export interface GetLatestFootprint_client_latestFootprint {
  __typename: "CarbonFootprint";
  total: number;
  createdAt: Date;
}

export interface GetLatestFootprint_client {
  __typename: "Client";
  latestFootprint: GetLatestFootprint_client_latestFootprint | null;
}

export interface GetLatestFootprint {
  client: GetLatestFootprint_client;
}

export interface GetLatestFootprintVariables {
  clientId: string;
}
