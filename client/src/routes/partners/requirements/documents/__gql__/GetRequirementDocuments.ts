/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { RequirementDocumentType } from "./../../../../../gql/__generated__/globalTypes";

// ====================================================
// GraphQL query operation: GetRequirementDocuments
// ====================================================

export interface GetRequirementDocuments_partner_requirement_documents {
  __typename: "RequirementDocument";
  uuid: string;
  name: string;
  type: RequirementDocumentType;
  file: string;
  createdAt: Date;
}

export interface GetRequirementDocuments_partner_requirement {
  __typename: "Requirement";
  documents: GetRequirementDocuments_partner_requirement_documents[];
}

export interface GetRequirementDocuments_partner {
  __typename: "Partner";
  requirement: GetRequirementDocuments_partner_requirement;
}

export interface GetRequirementDocuments {
  partner: GetRequirementDocuments_partner;
}

export interface GetRequirementDocumentsVariables {
  partnerId: string;
  requirementId: string;
}
