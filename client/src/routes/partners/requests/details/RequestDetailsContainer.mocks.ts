import { graphql } from 'msw';

import { RequirementRequestStatus, RequirementStatus } from 'src/gql';
import { GetRequest, GetRequestVariables } from 'src/routes/partners/requests/details/__gql__/GetRequest';
import { GET_REQUEST } from 'src/routes/partners/requests/details/RequestDetailsContainer.query';

export const MswGetRequestHandler = graphql.query<GetRequest, GetRequestVariables>(GET_REQUEST, (req, res, ctx) => {
  return res(
    ctx.data({
      partner: {
        __typename: 'Partner',
        requirementRequest: {
          __typename: 'RequirementRequest',
          uuid: 'req-1',
          name: 'Project 1',
          description: 'Description',
          requestStatus: RequirementRequestStatus.PENDING,
          status: RequirementStatus.NOT_STARTED,
          endDate: null,
          startDate: new Date(2000, 0, 1),
          requirementType: {
            __typename: 'RequirementType',
            name: 'Requirement Type 1',
          },
          project: {
            __typename: 'ProjectForPartner',
            name: 'Project 1',
            initiative: {
              __typename: 'Initiative',
              name: 'Initiative 1',
            },
            projectType: {
              __typename: 'ProjectType',
              name: 'Project Type 1',
            },
          },
        },
      },
    }),
  );
});
