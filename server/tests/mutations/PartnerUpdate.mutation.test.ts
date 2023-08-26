import { gql } from 'apollo-server-express';

import { getGqlRequestPayload, gqlRequest, UNASSIGNED_UUID } from '../utils';
import { app, DI } from '../../index';
import {
  client1UserFixture,
  clientType3Fixture,
  partner1UserFixture,
  partner3Fixture,
  partner3UserFixture,
  requirementType3Fixture,
  requirementType4Fixture,
  vertical3Fixture,
  vertical4Fixture,
} from '../fixtures';
import {
  GqlMutationPartnerUpdateArgs,
  GqlPartnerUpdateCompanyInformation,
  GqlPartnerUpdateServiceInformation,
} from '../../gql/types';
import { APOLLO_FORBIDDEN_CODE } from '../../classes/errors/apollo-errors/apollo-forbidden';
import { APOLLO_UNKNOWN_CODE } from '../../classes/errors/apollo-errors/apollo-unknown';

const firstUpdateCompanyInfoPayload: GqlPartnerUpdateCompanyInformation = {
  contactEmail: 'first-update-email@example.com',
  contactPhoneNumber: '3333333333',
  country: 'firstTestCountry',
  province: 'firstTestProvince',
  description: 'firstTestDescription',
  name: 'firstTestNamePartner3',
  facebookUrl: 'www.facebook.com/firstTest',
  linkedInUrl: 'www.linkedin.com/firstTest',
  twitterUrl: 'www.twitter.com/firstTest',
  vertical: vertical4Fixture.uuid,
  websiteUrl: 'www.firstTest.com',
};

const secondUpdateServiceInfoPayload: GqlPartnerUpdateServiceInformation = {
  clientTypeIds: [clientType3Fixture.uuid],
  projectTimeline: 1,
  requirementTypeIds: [requirementType4Fixture.uuid],
  serviceLocations: [
    { country: 'testCountry1', provinces: ['testProvince1', 'testProvince2'] },
    { country: 'testCountry2', provinces: ['testProvince3'] },
  ],
};

const thirdUpdateCompletePayload: GqlMutationPartnerUpdateArgs = {
  id: partner3Fixture.uuid,
  companyInformation: {
    contactEmail: 'third-update-email@example.com',
    contactPhoneNumber: '4444444444',
    country: 'thirdTestCountry',
    province: 'thirdTestProvince',
    description: 'thirdTestDescription',
    name: 'thirdTestNamePartner3',
    facebookUrl: 'www.facebook.com/thirdTest',
    linkedInUrl: 'www.linkedin.com/thirdTest',
    twitterUrl: 'www.twitter.com/thirdTest',
    vertical: vertical3Fixture.uuid,
    websiteUrl: 'www.thirdTest.com',
  },
  servicesInformation: {
    clientTypeIds: [],
    projectTimeline: 2,
    requirementTypeIds: [requirementType3Fixture.uuid],
    serviceLocations: [{ country: 'testCountry3', provinces: ['testProvince4'] }],
  },
};

const partnerUpdateMutation = gql`
  mutation (
    $id: ID!
    $companyInformation: PartnerUpdateCompanyInformation
    $servicesInformation: PartnerUpdateServiceInformation
  ) {
    partnerUpdate(id: $id, companyInformation: $companyInformation, servicesInformation: $servicesInformation) {
      uuid
    }
  }
`;

