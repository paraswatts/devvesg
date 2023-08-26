import { gql } from '@apollo/client';

export const GET_CLIENT_FOR_PROVIDER = gql`
  query GetClientForProvider($clientId: ID!) {
    client(clientId: $clientId) {
      uuid
      name
      description
      logo
    }
  }
`;
