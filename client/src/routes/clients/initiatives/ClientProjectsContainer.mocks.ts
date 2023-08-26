import { graphql } from 'msw';

import { ProjectStatus, RequirementRequestStatus, RequirementStatus } from 'src/gql';
import {
  DisconnectPartner,
  DisconnectPartnerVariables,
} from 'src/routes/clients/initiatives/__gql__/DisconnectPartner';
import { GetProjects, GetProjectsVariables } from 'src/routes/clients/initiatives/__gql__/GetProjects';
import { DISCONNECT_PARTNER, GET_PROJECTS } from 'src/routes/clients/initiatives/ClientProjectsContainer.query';

export const MswDisconnectPartnerHandler = graphql.mutation<DisconnectPartner, DisconnectPartnerVariables>(
  DISCONNECT_PARTNER,
  (req, res, ctx) => {
    return res(
      ctx.data({
        requirementDisconnectPartner: { __typename: 'Requirement', uuid: req.variables.id },
      }),
    );
  },
);

export const MswGetProjects = graphql.query<GetProjects, GetProjectsVariables>(GET_PROJECTS, (req, res, ctx) => {
  return res(
    ctx.data({
      client: {
        __typename: 'Client',
        uuid: 'client-id',
        name: 'test-client',
        logo: 'https://via.placeholder.com/250',
        projects: {
          __typename: 'ProjectList',
          items: [
            {
              __typename: 'Project',
              uuid: 'project-id',
              name: 'test-project',
              description: 'description',
              status: ProjectStatus.IN_PROGRESS,
              startDate: null,
              endGoalDate: null,
              completionDate: null,
              initiative: {
                __typename: 'Initiative',
                uuid: 'initiative-id',
                onboardingLogo: 'https://via.placeholder.com/250',
                name: 'test-initiative',
              },
              requirements: [
                {
                  __typename: 'RequirementForClient',
                  uuid: 'requirement-id',
                  name: 'test-requirement',
                  status: RequirementStatus.IN_PROGRESS,
                  startDate: null,
                  endDate: null,
                  requestStatus: RequirementRequestStatus.APPROVED,
                  partner: {
                    __typename: 'PartnerInfo',
                    name: 'test-partner',
                    description: 'description',
                    logo: 'https://via.placeholder.com/250',
                    contactPhoneNumber: '1231231234',
                    twitterUrl: '',
                    facebookUrl: '',
                    linkedInUrl: '',
                    websiteUrl: 'https://devv.io',
                    contactEmail: 'test@example.com',
                    services: [],
                  },
                },
              ],
            },
          ],
        },
      },
    }),
  );
});
