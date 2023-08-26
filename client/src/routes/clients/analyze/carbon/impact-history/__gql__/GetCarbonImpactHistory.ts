/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCarbonImpactHistory
// ====================================================

export interface GetCarbonImpactHistory_client_footprints_items {
  __typename: "CarbonFootprint";
  uuid: string;
  total: number;
  createdAt: Date;
}

export interface GetCarbonImpactHistory_client_footprints {
  __typename: "CarbonFootprintList";
  items: GetCarbonImpactHistory_client_footprints_items[];
}

export interface GetCarbonImpactHistory_client {
  __typename: "Client";
  footprints: GetCarbonImpactHistory_client_footprints;
}

export interface GetCarbonImpactHistory {
  client: GetCarbonImpactHistory_client;
}

export interface GetCarbonImpactHistoryVariables {
  clientId: string;
}
