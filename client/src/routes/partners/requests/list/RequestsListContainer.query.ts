import { gql } from '@apollo/client';

export const GET_REQUESTS = gql`
  query GetRequests($partnerId: ID!) {
    partner(partnerId: $partnerId) {
      requirementRequests {
        items {
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
            name
            projectType {
              name
            }
            initiative {
              name
            }
          }
        }
      }
    }
  }
`;
