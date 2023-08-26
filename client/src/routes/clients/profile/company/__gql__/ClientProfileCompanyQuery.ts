/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ClientProfileCompanyQuery
// ====================================================

export interface ClientProfileCompanyQuery_client_clientType {
  __typename: "ClientType";
  uuid: string;
  name: string;
}

export interface ClientProfileCompanyQuery_client_vertical {
  __typename: "Vertical";
  uuid: string;
  name: string;
}

export interface ClientProfileCompanyQuery_client_locations {
  __typename: "ClientLocation";
  country: string;
  province: string;
}

export interface ClientProfileCompanyQuery_client {
  __typename: "Client";
  uuid: string;
  name: string;
  description: string;
  logo: string | null;
  contactEmail: string | null;
  websiteUrl: string | null;
  contactPhoneNumber: string | null;
  twitterUrl: string | null;
  linkedInUrl: string | null;
  clientType: ClientProfileCompanyQuery_client_clientType | null;
  vertical: ClientProfileCompanyQuery_client_vertical | null;
  locations: ClientProfileCompanyQuery_client_locations[];
}

export interface ClientProfileCompanyQuery {
  client: ClientProfileCompanyQuery_client;
}

export interface ClientProfileCompanyQueryVariables {
  clientId: string;
}