describe('Partner Update Mutation', () => {
  it('should update a partners company information', async () => {
    const existingPartner = await DI.partnerRepo.findOne(
      { uuid: partner3Fixture.uuid },
      { populate: ['vertical'], refresh: true },
    );
    expect(existingPartner.name).toBe(partner3Fixture.name);
    expect(existingPartner.description).toBe(partner3Fixture.description);
    expect(existingPartner.contactEmail).toBe(partner3Fixture.contactEmail);
    expect(existingPartner.websiteUrl).toBe(partner3Fixture.websiteUrl);
    expect(existingPartner.contactPhoneNumber).toBeNull();
    expect(existingPartner.country).toBeNull();
    expect(existingPartner.province).toBeNull();
    expect(existingPartner.facebookUrl).toBeNull();
    expect(existingPartner.linkedInUrl).toBeNull();
    expect(existingPartner.twitterUrl).toBeNull();
    expect(existingPartner.vertical.uuid).toBe(vertical3Fixture.uuid);

    const variables = { id: partner3Fixture.uuid, companyInformation: firstUpdateCompanyInfoPayload };
    const {
      body: {
        data: {
          partnerUpdate: { uuid },
        },
      },
    } = await gqlRequest(app, getGqlRequestPayload(partnerUpdateMutation, variables), partner3UserFixture);

    const firstUpdatePartner = await DI.partnerRepo.findOne(
      { uuid: partner3Fixture.uuid },
      { populate: ['vertical'], refresh: true },
    );
    expect(uuid).toBe(partner3Fixture.uuid);
    expect(firstUpdatePartner.name).toBe(firstUpdateCompanyInfoPayload.name);
    expect(firstUpdatePartner.description).toBe(firstUpdateCompanyInfoPayload.description);
    expect(firstUpdatePartner.contactEmail).toBe(firstUpdateCompanyInfoPayload.contactEmail);
    expect(firstUpdatePartner.websiteUrl).toBe(firstUpdateCompanyInfoPayload.websiteUrl);
    expect(firstUpdatePartner.contactPhoneNumber).toBe(firstUpdateCompanyInfoPayload.contactPhoneNumber);
    expect(firstUpdatePartner.country).toBe(firstUpdateCompanyInfoPayload.country);
    expect(firstUpdatePartner.province).toBe(firstUpdateCompanyInfoPayload.province);
    expect(firstUpdatePartner.facebookUrl).toBe(firstUpdateCompanyInfoPayload.facebookUrl);
    expect(firstUpdatePartner.linkedInUrl).toBe(firstUpdateCompanyInfoPayload.linkedInUrl);
    expect(firstUpdatePartner.twitterUrl).toBe(firstUpdateCompanyInfoPayload.twitterUrl);
    expect(firstUpdatePartner.vertical.uuid).toBe(vertical4Fixture.uuid);
  });

  it('should update a partners service information', async () => {
    const existingPartner = await DI.partnerRepo.findOne(
      { uuid: partner3Fixture.uuid },
      { populate: ['clientTypes', 'requirementTypes', 'serviceLocations'], refresh: true },
    );
    expect(existingPartner.clientTypes.length).toBe(0);
    expect(existingPartner.serviceLocations.length).toBe(0);
    expect(existingPartner.requirementTypes.length).toBe(0);
    expect(existingPartner.projectTimeline).toBeNull();

    const variables = { id: partner3Fixture.uuid, servicesInformation: secondUpdateServiceInfoPayload };
    const {
      body: {
        data: {
          partnerUpdate: { uuid },
        },
      },
    } = await gqlRequest(app, getGqlRequestPayload(partnerUpdateMutation, variables), partner3UserFixture);

    const secondUpdatePartner = await DI.partnerRepo.findOne(
      { uuid: partner3Fixture.uuid },
      { populate: ['clientTypes', 'requirementTypes', 'serviceLocations'], refresh: true },
    );
    expect(uuid).toBe(partner3Fixture.uuid);
    expect(secondUpdatePartner.clientTypes.length).toBe(1);
    expect(secondUpdatePartner.clientTypes[0].uuid).toBe(clientType3Fixture.uuid);
    expect(secondUpdatePartner.serviceLocations.length).toBe(3);
    expect(secondUpdatePartner.serviceLocations[0].country).toBe('testCountry1');
    expect(secondUpdatePartner.serviceLocations[0].province).toBe('testProvince1');
    expect(secondUpdatePartner.serviceLocations[1].country).toBe('testCountry1');
    expect(secondUpdatePartner.serviceLocations[1].province).toBe('testProvince2');
    expect(secondUpdatePartner.serviceLocations[2].country).toBe('testCountry2');
    expect(secondUpdatePartner.serviceLocations[2].province).toBe('testProvince3');
    expect(secondUpdatePartner.requirementTypes.length).toBe(1);
    expect(secondUpdatePartner.requirementTypes[0].uuid).toBe(requirementType4Fixture.uuid);
    expect(secondUpdatePartner.projectTimeline).toBe(secondUpdateServiceInfoPayload.projectTimeline);
  });

  it('should update both service and company information for a partner', async () => {
    const existingPartner = await DI.partnerRepo.findOne(
      { uuid: partner3Fixture.uuid },
      { populate: ['clientTypes', 'requirementTypes', 'serviceLocations', 'vertical'], refresh: true },
    );
    expect(existingPartner.name).toBe(firstUpdateCompanyInfoPayload.name);
    expect(existingPartner.description).toBe(firstUpdateCompanyInfoPayload.description);
    expect(existingPartner.contactEmail).toBe(firstUpdateCompanyInfoPayload.contactEmail);
    expect(existingPartner.websiteUrl).toBe(firstUpdateCompanyInfoPayload.websiteUrl);
    expect(existingPartner.contactPhoneNumber).toBe(firstUpdateCompanyInfoPayload.contactPhoneNumber);
    expect(existingPartner.country).toBe(firstUpdateCompanyInfoPayload.country);
    expect(existingPartner.province).toBe(firstUpdateCompanyInfoPayload.province);
    expect(existingPartner.facebookUrl).toBe(firstUpdateCompanyInfoPayload.facebookUrl);
    expect(existingPartner.linkedInUrl).toBe(firstUpdateCompanyInfoPayload.linkedInUrl);
    expect(existingPartner.twitterUrl).toBe(firstUpdateCompanyInfoPayload.twitterUrl);
    expect(existingPartner.vertical.uuid).toBe(vertical4Fixture.uuid);
    expect(existingPartner.clientTypes.length).toBe(1);
    expect(existingPartner.serviceLocations.length).toBe(3);
    expect(existingPartner.requirementTypes.length).toBe(1);
    expect(existingPartner.projectTimeline).toBe(secondUpdateServiceInfoPayload.projectTimeline);

    const {
      body: {
        data: {
          partnerUpdate: { uuid },
        },
      },
    } = await gqlRequest(
      app,
      getGqlRequestPayload(partnerUpdateMutation, thirdUpdateCompletePayload),
      partner3UserFixture,
    );

    const thirdUpdatePartner = await DI.partnerRepo.findOne(
      { uuid: partner3Fixture.uuid },
      { populate: ['clientTypes', 'requirementTypes', 'serviceLocations'], refresh: true },
    );

    expect(uuid).toBe(partner3Fixture.uuid);
    expect(thirdUpdatePartner.name).toBe(thirdUpdateCompletePayload.companyInformation.name);
    expect(thirdUpdatePartner.description).toBe(thirdUpdateCompletePayload.companyInformation.description);
    expect(thirdUpdatePartner.contactEmail).toBe(thirdUpdateCompletePayload.companyInformation.contactEmail);
    expect(thirdUpdatePartner.websiteUrl).toBe(thirdUpdateCompletePayload.companyInformation.websiteUrl);
    expect(thirdUpdatePartner.contactPhoneNumber).toBe(
      thirdUpdateCompletePayload.companyInformation.contactPhoneNumber,
    );
    expect(thirdUpdatePartner.country).toBe(thirdUpdateCompletePayload.companyInformation.country);
    expect(thirdUpdatePartner.province).toBe(thirdUpdateCompletePayload.companyInformation.province);
    expect(thirdUpdatePartner.facebookUrl).toBe(thirdUpdateCompletePayload.companyInformation.facebookUrl);
    expect(thirdUpdatePartner.linkedInUrl).toBe(thirdUpdateCompletePayload.companyInformation.linkedInUrl);
    expect(thirdUpdatePartner.twitterUrl).toBe(thirdUpdateCompletePayload.companyInformation.twitterUrl);
    expect(thirdUpdatePartner.vertical.uuid).toBe(vertical3Fixture.uuid);
    expect(thirdUpdatePartner.clientTypes.length).toBe(0);
    expect(thirdUpdatePartner.serviceLocations.length).toBe(1);
    expect(thirdUpdatePartner.serviceLocations[0].country).toBe('testCountry3');
    expect(thirdUpdatePartner.serviceLocations[0].province).toBe('testProvince4');
    expect(thirdUpdatePartner.requirementTypes.length).toBe(1);
    expect(thirdUpdatePartner.requirementTypes[0].uuid).toBe(requirementType3Fixture.uuid);
    expect(thirdUpdatePartner.projectTimeline).toBe(thirdUpdateCompletePayload.servicesInformation.projectTimeline);
  });

  it('should return an error if the user is a client user', async () => {
    const variables = { id: partner3Fixture.uuid };
    const {
      body: { errors },
    } = await gqlRequest(app, getGqlRequestPayload(partnerUpdateMutation, variables), client1UserFixture);

    expect(errors.length).toBe(1);
    expect(errors[0].extensions.code).toBe(APOLLO_FORBIDDEN_CODE);
  });

  it('should return an error if the user does not belong to the requested partner', async () => {
    const variables = { id: partner3Fixture.uuid };
    const {
      body: { errors },
    } = await gqlRequest(app, getGqlRequestPayload(partnerUpdateMutation, variables), partner1UserFixture);

    expect(errors.length).toBe(1);
    expect(errors[0].extensions.code).toBe(APOLLO_FORBIDDEN_CODE);
  });

  it('should return an error if the partner does not exist', async () => {
    const variables = { id: UNASSIGNED_UUID };
    const {
      body: { errors },
    } = await gqlRequest(app, getGqlRequestPayload(partnerUpdateMutation, variables), partner3UserFixture);

    expect(errors.length).toBe(1);
    expect(errors[0].extensions.code).toBe(APOLLO_FORBIDDEN_CODE);
  });

  it('should return an error if the request is malformed', async () => {
    const variables = { id: partner3Fixture.uuid, companyInformation: {} };
    const {
      body: { errors },
    } = await gqlRequest(app, getGqlRequestPayload(partnerUpdateMutation, variables), partner3UserFixture);

    expect(errors.length).toBe(8);
    expect(errors[0].extensions.code).toBe(APOLLO_UNKNOWN_CODE);
  });
});
