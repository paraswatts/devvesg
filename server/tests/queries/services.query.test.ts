import { gql } from 'apollo-server-express';

import { app } from '../../index';
import { getGqlRequestPayload, gqlRequest } from '../utils';
import { adminUserFixture, client1UserFixture, partner1UserFixture, service1Fixture } from '../fixtures';

const fullServicesQuery = gql`
  query {
    services {
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

describe('Services queries', () => {
  it('should return all services to an admin user', async () => {
    const {
      body: {
        data: { services },
      },
    } = await gqlRequest(app, getGqlRequestPayload(fullServicesQuery), adminUserFixture);

    expect(services.items.length).toBe(4);
    expect(services.items[0].uuid).toBe(service1Fixture.uuid);
    expect(services.items[0].name).toBe(service1Fixture.name);
    expect(services.pageInfo.totalCount).toBe(4);
  });

  it('should return all services to a client user', async () => {
    const {
      body: {
        data: { services },
      },
    } = await gqlRequest(app, getGqlRequestPayload(fullServicesQuery), client1UserFixture);

    expect(services.items.length).toBe(4);
    expect(services.items[0].uuid).toBe(service1Fixture.uuid);
    expect(services.items[0].name).toBe(service1Fixture.name);
    expect(services.pageInfo.totalCount).toBe(4);
  });

  it('should return all services to a partner user', async () => {
    const {
      body: {
        data: { services },
      },
    } = await gqlRequest(app, getGqlRequestPayload(fullServicesQuery), partner1UserFixture);

    expect(services.items.length).toBe(4);
    expect(services.items[0].uuid).toBe(service1Fixture.uuid);
    expect(services.items[0].name).toBe(service1Fixture.name);
    expect(services.pageInfo.totalCount).toBe(4);
  });

  it('should return all services to an unauthenticated user', async () => {
    const {
      body: {
        data: { services },
      },
    } = await gqlRequest(app, getGqlRequestPayload(fullServicesQuery), null);

    expect(services.items.length).toBe(4);
    expect(services.items[0].uuid).toBe(service1Fixture.uuid);
    expect(services.items[0].name).toBe(service1Fixture.name);
    expect(services.pageInfo.totalCount).toBe(4);
  });
});
