import { gql } from 'apollo-server-express';

import { gqlRequest, getGqlRequestPayload, UNASSIGNED_UUID } from '../utils';
import { adminUserFixture, client1UserFixture, clientType1Fixture, partner1UserFixture } from '../fixtures';
import { app } from '../../index';
import { APOLLO_NOT_FOUND_CODE } from '../../classes/errors/apollo-errors/apollo-not-found';
import { APOLLO_AUTHENTICATION_CODE } from '../../classes/errors/apollo-errors/apollo-authentication';

const fullClientTypeQuery = gql`
  query ($clientTypeId: ID!) {
    clientType(clientTypeId: $clientTypeId) {
      uuid
      name
    }
  }
`;

describe('Client Type queries', () => {
  it('should return the requested client type for a client user', async () => {
    const variables = { clientTypeId: clientType1Fixture.uuid };
    const {
      body: {
        data: { clientType },
      },
    } = await gqlRequest(app, getGqlRequestPayload(fullClientTypeQuery, variables), client1UserFixture);

    expect(clientType.uuid).toBe(clientType1Fixture.uuid);
    expect(clientType.name).toBe(clientType1Fixture.name);
  });

  it('should return the requested client type for a partner user', async () => {
    const variables = { clientTypeId: clientType1Fixture.uuid };
    const {
      body: {
        data: { clientType },
      },
    } = await gqlRequest(app, getGqlRequestPayload(fullClientTypeQuery, variables), partner1UserFixture);

    expect(clientType.uuid).toBe(clientType1Fixture.uuid);
    expect(clientType.name).toBe(clientType1Fixture.name);
  });

  it('should return the requested client type for an admin user', async () => {
    const variables = { clientTypeId: clientType1Fixture.uuid };
    const {
      body: {
        data: { clientType },
      },
    } = await gqlRequest(app, getGqlRequestPayload(fullClientTypeQuery, variables), adminUserFixture);

    expect(clientType.uuid).toBe(clientType1Fixture.uuid);
    expect(clientType.name).toBe(clientType1Fixture.name);
  });

  it('should return an error if the request is not authenticated', async () => {
    const variables = { clientTypeId: clientType1Fixture.uuid };
    const {
      body: { data, errors },
    } = await gqlRequest(app, getGqlRequestPayload(fullClientTypeQuery, variables), null);

    expect(data).toBeNull();
    expect(errors.length).toBe(1);
    expect(errors[0].extensions.code).toBe(APOLLO_AUTHENTICATION_CODE);
  });

  it('should return a not found error if the client type does not exist', async () => {
    const variables = { clientTypeId: UNASSIGNED_UUID };
    const {
      body: { data, errors },
    } = await gqlRequest(app, getGqlRequestPayload(fullClientTypeQuery, variables), client1UserFixture);

    expect(data).toBeNull();
    expect(errors.length).toBe(1);
    expect(errors[0].extensions.code).toBe(APOLLO_NOT_FOUND_CODE);
  });
});
