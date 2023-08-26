import { gql } from '@apollo/client';

export const GET_REQUIREMENT = gql`
  query GetRequirement($partnerId: ID!, $requirementId: ID!) {
    partner(partnerId: $partnerId) {
      requirement(requirementId: $requirementId) {
        uuid
        name
        description
        startDate
        endDate
        status
        requestStatus
        requirementType {
          name
        }
        project {
          uuid
          name
          projectType {
            name
          }
          initiative {
            name
          }
          client {
            uuid
            name
            logo
            websiteUrl
            contactEmail
            contactPhoneNumber
            linkedInUrl
            twitterUrl
          }
        }
      }
    }
  }
`;
