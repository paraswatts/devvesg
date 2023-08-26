import { gql } from 'apollo-server-express';

import { gqlRequest, getGqlRequestPayload, mediaIsSignedTest, UNASSIGNED_UUID } from '../utils';
import { app } from '../../index';
import {
  adminUserFixture,
  client1UserFixture,
  partner1Fixture,
  partner1UserFixture,
  projectType1Fixture,
  requirementType1Fixture,
  service1Fixture,
} from '../fixtures';
import { APOLLO_AUTHENTICATION_CODE } from '../../classes/errors/apollo-errors/apollo-authentication';
import { APOLLO_NOT_FOUND_CODE } from '../../classes/errors/apollo-errors/apollo-not-found';

const fullProjectTypeQuery = gql`
  query ($projectTypeId: ID!) {
    projectType(projectTypeId: $projectTypeId) {
      uuid
      name
      objective
      logo
    }
  }
`;

const projectTypeRequirementTypesPartnersServicesQuery = gql`
  query ($projectTypeId: ID!) {
    projectType(projectTypeId: $projectTypeId) {
      requirementTypes {
        uuid
        name
        description
        partners {
          uuid
          name
          description
          logo
          contactEmail
          websiteUrl
          contactPhoneNumber
          services {
            uuid
            name
          }
        }
      }
    }
  }
`;

describe('Project Type queries', () => {
  it('should return the requested project type for a client user', async () => {
    const variables = { projectTypeId: projectType1Fixture.uuid };
    const {
      body: {
        data: { projectType },
      },
    } = await gqlRequest(app, getGqlRequestPayload(fullProjectTypeQuery, variables), client1UserFixture);

    expect(projectType.uuid).toBe(projectType1Fixture.uuid);
    expect(projectType.name).toBe(projectType1Fixture.name);
    expect(projectType.objective).toBe(projectType1Fixture.objective);
    expect(mediaIsSignedTest(projectType.logo)).toBe(true);
  });

  it('should return the requested project type for a partner user', async () => {
    const variables = { projectTypeId: projectType1Fixture.uuid };
    const {
      body: {
        data: { projectType },
      },
    } = await gqlRequest(app, getGqlRequestPayload(fullProjectTypeQuery, variables), partner1UserFixture);

    expect(projectType.uuid).toBe(projectType1Fixture.uuid);
    expect(projectType.name).toBe(projectType1Fixture.name);
    expect(projectType.objective).toBe(projectType1Fixture.objective);
    expect(mediaIsSignedTest(projectType.logo)).toBe(true);
  });

  it('should return the requested project type for an admin user', async () => {
    const variables = { projectTypeId: projectType1Fixture.uuid };
    const {
      body: {
        data: { projectType },
      },
    } = await gqlRequest(app, getGqlRequestPayload(fullProjectTypeQuery, variables), adminUserFixture);

    expect(projectType.uuid).toBe(projectType1Fixture.uuid);
    expect(projectType.name).toBe(projectType1Fixture.name);
    expect(projectType.objective).toBe(projectType1Fixture.objective);
    expect(mediaIsSignedTest(projectType.logo)).toBe(true);
  });

  it('should return an authentication error for an unauthorized request', async () => {
    const variables = { projectTypeId: projectType1Fixture.uuid };
    const {
      body: { data, errors },
    } = await gqlRequest(app, getGqlRequestPayload(fullProjectTypeQuery, variables), null);

    expect(data).toBeNull();
    expect(errors.length).toBe(1);
    expect(errors[0].extensions.code).toBe(APOLLO_AUTHENTICATION_CODE);
  });

  it('should return a not found error if the project type does not exist', async () => {
    const variables = { projectTypeId: UNASSIGNED_UUID };
    const {
      body: { data, errors },
    } = await gqlRequest(app, getGqlRequestPayload(fullProjectTypeQuery, variables), adminUserFixture);

    expect(data).toBeNull();
    expect(errors.length).toBe(1);
    expect(errors[0].extensions.code).toBe(APOLLO_NOT_FOUND_CODE);
  });

  it('should fetch requirement types, partners, and services below a project type', async () => {
    const variables = { projectTypeId: projectType1Fixture.uuid };
    const {
      body: {
        data: {
          projectType: { requirementTypes },
        },
      },
    } = await gqlRequest(
      app,
      getGqlRequestPayload(projectTypeRequirementTypesPartnersServicesQuery, variables),
      adminUserFixture,
    );

    expect(requirementTypes.length).toBe(1);
    expect(requirementTypes[0].uuid).toBe(requirementType1Fixture.uuid);
    expect(requirementTypes[0].name).toBe(requirementType1Fixture.name);
    expect(requirementTypes[0].description).toBe(requirementType1Fixture.description);

    const { partners } = requirementTypes[0];
    expect(partners.length).toBe(1);
    expect(partners[0].uuid).toBe(partner1Fixture.uuid);
    expect(partners[0].uuid).toBe(partner1Fixture.uuid);
    expect(partners[0].name).toBe(partner1Fixture.name);
    expect(partners[0].description).toBe(partner1Fixture.description);
    expect(mediaIsSignedTest(partners[0].logo)).toBe(true);
    expect(partners[0].contactEmail).toBe(partner1Fixture.contactEmail);
    expect(partners[0].websiteUrl).toBe(partner1Fixture.websiteUrl);

    const { services } = partners[0];
    expect(services.length).toBe(2);
    expect(services[0].uuid).toBe(service1Fixture.uuid);
    expect(services[0].name).toBe(service1Fixture.name);
  });
});
