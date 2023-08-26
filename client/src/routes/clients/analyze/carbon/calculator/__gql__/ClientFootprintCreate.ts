/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ClientFootprintCreate
// ====================================================

export interface ClientFootprintCreate_clientFootprintCreate {
  __typename: "CarbonFootprint";
  total: number;
  createdAt: Date;
}

export interface ClientFootprintCreate {
  clientFootprintCreate: ClientFootprintCreate_clientFootprintCreate | null;
}

export interface ClientFootprintCreateVariables {
  clientId: string;
  total: number;
}
