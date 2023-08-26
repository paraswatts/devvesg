import { gql } from '@apollo/client';

export const GET_REQUIREMENTS = gql`
  query GetRequirements($partnerId: ID!) {
    partner(partnerId: $partnerId) {
      requirements {
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
            client {
              name
              logo
            }
          }
        }
      }
    }
  }
`;
