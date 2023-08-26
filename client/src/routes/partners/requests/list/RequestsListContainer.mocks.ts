import { graphql } from 'msw';

import { RequirementRequestStatus, RequirementStatus } from 'src/gql';
import { GetRequests, GetRequestsVariables } from 'src/routes/partners/requests/list/__gql__/GetRequests';
import { GET_REQUESTS } from 'src/routes/partners/requests/list/RequestsListContainer.query';

export const MswGetRequestsHandler = graphql.query<GetRequests, GetRequestsVariables>(GET_REQUESTS, (req, res, ctx) => {
  return res(
    ctx.data({
      partner: {
        __typename: 'Partner',
        requirementRequests: {
          __typename: 'RequirementRequestList',
          items: [
            {
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
          ],
        },
      },
    }),
  );
});
