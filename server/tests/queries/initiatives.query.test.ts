import { gql } from 'apollo-server-express';

import { gqlRequest, getGqlRequestPayload, mediaIsSignedTest } from '../utils';
import { app } from '../../index';
import { adminUserFixture, client1UserFixture, partner1UserFixture, initiative1Fixture } from '../fixtures';

const fullInitiativesQuery = gql`
  query {
    initiatives {
      items {
        uuid
        name
        objective
        logo
        onboardingLogo
      }
      pageInfo {
        totalCount
        page
        pageSize
      }
    }
  }
`;

describe('Initiatives queries', () => {
  it('should return all initiatives to an admin user', async () => {
    const {
      body: {
        data: { initiatives },
      },
    } = await gqlRequest(app, getGqlRequestPayload(fullInitiativesQuery), adminUserFixture);

    expect(initiatives.items.length).toBe(4);
    expect(initiatives.items[0].uuid).toBe(initiative1Fixture.uuid);
    expect(initiatives.items[0].name).toBe(initiative1Fixture.name);
    expect(initiatives.items[0].objective).toBe(initiative1Fixture.objective);
    expect(mediaIsSignedTest(initiatives.items[0].logo)).toBe(true);
    expect(mediaIsSignedTest(initiatives.items[0].onboardingLogo)).toBe(true);
    expect(initiatives.pageInfo.totalCount).toBe(4);
  });

  it('should return all initiatives to a client user', async () => {
    const {
      body: {
        data: { initiatives },
      },
    } = await gqlRequest(app, getGqlRequestPayload(fullInitiativesQuery), client1UserFixture);

    expect(initiatives.items.length).toBe(4);
    expect(initiatives.items[0].uuid).toBe(initiative1Fixture.uuid);
    expect(initiatives.items[0].name).toBe(initiative1Fixture.name);
    expect(initiatives.items[0].objective).toBe(initiative1Fixture.objective);
    expect(mediaIsSignedTest(initiatives.items[0].logo)).toBe(true);
    expect(mediaIsSignedTest(initiatives.items[0].onboardingLogo)).toBe(true);
    expect(initiatives.pageInfo.totalCount).toBe(4);
  });

  it('should return all initiatives to a partner user', async () => {
    const {
      body: {
        data: { initiatives },
      },
    } = await gqlRequest(app, getGqlRequestPayload(fullInitiativesQuery), partner1UserFixture);

    expect(initiatives.items.length).toBe(4);
    expect(initiatives.items[0].uuid).toBe(initiative1Fixture.uuid);
    expect(initiatives.items[0].name).toBe(initiative1Fixture.name);
    expect(initiatives.items[0].objective).toBe(initiative1Fixture.objective);
    expect(mediaIsSignedTest(initiatives.items[0].logo)).toBe(true);
    expect(mediaIsSignedTest(initiatives.items[0].onboardingLogo)).toBe(true);
    expect(initiatives.pageInfo.totalCount).toBe(4);
  });

  it('should return all initiatives to an unauthenticated user', async () => {
    const {
      body: {
        data: { initiatives },
      },
    } = await gqlRequest(app, getGqlRequestPayload(fullInitiativesQuery), null);

    expect(initiatives.items.length).toBe(4);
    expect(initiatives.items[0].uuid).toBe(initiative1Fixture.uuid);
    expect(initiatives.items[0].name).toBe(initiative1Fixture.name);
    expect(initiatives.items[0].objective).toBe(initiative1Fixture.objective);
    expect(mediaIsSignedTest(initiatives.items[0].logo)).toBe(true);
    expect(mediaIsSignedTest(initiatives.items[0].onboardingLogo)).toBe(true);
    expect(initiatives.pageInfo.totalCount).toBe(4);
  });
});
