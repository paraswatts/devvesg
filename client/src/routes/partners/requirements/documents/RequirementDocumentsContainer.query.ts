import { gql } from '@apollo/client';

export const GET_REQUIREMENT_DOCUMENTS = gql`
  query GetRequirementDocuments($partnerId: ID!, $requirementId: ID!) {
    partner(partnerId: $partnerId) {
      requirement(requirementId: $requirementId) {
        documents {
          uuid
          name
          type
          file
          createdAt
        }
      }
    }
  }
`;
