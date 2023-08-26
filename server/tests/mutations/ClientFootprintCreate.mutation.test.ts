import { gql } from 'apollo-server-express';

import { getGqlRequestPayload, gqlRequest } from '../utils';
import { app } from '../../index';
import { client1Fixture, client1UserFixture, client2UserFixture, partner1UserFixture } from '../fixtures';
import { APOLLO_FORBIDDEN_CODE } from '../../classes/errors/apollo-errors/apollo-forbidden';
import { APOLLO_UNKNOWN_CODE } from '../../classes/errors/apollo-errors/apollo-unknown';

const clientFootprintCreateMutation = gql`
  mutation ($clientId: ID!, $total: Float!) {
    clientFootprintCreate(clientId: $clientId, total: $total) {
      uuid
      total
    }
  }
`;

describe('Client Footprint Create Mutation', () => {
  it('should create a new carbon footprint and return its uuid and total', async () => {
    const variables = { clientId: client1Fixture.uuid, total: 222222.222 };
    const {
      body: {
        data: { clientFootprintCreate: response },
      },
    } = await gqlRequest(app, getGqlRequestPayload(clientFootprintCreateMutation, variables), client1UserFixture);

    expect(response.uuid).toBeDefined();
    expect(response.total).toBe(variables.total);
  });

  it('should return an error if the input is malformed', async () => {
    const variables = { clientId: client1Fixture.uuid };
    const {
      body: { errors },
    } = await gqlRequest(app, getGqlRequestPayload(clientFootprintCreateMutation, variables), client1UserFixture);

    expect(errors.length).toBe(1);
    expect(errors[0].extensions.code).toBe(APOLLO_UNKNOWN_CODE);
  });

  it('should return an error if the client user and client uuid do not match', async () => {
    const variables = { clientId: client1Fixture.uuid, total: 222222.222 };
    const {
      body: { errors },
    } = await gqlRequest(app, getGqlRequestPayload(clientFootprintCreateMutation, variables), client2UserFixture);

    expect(errors.length).toBe(1);
    expect(errors[0].extensions.code).toBe(APOLLO_FORBIDDEN_CODE);
  });

  it('should return an error if the user is a partner user', async () => {
    const variables = { clientId: client1Fixture.uuid, total: 222222.222 };
    const {
      body: { errors },
    } = await gqlRequest(app, getGqlRequestPayload(clientFootprintCreateMutation, variables), partner1UserFixture);

    expect(errors.length).toBe(1);
    expect(errors[0].extensions.code).toBe(APOLLO_FORBIDDEN_CODE);
  });
});
