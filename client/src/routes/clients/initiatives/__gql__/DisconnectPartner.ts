/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DisconnectPartner
// ====================================================

export interface DisconnectPartner_requirementDisconnectPartner {
  __typename: "Requirement";
  uuid: string;
}

export interface DisconnectPartner {
  requirementDisconnectPartner: DisconnectPartner_requirementDisconnectPartner | null;
}

export interface DisconnectPartnerVariables {
  id: string;
  clientId: string;
  projectId: string;
  reason: string;
}
