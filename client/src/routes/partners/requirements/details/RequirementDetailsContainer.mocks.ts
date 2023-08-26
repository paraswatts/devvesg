import { graphql } from 'msw';

import { RequirementRequestStatus, RequirementStatus } from 'src/gql';
import {
  GetRequirement,
  GetRequirementVariables,
} from 'src/routes/partners/requirements/details/__gql__/GetRequirement';
import { GET_REQUIREMENT } from 'src/routes/partners/requirements/details/RequirementDetailsContainer.query';

export const MswGetRequirementHandler = graphql.query<GetRequirement, GetRequirementVariables>(
  GET_REQUIREMENT,
  (req, res, ctx) => {
    return res(
      ctx.data({
        partner: {
          __typename: 'Partner',
          requirement: {
            __typename: 'Requirement',
            uuid: 'req-1',
            name: 'Project 1',
            description: 'Description',
            requestStatus: RequirementRequestStatus.APPROVED,
            status: RequirementStatus.NOT_STARTED,
            startDate: new Date(2000, 0, 1),
            endDate: new Date(2000, 1, 1),
            requirementType: {
              __typename: 'RequirementType',
              name: 'Requirement Type 1',
            },
            project: {
              __typename: 'ProjectForPartner',
              uuid: 'proj-1',
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
                uuid: 'client-1',
                name: 'Client 1',
                logo: null,
                contactEmail: 'client@client.com',
                contactPhoneNumber: '5555555555',
                linkedInUrl: 'https://linkedin.com',
                twitterUrl: 'https://twitter.com',
                websiteUrl: 'https://client.com',
              },
            },
          },
        },
      }),
    );
  },
);
