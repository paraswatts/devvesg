import { gql } from 'apollo-server-express';

import { gqlRequest, getGqlRequestPayload, UNASSIGNED_UUID } from '../utils';
import { app, DI } from '../../index';
import { adminUserFixture, deactivateUserFixture } from '../fixtures';
import { APOLLO_FORBIDDEN_CODE } from '../../classes/errors/apollo-errors/apollo-forbidden';
import { APOLLO_AUTHENTICATION_CODE } from '../../classes/errors/apollo-errors/apollo-authentication';

const userDeactivateMutation = gql`
  mutation ($id: ID!) {
    userDeactivate(id: $id)
  }
`;

describe('User Deactivate Mutation', () => {
  it('should return an error if the user requesting deletion does not exist', async () => {
    const variables = { id: UNASSIGNED_UUID };
    const {
      body: { errors },
    } = await gqlRequest(app, getGqlRequestPayload(userDeactivateMutation, variables), { uuid: UNASSIGNED_UUID });
    expect(errors.length).toBe(1);
    expect(errors[0].extensions.code).toBe(APOLLO_AUTHENTICATION_CODE);
  });

  it('should return an error if the user requesting deletion is not the same as the logged in user', async () => {
    const deletedUserBefore = await DI.userRepo.findOne({ uuid: deactivateUserFixture.uuid }, { refresh: true });
    expect(deletedUserBefore.uuid).toBe(deactivateUserFixture.uuid);
    const variables = { id: deactivateUserFixture.uuid };
    const {
      body: { errors },
    } = await gqlRequest(app, getGqlRequestPayload(userDeactivateMutation, variables), adminUserFixture);
    expect(errors.length).toBe(1);
    expect(errors[0].extensions.code).toBe(APOLLO_FORBIDDEN_CODE);
    const deletedUserAfter = await DI.userRepo.findOne({ uuid: deactivateUserFixture.uuid }, { refresh: true });
    expect(deletedUserAfter.uuid).toBe(deactivateUserFixture.uuid);
  });

  it('should deactivate the user', async () => {
    const deletedUserBefore = await DI.userRepo.findOne({ uuid: deactivateUserFixture.uuid }, { refresh: true });
    expect(deletedUserBefore.uuid).toBe(deactivateUserFixture.uuid);
    const variables = { id: deactivateUserFixture.uuid };
    const {
      body: {
        data: { userDeactivate: response },
        errors,
      },
    } = await gqlRequest(app, getGqlRequestPayload(userDeactivateMutation, variables), deactivateUserFixture);
    expect(response).toBeNull();
    expect(errors).toBeFalsy();
    const deletedUserAfter = await DI.userRepo.findOne({ uuid: deactivateUserFixture.uuid }, { refresh: true });
    expect(deletedUserAfter).toBeNull();
  });
});
