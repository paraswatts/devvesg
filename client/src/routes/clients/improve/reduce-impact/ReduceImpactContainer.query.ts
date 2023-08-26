import { gql } from '@apollo/client';

export const GET_REDUCE_IMPACT = gql`
  query GetReduceImpact($clientId: ID!) {
    client(clientId: $clientId) {
      latestFootprint {
        total
      }
    }
    initiatives {
      items {
        uuid
        name
        objective
        onboardingLogo
      }
    }
  }
`;
