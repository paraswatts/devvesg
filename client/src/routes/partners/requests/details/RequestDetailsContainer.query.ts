import { gql } from '@apollo/client';

export const GET_REQUEST = gql`
  query GetRequest($partnerId: ID!, $requirementRequestId: ID!) {
    partner(partnerId: $partnerId) {
      requirementRequest(requirementRequestId: $requirementRequestId) {
        uuid
        name
        description
        startDate
        endDate
        status
        requestStatus
        requirementType {
          name
        }
        project {
          name
          projectType {
            name
          }
          initiative {
            name
          }
        }
      }
    }
  }
`;

export const REQUEST_STATUS_CHANGE = gql`
  mutation RequirementRequestStatusChange($requirementRequestId: ID!, $requestStatus: RequirementRequestStatus!) {
    requirementRequestStatusChange(id: $requirementRequestId, requestStatus: $requestStatus) {
      uuid
      requestStatus
    }
  }
`;
