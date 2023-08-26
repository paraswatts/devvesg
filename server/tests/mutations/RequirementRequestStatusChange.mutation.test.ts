import { gql } from 'apollo-server-express';

import { gqlRequest, getGqlRequestPayload } from '../utils';
import { app } from '../../index';
import {
  client2UserFixture,
  partner1UserFixture,
  partner2UserFixture,
  requirement4Fixture,
  requirement6Fixture,
} from '../fixtures';
import { mockSendEmail } from '../config/jest.setup';
import { APOLLO_FORBIDDEN_CODE } from '../../classes/errors/apollo-errors/apollo-forbidden';
import { APOLLO_NOT_FOUND_CODE } from '../../classes/errors/apollo-errors/apollo-not-found';
import { hubspot } from '../../config/hubspot';

const mockContactCreate = jest.fn();
const mockCompanyCreate = jest.fn();
const mockDealCreate = jest.fn().mockResolvedValue({ id: '123' });
const mockCompanyAssociateToContact = jest.fn();
const mockCompanyAssociateToDeal = jest.fn();
const mockDealAssociateToCompany = jest.fn();

// TODO: there has to be a way to do this with jest.mock(). All of the ways I've tried result in the actual module being used
hubspot.contactCreate = mockContactCreate;
hubspot.companyCreate = mockCompanyCreate;
hubspot.dealCreate = mockDealCreate;
hubspot.companyAssociateToContact = mockCompanyAssociateToContact;
hubspot.companyAssociateToDeal = mockCompanyAssociateToDeal;
hubspot.dealAssociateToCompany = mockDealAssociateToCompany;

const requestStatusChangeMutation = gql`
  mutation ($requirementRequestId: ID!, $requestStatus: RequirementRequestStatus!) {
    requirementRequestStatusChange(id: $requirementRequestId, requestStatus: $requestStatus) {
      uuid
      requestStatus
    }
  }
`;

describe('Requirement Request Status Change Mutation', () => {
  it('should return an error if the user is not a partner user', async () => {
    const variables = {
      requirementRequestId: requirement4Fixture.uuid,
      requestStatus: 'APPROVED',
    };

    const {
      body: { errors },
    } = await gqlRequest(app, getGqlRequestPayload(requestStatusChangeMutation, variables), client2UserFixture);
    expect(errors.length).toBe(1);
    expect(errors[0].extensions.code).toBe(APOLLO_FORBIDDEN_CODE);
  });

  it('should return an error if the user is a partner user of another partner', async () => {
    const variables = {
      requirementRequestId: requirement4Fixture.uuid,
      requestStatus: 'APPROVED',
    };

    const {
      body: { errors },
    } = await gqlRequest(app, getGqlRequestPayload(requestStatusChangeMutation, variables), partner1UserFixture);
    expect(errors.length).toBe(1);
    expect(errors[0].extensions.code).toBe(APOLLO_NOT_FOUND_CODE);
  });

  it('should update the status to approved', async () => {
    const variables = {
      requirementRequestId: requirement4Fixture.uuid,
      requestStatus: 'APPROVED',
    };

    const {
      body: {
        data: { requirementRequestStatusChange: response },
        errors,
      },
    } = await gqlRequest(app, getGqlRequestPayload(requestStatusChangeMutation, variables), partner2UserFixture);
    expect(errors).toBeFalsy();
    expect(response.requestStatus).toBe('APPROVED');
    expect(response.uuid).toBe(requirement4Fixture.uuid);
    expect(mockDealCreate).toHaveBeenCalledTimes(1);
    expect(mockDealAssociateToCompany).toHaveBeenCalledTimes(2);
    expect(mockSendEmail).toHaveBeenCalledTimes(2);
    expect(mockSendEmail.mock.calls[0][0]).toStrictEqual(['testclient2@example.com']);
    expect(mockSendEmail.mock.calls[0][1]).toBe('test-partner-2 has accepted your Partner connection request');
    expect(mockSendEmail.mock.calls[0][2]).toContain(
      "test-partner-2 has accepted your organization's Partner connection request for one of your requirements.",
    );
    expect(mockSendEmail.mock.calls[1][0]).toStrictEqual(['test@example.com']);
    expect(mockSendEmail.mock.calls[1][1]).toBe('You have accepted a Partner connection request from test-client-2');
    expect(mockSendEmail.mock.calls[1][2]).toContain(
      'Your organization has accepted a Partner connection request from test-client-2 for one of their requirements.',
    );
  });

  it('should update the status to rejected', async () => {
    const variables = {
      requirementRequestId: requirement6Fixture.uuid,
      requestStatus: 'UNASSIGNED',
    };

    const {
      body: {
        data: { requirementRequestStatusChange: response },
        errors,
      },
    } = await gqlRequest(app, getGqlRequestPayload(requestStatusChangeMutation, variables), partner2UserFixture);
    expect(errors).toBeFalsy();
    expect(response.requestStatus).toBe('UNASSIGNED');
    expect(response.uuid).toBe(requirement6Fixture.uuid);
    expect(mockDealCreate).toHaveBeenCalledTimes(0);
    expect(mockDealAssociateToCompany).toHaveBeenCalledTimes(0);
    expect(mockSendEmail).toHaveBeenCalledTimes(2);
    expect(mockSendEmail.mock.calls[0][0]).toStrictEqual(['testclient2@example.com']);
    expect(mockSendEmail.mock.calls[0][1]).toBe('test-partner-2 has declined your Partner connection request');
    expect(mockSendEmail.mock.calls[0][2]).toContain(
      'test-partner-2 has declined your Partner connection request for one of your requirements.',
    );
    expect(mockSendEmail.mock.calls[1][0]).toStrictEqual(['test@example.com']);
    expect(mockSendEmail.mock.calls[1][1]).toBe('You have declined a Partner connection request from test-client-2');
    expect(mockSendEmail.mock.calls[1][2]).toContain(
      'Your organization has declined a Partner connection request from test-client-2 on one of their requirements.',
    );
  });
});
