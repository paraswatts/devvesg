import { gql } from 'apollo-server-express';

import { getGqlRequestPayload, gqlRequest, UNASSIGNED_UUID } from '../utils';
import { app, DI } from '../../index';
import {
  client1Fixture,
  client1UserFixture,
  client2Fixture,
  client2UserFixture,
  partner1UserFixture,
  partner2Fixture,
  project1Fixture,
  project2Fixture,
  requirement1Fixture,
  requirement2Fixture,
} from '../fixtures';
import { mockSendEmail } from '../config/jest.setup';
import { APOLLO_FORBIDDEN_CODE } from '../../classes/errors/apollo-errors/apollo-forbidden';
import { APOLLO_NOT_FOUND_CODE } from '../../classes/errors/apollo-errors/apollo-not-found';
import { APOLLO_UNKNOWN_CODE } from '../../classes/errors/apollo-errors/apollo-unknown';

const disconnectPartnerMutation = gql`
  mutation ($id: ID!, $clientId: ID!, $projectId: ID!, $reason: String!) {
    requirementDisconnectPartner(id: $id, clientId: $clientId, projectId: $projectId, reason: $reason) {
      uuid
    }
  }
`;

describe('Disconnect Partner Mutation', () => {
  it('should disconnect the partner from the requirement', async () => {
    const existingRequirement = await DI.requirementRepo.findOne(
      { uuid: requirement2Fixture.uuid },
      { populate: ['partner'], refresh: true },
    );

    expect(existingRequirement.partner.uuid).toBe(partner2Fixture.uuid);
    expect(existingRequirement.hubspotDealId).toBe('mock-id');

    const variables = {
      id: requirement2Fixture.uuid,
      projectId: project2Fixture.uuid,
      clientId: client2Fixture.uuid,
      reason: 'test reason',
    };

    const {
      body: {
        data: {
          requirementDisconnectPartner: { uuid },
        },
      },
    } = await gqlRequest(app, getGqlRequestPayload(disconnectPartnerMutation, variables), client2UserFixture);

    expect(uuid).toBe(requirement2Fixture.uuid);

    const requirementAfterUpdate = await DI.requirementRepo.findOne(
      { uuid: requirement2Fixture.uuid },
      { populate: ['partner'], refresh: true },
    );

    expect(requirementAfterUpdate.partner).toBeNull();
    expect(requirementAfterUpdate.hubspotDealId).toBeNull();
    expect(mockSendEmail).toHaveBeenCalledWith(
      ['test@example.com'],
      'A client has removed a connection',
      expect.stringContaining(
        'test-client-2 has removed their connection with you related to initiative-2 + project-2 + requirement-2 for the following reason:',
      ),
    );
  });

  it('should return an error if the user is a partner user', async () => {
    const variables = {
      id: requirement1Fixture.uuid,
      projectId: project1Fixture.uuid,
      clientId: client1Fixture.uuid,
      reason: 'test reason',
    };
    const {
      body: { errors },
    } = await gqlRequest(app, getGqlRequestPayload(disconnectPartnerMutation, variables), partner1UserFixture);

    expect(errors.length).toBe(1);
    expect(errors[0].extensions.code).toBe(APOLLO_FORBIDDEN_CODE);
  });

  it('should return an error if the requirement does not belong to the requesting client', async () => {
    const variables = {
      id: requirement1Fixture.uuid,
      projectId: project1Fixture.uuid,
      clientId: client1Fixture.uuid,
      reason: 'test reason',
    };
    const {
      body: { errors },
    } = await gqlRequest(app, getGqlRequestPayload(disconnectPartnerMutation, variables), client2UserFixture);

    expect(errors.length).toBe(1);
    expect(errors[0].extensions.code).toBe(APOLLO_FORBIDDEN_CODE);
  });

  it('should return an error if the requirement does not exist', async () => {
    const variables = {
      id: UNASSIGNED_UUID,
      projectId: project1Fixture.uuid,
      clientId: client1Fixture.uuid,
      reason: 'test reason',
    };
    const {
      body: { errors },
    } = await gqlRequest(app, getGqlRequestPayload(disconnectPartnerMutation, variables), client1UserFixture);

    expect(errors.length).toBe(1);
    expect(errors[0].extensions.code).toBe(APOLLO_NOT_FOUND_CODE);
  });

  it('should return an error if the request is malformed', async () => {
    const variables = {
      id: requirement1Fixture.uuid,
      projectId: project1Fixture.uuid,
      clientId: client1Fixture.uuid,
    };
    const {
      body: { errors },
    } = await gqlRequest(app, getGqlRequestPayload(disconnectPartnerMutation, variables), client1UserFixture);

    expect(errors.length).toBe(1);
    expect(errors[0].extensions.code).toBe(APOLLO_UNKNOWN_CODE);
  });
});
