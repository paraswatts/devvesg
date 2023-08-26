import { gql } from '@apollo/client';

export const CLIENT_FOOTPRINT_CREATE = gql`
  mutation ClientFootprintCreate($clientId: ID!, $total: Float!) {
    clientFootprintCreate(clientId: $clientId, total: $total) {
      total
      createdAt
    }
  }
`;
