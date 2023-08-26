import { gql } from '@apollo/client';

export const GET_CLIENT_WITH_REPORTS = gql`
  query GetClientWithReports($clientId: ID!) {
    client(clientId: $clientId) {
      name
      report1
      report2
      stockTicker
    }
  }
`;
