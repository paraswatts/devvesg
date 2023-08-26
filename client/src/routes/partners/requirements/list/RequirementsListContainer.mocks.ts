import { graphql } from 'msw';

import { RequirementRequestStatus, RequirementStatus } from 'src/gql';
import {
  GetRequirements,
  GetRequirementsVariables,
} from 'src/routes/partners/requirements/list/__gql__/GetRequirements';
import { GET_REQUIREMENTS } from 'src/routes/partners/requirements/list/RequirementsListContainer.query';

export const MswGetRequirementsHandler = graphql.query<GetRequirements, GetRequirementsVariables>(
  GET_REQUIREMENTS,
  (req, res, ctx) => {
    return res(
      ctx.data({
        partner: {
          __typename: 'Partner',
          requirements: {
            __typename: 'RequirementList',
            items: [
              {
                __typename: 'Requirement',
                uuid: 'req-1',
                name: 'Project 1',
                description: 'Description',
                requestStatus: RequirementRequestStatus.APPROVED,
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
                  client: {
                    __typename: 'ClientInfo',
                    name: 'Client 1',
                    logo: null,
                  },
                },
              },
            ],
          },
        },
      }),
    );
  },
);
