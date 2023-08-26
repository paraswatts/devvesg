import { gql } from '@apollo/client';

export const GET_INITIATIVES = gql`
  query GetInitiatives {
    initiatives {
      items {
        uuid
        name
        onboardingLogo
        objective
      }
    }
  }
`;
