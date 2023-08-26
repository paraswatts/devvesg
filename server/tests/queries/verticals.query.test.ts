import { gql } from 'apollo-server-express';

import { app } from '../../index';
import { getGqlRequestPayload, gqlRequest } from '../utils';
import { adminUserFixture, client1UserFixture, partner1UserFixture, vertical1Fixture } from '../fixtures';

const fullVerticalsQuery = gql`
  query {
    verticals {
      items {
        uuid
        name
      }
      pageInfo {
        page
        pageSize
        totalCount
      }
    }
  }
`;

describe('Verticals queries', () => {
  it('should return all verticals to an admin user', async () => {
    const {
      body: {
        data: { verticals },
      },
    } = await gqlRequest(app, getGqlRequestPayload(fullVerticalsQuery), adminUserFixture);

    expect(verticals.items.length).toBe(5);
    expect(verticals.items[0].uuid).toBe(vertical1Fixture.uuid);
    expect(verticals.items[0].name).toBe(vertical1Fixture.name);
    expect(verticals.pageInfo.totalCount).toBe(5);
  });

  it('should return all verticals to a client user', async () => {
    const {
      body: {
        data: { verticals },
      },
    } = await gqlRequest(app, getGqlRequestPayload(fullVerticalsQuery), client1UserFixture);

    expect(verticals.items.length).toBe(5);
    expect(verticals.items[0].uuid).toBe(vertical1Fixture.uuid);
    expect(verticals.items[0].name).toBe(vertical1Fixture.name);
    expect(verticals.pageInfo.totalCount).toBe(5);
  });

  it('should return all verticals to a partner user', async () => {
    const {
      body: {
        data: { verticals },
      },
    } = await gqlRequest(app, getGqlRequestPayload(fullVerticalsQuery), partner1UserFixture);

    expect(verticals.items.length).toBe(5);
    expect(verticals.items[0].uuid).toBe(vertical1Fixture.uuid);
    expect(verticals.items[0].name).toBe(vertical1Fixture.name);
    expect(verticals.pageInfo.totalCount).toBe(5);
  });

  it('should return all verticals to an unauthenticated user', async () => {
    const {
      body: {
        data: { verticals },
      },
    } = await gqlRequest(app, getGqlRequestPayload(fullVerticalsQuery), null);

    expect(verticals.items.length).toBe(5);
    expect(verticals.items[0].uuid).toBe(vertical1Fixture.uuid);
    expect(verticals.items[0].name).toBe(vertical1Fixture.name);
    expect(verticals.pageInfo.totalCount).toBe(5);
  });
});
