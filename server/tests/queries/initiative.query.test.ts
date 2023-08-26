import { gql } from 'apollo-server-express';

import { gqlRequest, getGqlRequestPayload, mediaIsSignedTest } from '../utils';
import { app } from '../../index';
import {
  adminUserFixture,
  client1UserFixture,
  initiative1Fixture,
  partner1Fixture,
  partner1UserFixture,
  projectType1Fixture,
  requirementType1Fixture,
  service1Fixture,
} from '../fixtures';
import { APOLLO_AUTHENTICATION_CODE } from '../../classes/errors/apollo-errors/apollo-authentication';

const fullInitiativeQuery = gql`
  query ($initiativeId: ID!) {
    initiative(initiativeId: $initiativeId) {
      uuid
      name
      objective
      onboardingLogo
      logo
    }
  }
`;

const initiativeProjectTypeRequirementTypesPartnerServicesQuery = gql`
  query ($initiativeId: ID!) {
    initiative(initiativeId: $initiativeId) {
      projectTypes {
        uuid
        name
        objective
        logo
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
  }
`;

describe('Initiative queries', () => {
  it('should return the requested initiative for a client user', async () => {
    const variables = { initiativeId: initiative1Fixture.uuid };
    const {
      body: {
        data: { initiative },
      },
    } = await gqlRequest(app, getGqlRequestPayload(fullInitiativeQuery, variables), client1UserFixture);

    expect(initiative.uuid).toBe(initiative1Fixture.uuid);
    expect(initiative.name).toBe(initiative1Fixture.name);
    expect(initiative.objective).toBe(initiative1Fixture.objective);
    expect(mediaIsSignedTest(initiative.logo)).toBe(true);
    expect(mediaIsSignedTest(initiative.onboardingLogo)).toBe(true);
  });

  it('should return the requested initiative for a partner user', async () => {
    const variables = { initiativeId: initiative1Fixture.uuid };
    const {
      body: {
        data: { initiative },
      },
    } = await gqlRequest(app, getGqlRequestPayload(fullInitiativeQuery, variables), partner1UserFixture);

    expect(initiative.uuid).toBe(initiative1Fixture.uuid);
    expect(initiative.name).toBe(initiative1Fixture.name);
    expect(initiative.objective).toBe(initiative1Fixture.objective);
    expect(mediaIsSignedTest(initiative.logo)).toBe(true);
    expect(mediaIsSignedTest(initiative.onboardingLogo)).toBe(true);
  });

  it('should return the requested initiative for an admin user', async () => {
    const variables = { initiativeId: initiative1Fixture.uuid };
    const {
      body: {
        data: { initiative },
      },
    } = await gqlRequest(app, getGqlRequestPayload(fullInitiativeQuery, variables), adminUserFixture);

    expect(initiative.uuid).toBe(initiative1Fixture.uuid);
    expect(initiative.name).toBe(initiative1Fixture.name);
    expect(initiative.objective).toBe(initiative1Fixture.objective);
    expect(mediaIsSignedTest(initiative.logo)).toBe(true);
    expect(mediaIsSignedTest(initiative.onboardingLogo)).toBe(true);
  });

  it('should return an authentication error for an unauthorized request', async () => {
    const variables = { initiativeId: initiative1Fixture.uuid };
    const {
      body: { data, errors },
    } = await gqlRequest(app, getGqlRequestPayload(fullInitiativeQuery, variables), null);

    expect(data).toBeNull();
    expect(errors.length).toBe(1);
    expect(errors[0].extensions.code).toBe(APOLLO_AUTHENTICATION_CODE);
  });

  it('should fetch project types, requirement types, partners, and services below an initiative', async () => {
    const variables = { initiativeId: initiative1Fixture.uuid };
    const {
      body: {
        data: {
          initiative: { projectTypes },
        },
      },
    } = await gqlRequest(
      app,
      getGqlRequestPayload(initiativeProjectTypeRequirementTypesPartnerServicesQuery, variables),
      adminUserFixture,
    );

    expect(projectTypes.length).toBe(1);
    expect(projectTypes[0].uuid).toBe(projectType1Fixture.uuid);
    expect(projectTypes[0].name).toBe(projectType1Fixture.name);
    expect(projectTypes[0].objective).toBe(projectType1Fixture.objective);
    expect(mediaIsSignedTest(projectTypes[0].logo)).toBe(true);

    const { requirementTypes } = projectTypes[0];
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
