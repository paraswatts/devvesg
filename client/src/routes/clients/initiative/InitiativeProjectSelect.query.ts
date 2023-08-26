import { gql } from '@apollo/client';

export const GET_PROJECT_TYPES_FOR_INITIATIVE = gql`
  query GetProjectTypesForInitiative($initiativeId: ID!) {
    initiative(initiativeId: $initiativeId) {
      projectTypes {
        uuid
        name
        objective
      }
    }
  }
`;
