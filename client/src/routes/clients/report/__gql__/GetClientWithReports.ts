/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetClientWithReports
// ====================================================

export interface GetClientWithReports_client {
  __typename: "Client";
  name: string;
  report1: string | null;
  report2: string | null;
  stockTicker: string | null;
}

export interface GetClientWithReports {
  client: GetClientWithReports_client;
}

export interface GetClientWithReportsVariables {
  clientId: string;
}
