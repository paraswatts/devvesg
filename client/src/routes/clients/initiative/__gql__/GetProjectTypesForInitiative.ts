/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetProjectTypesForInitiative
// ====================================================

export interface GetProjectTypesForInitiative_initiative_projectTypes {
  __typename: "ProjectType";
  uuid: string;
  name: string;
  objective: string;
}

export interface GetProjectTypesForInitiative_initiative {
  __typename: "Initiative";
  projectTypes: GetProjectTypesForInitiative_initiative_projectTypes[];
}

export interface GetProjectTypesForInitiative {
  initiative: GetProjectTypesForInitiative_initiative;
}

export interface GetProjectTypesForInitiativeVariables {
  initiativeId: string;
}
