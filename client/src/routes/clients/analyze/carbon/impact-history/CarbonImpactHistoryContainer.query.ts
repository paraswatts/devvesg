import { gql } from '@apollo/client';

export const GET_CARBON_IMPACT_HISTORY = gql`
  query GetCarbonImpactHistory($clientId: ID!) {
    client(clientId: $clientId) {
      footprints {
        items {
          uuid
          total
          createdAt
        }
      }
    }
  }
`;

export const CARBON_FOOTPRINT_DELETE = gql`
  mutation CarbonFootprintDelete($clientId: ID!, $carbonFootprintId: ID!) {
    clientFootprintDelete(clientId: $clientId, carbonFootprintId: $carbonFootprintId)
  }
`;
