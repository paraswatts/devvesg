/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetClientForProvider
// ====================================================

export interface GetClientForProvider_client {
  __typename: "Client";
  uuid: string;
  name: string;
  description: string;
  logo: string | null;
}

export interface GetClientForProvider {
  client: GetClientForProvider_client;
}

export interface GetClientForProviderVariables {
  clientId: string;
}
