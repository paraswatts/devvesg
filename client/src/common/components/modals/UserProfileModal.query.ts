import { gql } from '@apollo/client';

export const USER_DEACTIVATE = gql`
  mutation UserDeactivate($id: ID!) {
    userDeactivate(id: $id)
  }
`;
