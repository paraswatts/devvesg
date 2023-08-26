import { gql } from '@apollo/client';

export const GET_LATEST_FOOTPRINT = gql`
  query GetLatestFootprint($clientId: ID!) {
    client(clientId: $clientId) {
      latestFootprint {
        total
        createdAt
      }
    }
  }
`;
