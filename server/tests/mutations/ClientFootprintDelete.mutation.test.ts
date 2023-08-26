import { gql } from 'apollo-server-express';

import { getGqlRequestPayload, gqlRequest, UNASSIGNED_UUID } from '../utils';
import { app } from '../../index';
import {
  carbonFootprint1Fixture,
  carbonFootprint3Fixture,
  client1Fixture,
  client1UserFixture,
  client2UserFixture,
  partner1UserFixture,
} from '../fixtures';
import { APOLLO_FORBIDDEN_CODE } from '../../classes/errors/apollo-errors/apollo-forbidden';
import { APOLLO_NOT_FOUND_CODE } from '../../classes/errors/apollo-errors/apollo-not-found';
import { APOLLO_UNKNOWN_CODE } from '../../classes/errors/apollo-errors/apollo-unknown';

const clientFootprintDeleteMutation = gql`
  mutation ($carbonFootprintId: ID!, $clientId: ID!) {
    clientFootprintDelete(carbonFootprintId: $carbonFootprintId, clientId: $clientId)
  }
`;

describe('Client Footprint Delete Mutation', () => {
  it('should delete a client carbon footprint and return its uuid', async () => {
    const variables = { clientId: client1Fixture.uuid, carbonFootprintId: carbonFootprint3Fixture.uuid };
    const {
      body: {
        data: { clientFootprintDelete: uuid },
      },
    } = await gqlRequest(app, getGqlRequestPayload(clientFootprintDeleteMutation, variables), client1UserFixture);

    expect(uuid).toBe(carbonFootprint3Fixture.uuid);
  });

  it('should return an error if the input is malformed', async () => {
    const variables = { clientId: client1Fixture.uuid };
    const {
      body: { errors },
    } = await gqlRequest(app, getGqlRequestPayload(clientFootprintDeleteMutation, variables), client2UserFixture);

    expect(errors.length).toBe(1);
    expect(errors[0].extensions.code).toBe(APOLLO_UNKNOWN_CODE);
  });

  it('should return an error if the footprint does not exist', async () => {
    const variables = { clientId: client1Fixture.uuid, carbonFootprintId: UNASSIGNED_UUID };
    const {
      body: { errors },
    } = await gqlRequest(app, getGqlRequestPayload(clientFootprintDeleteMutation, variables), client1UserFixture);

    expect(errors.length).toBe(1);
    expect(errors[0].extensions.code).toBe(APOLLO_NOT_FOUND_CODE);
  });

  it('should return an error if the current user is a partner user', async () => {
    const variables = { clientId: client1Fixture.uuid, carbonFootprintId: carbonFootprint1Fixture.uuid };
    const {
      body: { errors },
    } = await gqlRequest(app, getGqlRequestPayload(clientFootprintDeleteMutation, variables), partner1UserFixture);

    expect(errors.length).toBe(1);
    expect(errors[0].extensions.code).toBe(APOLLO_FORBIDDEN_CODE);
  });

  it('should return an error if the footprint does not belong to the logged in client user', async () => {
    const variables = { clientId: client1Fixture.uuid, carbonFootprintId: carbonFootprint1Fixture.uuid };
    const {
      body: { errors },
    } = await gqlRequest(app, getGqlRequestPayload(clientFootprintDeleteMutation, variables), client2UserFixture);

    expect(errors.length).toBe(1);
    expect(errors[0].extensions.code).toBe(APOLLO_FORBIDDEN_CODE);
  });
});
