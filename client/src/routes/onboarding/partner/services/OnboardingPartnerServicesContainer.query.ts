import { gql } from '@apollo/client';

export const GET_ONBOARDING_PARTNER_SERVICES = gql`
  query GetOnboardingPartnerServices {
    initiatives {
      items {
        uuid
        name
        projectTypes {
          uuid
          name
          requirementTypes {
            name
            uuid
          }
        }
      }
    }
    clientTypes {
      uuid
      name
    }
  }
`;
