import { gql } from 'apollo-server-express';

import { app } from '../../index';
import {
  adminUserFixture,
  carbonFootprint1Fixture,
  carbonFootprint2Fixture,
  client1Fixture,
  client1UserFixture,
  client2Fixture,
  client2UserFixture,
  clientLocation1Fixture,
  clientType1Fixture,
  initiative1Fixture,
  initiative3Fixture,
  partner1Fixture,
  partner1UserFixture,
  project1Fixture,
  project3Fixture,
  projectType1Fixture,
  projectType3Fixture,
  requirement1Fixture,
  requirementDocument1Fixture,
  requirementDocument3Fixture,
  requirementType1Fixture,
  vertical1Fixture,
} from '../fixtures';
import { getGqlRequestPayload, gqlRequest, mediaIsSignedTest, UNASSIGNED_UUID } from '../utils';
import { APOLLO_FORBIDDEN_CODE } from '../../classes/errors/apollo-errors/apollo-forbidden';
import { APOLLO_AUTHENTICATION_CODE } from '../../classes/errors/apollo-errors/apollo-authentication';
import { APOLLO_NOT_FOUND_CODE } from '../../classes/errors/apollo-errors/apollo-not-found';

const fullClientQuery = gql`
  query ($clientId: ID!) {
    client(clientId: $clientId) {
      uuid
      name
      description
      logo
      contactEmail
      websiteUrl
      contactPhoneNumber
      twitterUrl
      linkedInUrl
      stockTicker
      report1
      report2
      clientType {
        uuid
        name
      }
      vertical {
        uuid
        name
      }
    }
  }
`;

const partialClientQuery = gql`
  query ($clientId: ID!) {
    client(clientId: $clientId) {
      uuid
      name
    }
  }
`;

const clientProjectRequirementQuery = gql`
  query ($clientId: ID!, $projectId: ID!, $requirementId: ID!) {
    client(clientId: $clientId) {
      uuid
      project(projectId: $projectId) {
        uuid
        name
        description
        status
        startDate
        endGoalDate
        completionDate
        requirement(requirementId: $requirementId) {
          uuid
          name
          description
          startDate
          endDate
          status
        }
      }
    }
  }
`;

const clientProjectRequirementsPartnerQuery = gql`
  query ($clientId: ID!, $projectId: ID!) {
    client(clientId: $clientId) {
      project(projectId: $projectId) {
        requirements {
          uuid
          partner {
            uuid
            name
            description
            logo
            contactEmail
            contactPhoneNumber
            websiteUrl
          }
        }
      }
    }
  }
`;

const clientClientLocationsQuery = gql`
  query ($clientId: ID!) {
    client(clientId: $clientId) {
      locations {
        country
        province
      }
    }
  }
`;

const clientProjectRequirementsRequirementTypeQuery = gql`
  query ($clientId: ID!, $projectId: ID!) {
    client(clientId: $clientId) {
      project(projectId: $projectId) {
        requirements {
          uuid
          requirementType {
            uuid
            name
            description
          }
        }
      }
    }
  }
`;

const clientProjectRequirementsDocumentsQuery = gql`
  query ($clientId: ID!, $projectId: ID!) {
    client(clientId: $clientId) {
      project(projectId: $projectId) {
        requirements {
          documents {
            uuid
            name
            type
            file
          }
        }
      }
    }
  }
`;

const clientProjectsProjectTypeQuery = gql`
  query ($clientId: ID!) {
    client(clientId: $clientId) {
      projects {
        items {
          uuid
          name
          description
          status
          startDate
          endGoalDate
          completionDate
          projectType {
            uuid
            name
            objective
            logo
          }
        }
        pageInfo {
          totalCount
        }
      }
    }
  }
`;
const clientProjectsInitiativeQuery = gql`
  query ($clientId: ID!) {
    client(clientId: $clientId) {
      projects {
        items {
          uuid
          initiative {
            uuid
            name
            objective
            logo
            onboardingLogo
          }
        }
      }
    }
  }
`;

const clientCarbonFootprintsQuery = gql`
  query ($clientId: ID!) {
    client(clientId: $clientId) {
      latestFootprint {
        uuid
        total
        createdAt
      }
      footprints {
        items {
          uuid
          total
          createdAt
        }
        pageInfo {
          page
          totalCount
          pageSize
        }
      }
    }
  }
`;

