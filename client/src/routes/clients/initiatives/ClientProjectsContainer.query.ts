import { gql } from '@apollo/client';

export const GET_PROJECTS = gql`
  query GetProjects($clientId: ID!) {
    client(clientId: $clientId) {
      projects {
        items {
          uuid
          name
          startDate
          endGoalDate
          completionDate
          status
          description
          initiative {
            uuid
            name
            onboardingLogo
          }
          requirements {
            uuid
            name
            status
            startDate
            endDate
            requestStatus
            partner {
              name
              description
              logo
              contactPhoneNumber
              twitterUrl
              facebookUrl
              linkedInUrl
              websiteUrl
              contactEmail
              services {
                uuid
                name
              }
            }
          }
        }
      }
      uuid
      name
      logo
    }
  }
`;

export const DISCONNECT_PARTNER = gql`
  mutation DisconnectPartner($id: ID!, $clientId: ID!, $projectId: ID!, $reason: String!) {
    requirementDisconnectPartner(id: $id, clientId: $clientId, projectId: $projectId, reason: $reason) {
      uuid
    }
  }
`;
