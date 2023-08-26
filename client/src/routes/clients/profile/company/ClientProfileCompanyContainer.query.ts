import { gql } from '@apollo/client';

export const CLIENT_PROFILE_COMPANY_QUERY = gql`
  query ClientProfileCompanyQuery($clientId: ID!) {
    client(clientId: $clientId) {
      uuid
      name
      description
      logo
      contactEmail
      websiteUrl
      contactPhoneNumber
      twitterUrl
      linkedInUrl
      clientType {
        uuid
        name
      }
      vertical {
        uuid
        name
      }
      locations {
        country
        province
      }
    }
  }
`;