describe('Client queries', () => {
  it('should return requested client', async () => {
    const variables = { clientId: client1Fixture.uuid };
    const {
      body: {
        data: { client },
      },
    } = await gqlRequest(app, getGqlRequestPayload(fullClientQuery, variables), client1UserFixture);
    expect(client.uuid).toBe(client1Fixture.uuid);
    expect(client.name).toBe(client1Fixture.name);
    expect(client.description).toBe(client1Fixture.description);
    // Check that logo is signed
    expect(mediaIsSignedTest(client.logo)).toBe(true);
    expect(mediaIsSignedTest(client.report1)).toBe(true);
    expect(mediaIsSignedTest(client.report2)).toBe(true);
    expect(client.contactEmail).toBe(client1Fixture.contactEmail);
    expect(client.websiteUrl).toBe(client1Fixture.websiteUrl);
    expect(client.contactPhoneNumber).toBe(client1Fixture.contactPhoneNumber);
    expect(client.twitterUrl).toBe(client1Fixture.twitterUrl);
    expect(client.linkedInUrl).toBe(client1Fixture.linkedInUrl);
    expect(client.stockTicker).toBe(client1Fixture.stockTicker);
    expect(client.vertical.uuid).toBe(vertical1Fixture.uuid);
    expect(client.vertical.name).toBe(vertical1Fixture.name);
    expect(client.clientType.uuid).toBe(clientType1Fixture.uuid);
    expect(client.clientType.name).toBe(clientType1Fixture.name);
  });

  it('should allow admin users to access a client', async () => {
    const variables = { clientId: client1Fixture.uuid };
    const {
      body: {
        data: { client },
      },
    } = await gqlRequest(app, getGqlRequestPayload(partialClientQuery, variables), adminUserFixture);
    expect(client.uuid).toBe(client1Fixture.uuid);
    expect(client.name).toBe(client1Fixture.name);
  });

  it('should return an error if the user is not a client user', async () => {
    const variables = { clientId: client1Fixture.uuid };
    const {
      body: { data, errors },
    } = await gqlRequest(app, getGqlRequestPayload(partialClientQuery, variables), partner1UserFixture);
    expect(data).toBeNull();
    expect(errors.length).toBe(1);
    expect(errors[0].extensions.code).toBe(APOLLO_FORBIDDEN_CODE);
  });

  it('should return an error if the user is a client user of a different client', async () => {
    const variables = { clientId: client1Fixture.uuid };
    const {
      body: { data, errors },
    } = await gqlRequest(app, getGqlRequestPayload(partialClientQuery, variables), client2UserFixture);
    expect(data).toBeNull();
    expect(errors.length).toBe(1);
    expect(errors[0].extensions.code).toBe(APOLLO_FORBIDDEN_CODE);
  });

  it('should return an error if the user is not logged in', async () => {
    const variables = { clientId: client1Fixture.uuid };
    const {
      body: { data, errors },
    } = await gqlRequest(app, getGqlRequestPayload(partialClientQuery, variables), null);
    expect(data).toBeNull();
    expect(errors.length).toBe(1);
    expect(errors[0].extensions.code).toBe(APOLLO_AUTHENTICATION_CODE);
  });

  it('should fetch project and requirement under a client', async () => {
    const variables = {
      clientId: client1Fixture.uuid,
      projectId: project1Fixture.uuid,
      requirementId: requirement1Fixture.uuid,
    };
    const {
      body: {
        data: { client },
      },
    } = await gqlRequest(app, getGqlRequestPayload(clientProjectRequirementQuery, variables), client1UserFixture);

    expect(client.uuid).toBe(client1Fixture.uuid);

    const { project } = client;
    expect(project.uuid).toBe(project1Fixture.uuid);
    expect(project.name).toBe(project1Fixture.name);
    expect(project.description).toBe(project1Fixture.description);
    expect(project.status).toBe('ON_HOLD');
    expect(project.startDate).toBe(project1Fixture.startDate.toISOString());
    expect(project.endGoalDate).toBe(project1Fixture.endGoalDate.toISOString());
    expect(project.completionDate).toBe(project1Fixture.completionDate.toISOString());

    const { requirement } = project;
    expect(requirement.uuid).toBe(requirement1Fixture.uuid);
    expect(requirement.name).toBe(requirement1Fixture.name);
    expect(requirement.description).toBe(requirement1Fixture.description);
    expect(requirement.status).toBe('DONE');
    expect(requirement.startDate).toBe(requirement1Fixture.startDate.toISOString());
    expect(requirement.endDate).toBe(requirement1Fixture.endDate.toISOString());
  });

  it('should return an error if the project does not exist', async () => {
    const variables = {
      clientId: client1Fixture.uuid,
      projectId: UNASSIGNED_UUID,
      requirementId: requirement1Fixture.uuid,
    };
    const {
      body: { data, errors },
    } = await gqlRequest(app, getGqlRequestPayload(clientProjectRequirementQuery, variables), client1UserFixture);

    expect(data).toBeNull();
    expect(errors.length).toBe(1);
    expect(errors[0].extensions.code).toBe(APOLLO_NOT_FOUND_CODE);
  });

  it('should return null if the requirement does not exist', async () => {
    const variables = {
      clientId: client1Fixture.uuid,
      projectId: project1Fixture.uuid,
      requirementId: UNASSIGNED_UUID,
    };
    const {
      body: {
        data: { client },
      },
    } = await gqlRequest(app, getGqlRequestPayload(clientProjectRequirementQuery, variables), client1UserFixture);

    const {
      project: { requirement },
    } = client;

    expect(requirement).toBeNull();
  });

  it('should fetch all project requirements and their requirement type under a client', async () => {
    const variables = {
      clientId: client1Fixture.uuid,
      projectId: project1Fixture.uuid,
    };
    const {
      body: {
        data: { client },
      },
    } = await gqlRequest(
      app,
      getGqlRequestPayload(clientProjectRequirementsRequirementTypeQuery, variables),
      client1UserFixture,
    );

    const {
      project: { requirements },
    } = client;
    expect(requirements.length).toBe(2);
    expect(requirements[0].uuid).toBe(requirement1Fixture.uuid);
    expect(requirements[0].requirementType.uuid).toBe(requirementType1Fixture.uuid);
    expect(requirements[0].requirementType.name).toBe(requirementType1Fixture.name);
    expect(requirements[0].requirementType.description).toBe(requirementType1Fixture.description);
  });

  it('should return locations under a client', async () => {
    const variables = { clientId: client1Fixture.uuid };
    const {
      body: {
        data: {
          client: { locations },
        },
      },
    } = await gqlRequest(app, getGqlRequestPayload(clientClientLocationsQuery, variables), client1UserFixture);
    expect(locations.length).toBe(1);
    expect(locations[0].country).toBe(clientLocation1Fixture.country);
    expect(locations[0].province).toBe(clientLocation1Fixture.province);
  });

  it('should return documents when getting all requirements for a project under a top level client', async () => {
    const variables = {
      clientId: client1Fixture.uuid,
      projectId: project1Fixture.uuid,
    };
    const {
      body: {
        data: {
          client: {
            project: { requirements },
          },
        },
      },
    } = await gqlRequest(
      app,
      getGqlRequestPayload(clientProjectRequirementsDocumentsQuery, variables),
      client1UserFixture,
    );

    expect(requirements.length).toBe(2);
    expect(requirements[0].documents.length).toBe(2);

    const { documents } = requirements[0];
    expect(documents[0].uuid).toBe(requirementDocument1Fixture.uuid);
    expect(documents[0].name).toBe(requirementDocument1Fixture.name);
    expect(documents[0].type).toBe('FILE');
    expect(mediaIsSignedTest(documents[0].file)).toBe(true);

    expect(documents[1].uuid).toBe(requirementDocument3Fixture.uuid);
    expect(documents[1].name).toBe(requirementDocument3Fixture.name);
    expect(documents[1].type).toBe('URL');
    expect(mediaIsSignedTest(documents[1].file)).toBe(true);
  });

  it('should return projects and their project type under a client', async () => {
    const variables = { clientId: client1Fixture.uuid };
    const {
      body: {
        data: {
          client: {
            projects: {
              pageInfo: { totalCount },
              items: projects,
            },
          },
        },
      },
    } = await gqlRequest(app, getGqlRequestPayload(clientProjectsProjectTypeQuery, variables), client1UserFixture);

    expect(totalCount).toBe(2);
    expect(projects.length).toBe(2);
    expect(projects[0].uuid).toBe(project1Fixture.uuid);
    expect(projects[0].name).toBe(project1Fixture.name);
    expect(projects[0].description).toBe(project1Fixture.description);
    expect(projects[0].status).toBe('ON_HOLD');
    expect(projects[0].startDate).toBe(project1Fixture.startDate.toISOString());
    expect(projects[0].endGoalDate).toBe(project1Fixture.endGoalDate.toISOString());
    expect(projects[0].completionDate).toBe(project1Fixture.completionDate.toISOString());
    expect(projects[1].uuid).toBe(project3Fixture.uuid);
    expect(projects[0].projectType.uuid).toBe(projectType1Fixture.uuid);
    expect(projects[0].projectType.name).toBe(projectType1Fixture.name);
    expect(projects[0].projectType.objective).toBe(projectType1Fixture.objective);
    expect(mediaIsSignedTest(projects[0].projectType.logo)).toBe(true);
    expect(projects[1].projectType.uuid).toBe(projectType3Fixture.uuid);
    expect(projects[1].projectType.name).toBe(projectType3Fixture.name);
    expect(projects[1].projectType.objective).toBe(projectType3Fixture.objective);
    expect(mediaIsSignedTest(projects[1].projectType.logo)).toBe(true);
  });

  it('should return projects and their initiative under a client', async () => {
    const variables = { clientId: client1Fixture.uuid };
    const {
      body: {
        data: {
          client: {
            projects: { items: projects },
          },
        },
      },
    } = await gqlRequest(app, getGqlRequestPayload(clientProjectsInitiativeQuery, variables), client1UserFixture);
    expect(projects[0].initiative.uuid).toBe(initiative1Fixture.uuid);
    expect(projects[0].initiative.name).toBe(initiative1Fixture.name);
    expect(projects[0].initiative.objective).toBe(initiative1Fixture.objective);
    expect(mediaIsSignedTest(projects[0].initiative.logo)).toBe(true);
    expect(mediaIsSignedTest(projects[0].initiative.onboardingLogo)).toBe(true);
    expect(projects[1].initiative.uuid).toBe(initiative3Fixture.uuid);
    expect(projects[1].initiative.name).toBe(initiative3Fixture.name);
    expect(projects[1].initiative.objective).toBe(initiative3Fixture.objective);
    expect(mediaIsSignedTest(projects[1].initiative.logo)).toBe(true);
    expect(mediaIsSignedTest(projects[1].initiative.onboardingLogo)).toBe(true);
  });

  it('should return a partner within the requirements list under client', async () => {
    const variables = {
      clientId: client1Fixture.uuid,
      projectId: project1Fixture.uuid,
    };
    const {
      body: {
        data: { client },
      },
    } = await gqlRequest(
      app,
      getGqlRequestPayload(clientProjectRequirementsPartnerQuery, variables),
      client1UserFixture,
    );

    const {
      project: { requirements },
    } = client;

    expect(requirements.length).toBe(2);

    const { partner } = requirements[0];
    expect(partner.uuid).toBe(partner1Fixture.uuid);
    expect(partner.name).toBe(partner1Fixture.name);
    expect(partner.description).toBe(partner1Fixture.description);
    expect(mediaIsSignedTest(partner.logo)).toBe(true);
    expect(partner.contactEmail).toBe(partner1Fixture.contactEmail);
    expect(partner.contactPhoneNumber).toBe(partner1Fixture.contactPhoneNumber);
    expect(partner.websiteUrl).toBe(partner1Fixture.websiteUrl);
  });

  it('should return footprint data under a client', async () => {
    const variables = {
      clientId: client1Fixture.uuid,
    };
    const {
      body: {
        data: {
          client: {
            latestFootprint,
            footprints: { items },
          },
        },
      },
    } = await gqlRequest(app, getGqlRequestPayload(clientCarbonFootprintsQuery, variables), client1UserFixture);

    expect(latestFootprint.uuid).toBe(carbonFootprint1Fixture.uuid);
    expect(latestFootprint.total).toBe(carbonFootprint1Fixture.total);
    expect(latestFootprint.createdAt).toBe(carbonFootprint1Fixture.createdAt.toISOString());

    expect(items[0].uuid).toBe(carbonFootprint1Fixture.uuid);
    expect(items[0].total).toBe(carbonFootprint1Fixture.total);
    expect(items[0].createdAt).toBe(carbonFootprint1Fixture.createdAt.toISOString());

    expect(items[items.length - 1].uuid).toBe(carbonFootprint2Fixture.uuid);
    expect(items[items.length - 1].total).toBe(carbonFootprint2Fixture.total);
    expect(items[items.length - 1].createdAt).toBe(carbonFootprint2Fixture.createdAt.toISOString());
  });

  it('should return empty footprint data under a client if they have no footprints', async () => {
    const variables = {
      clientId: client2Fixture.uuid,
    };
    const {
      body: {
        data: {
          client: {
            latestFootprint,
            footprints: { items, pageInfo },
          },
        },
      },
    } = await gqlRequest(app, getGqlRequestPayload(clientCarbonFootprintsQuery, variables), client2UserFixture);

    expect(latestFootprint).toBe(null);

    expect(items.length).toBe(0);
    expect(pageInfo.totalCount).toBe(0);
  });
});
