import { gql } from '@apollo/client';

export const GET_PARTNERS_FOR_CLIENT_PROJECT = gql`
  query GetPartnersForClientProject($clientId: ID!, $projectId: ID!) {
    client(clientId: $clientId) {
      project(projectId: $projectId) {
        requirements {
          uuid
          name
          requestStatus
          partner {
            uuid
          }
          requirementType {
            partners {
              uuid
              name
              description
              websiteUrl
              contactEmail
              contactPhoneNumber
              services {
                uuid
                name
              }
            }
          }
        }
      }
    }
  }
`;
