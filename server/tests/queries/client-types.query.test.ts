import { gql } from 'apollo-server-express';

import { app } from '../../index';
import { getGqlRequestPayload, gqlRequest } from '../utils';
import { adminUserFixture, client1UserFixture, clientType1Fixture, partner1UserFixture } from '../fixtures';

const fullClientTypesQuery = gql`
  query {
    clientTypes {
      uuid
      name
    }
  }
`;

describe('Client Type queries', () => {
  it('should return all client types for a client user', async () => {
    const {
      body: {
        data: { clientTypes },
      },
    } = await gqlRequest(app, getGqlRequestPayload(fullClientTypesQuery), client1UserFixture);
    // aside from our fixtures, 7 client types are created in a migration
    expect(clientTypes.length).toBe(10);
    expect(clientTypes).toEqual(expect.arrayContaining([clientType1Fixture]));
  });

  it('should return all client types for a partner user', async () => {
    const {
      body: {
        data: { clientTypes },
      },
    } = await gqlRequest(app, getGqlRequestPayload(fullClientTypesQuery), partner1UserFixture);
    // aside from our fixtures, 7 client types are created in a migration
    expect(clientTypes.length).toBe(10);
    expect(clientTypes).toEqual(expect.arrayContaining([clientType1Fixture]));
  });

  it('should return all client types for an admin user', async () => {
    const {
      body: {
        data: { clientTypes },
      },
    } = await gqlRequest(app, getGqlRequestPayload(fullClientTypesQuery), adminUserFixture);
    // aside from our fixtures, 7 client types are created in a migration
    expect(clientTypes.length).toBe(10);
    expect(clientTypes).toEqual(expect.arrayContaining([clientType1Fixture]));
  });

  it('should return all client types for an unauthenticated user', async () => {
    const {
      body: {
        data: { clientTypes },
      },
    } = await gqlRequest(app, getGqlRequestPayload(fullClientTypesQuery), null);
    // aside from our fixtures, 7 client types are created in a migration
    expect(clientTypes.length).toBe(10);
    expect(clientTypes).toEqual(expect.arrayContaining([clientType1Fixture]));
  });
});
