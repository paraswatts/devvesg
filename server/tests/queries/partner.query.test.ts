import { gql } from 'apollo-server-express';

import { app } from '../../index';
import {
  adminUserFixture,
  client1Fixture,
  client1UserFixture,
  clientLocation1Fixture,
  clientType1Fixture,
  clientType2Fixture,
  initiative1Fixture,
  partner1Fixture,
  partner1UserFixture,
  partner2UserFixture,
  partnerLocation1Fixture,
  partnerLocation2Fixture,
  project1Fixture,
  project3Fixture,
  projectType1Fixture,
  requirement1Fixture,
  requirement3Fixture,
  requirementDocument1Fixture,
  requirementDocument3Fixture,
  requirementType1Fixture,
  requirementType3Fixture,
  service1Fixture,
  service3Fixture,
  vertical1Fixture,
} from '../fixtures';
import { getGqlRequestPayload, gqlRequest, mediaIsSignedTest } from '../utils';
import { APOLLO_FORBIDDEN_CODE } from '../../classes/errors/apollo-errors/apollo-forbidden';
import { APOLLO_AUTHENTICATION_CODE } from '../../classes/errors/apollo-errors/apollo-authentication';
import { APOLLO_NOT_FOUND_CODE } from '../../classes/errors/apollo-errors/apollo-not-found';

const fullPartnerQuery = gql`
  query ($partnerId: ID!) {
    partner(partnerId: $partnerId) {
      uuid
      name
      description
      logo
      contactEmail
      websiteUrl
      contactPhoneNumber
      hubspotId
      projectTimeline
      country
      province
      twitterUrl
      linkedInUrl
      facebookUrl
      vertical {
        uuid
        name
      }
    }
  }
`;

const partialPartnerQuery = gql`
  query ($partnerId: ID!) {
    partner(partnerId: $partnerId) {
      uuid
      name
      hubspotId
    }
  }
`;

const partnerServicesQuery = gql`
  query ($partnerId: ID!) {
    partner(partnerId: $partnerId) {
      services {
        uuid
        name
      }
    }
  }
`;

const partnerRequirementsProjectClientQuery = gql`
  query ($partnerId: ID!) {
    partner(partnerId: $partnerId) {
      requirements {
        items {
          uuid
          name
          description
          startDate
          endDate
          status
          project {
            uuid
            name
            description
            status
            startDate
            endGoalDate
            completionDate
            client {
              uuid
              name
              description
              logo
              contactEmail
              websiteUrl
              contactPhoneNumber
              twitterUrl
              linkedInUrl
              stockTicker
            }
          }
        }
        pageInfo {
          totalCount
          page
          pageSize
        }
      }
    }
  }
`;

const partnerRequirementsProjectProjectTypeQuery = gql`
  query ($partnerId: ID!) {
    partner(partnerId: $partnerId) {
      requirements {
        items {
          uuid
          project {
            uuid
            projectType {
              uuid
              name
              logo
            }
          }
        }
      }
    }
  }
`;

const partnerRequirementRequestsProjectQuery = gql`
  query ($partnerId: ID!) {
    partner(partnerId: $partnerId) {
      requirementRequests {
        items {
          uuid
          name
          description
          startDate
          endDate
          status
          requestStatus
          project {
            uuid
            name
            description
            status
            startDate
            endGoalDate
            completionDate
          }
        }
        pageInfo {
          totalCount
          page
          pageSize
        }
      }
    }
  }
`;

const partnerRequirementsDocumentsQuery = gql`
  query ($partnerId: ID!) {
    partner(partnerId: $partnerId) {
      requirements {
        items {
          documents {
            uuid
            name
            type
            file
          }
        }
      }
    }
  }
`;

const partnerRequirementsProjectInitiativeQuery = gql`
  query ($partnerId: ID!) {
    partner(partnerId: $partnerId) {
      requirements {
        items {
          project {
            initiative {
              uuid
              name
              objective
              logo
              onboardingLogo
            }
          }
        }
      }
    }
  }
`;

const partnerRequirementsRequirementTypePartnersServicesQuery = gql`
  query ($partnerId: ID!) {
    partner(partnerId: $partnerId) {
      requirements {
        items {
          uuid
          requirementType {
            uuid
            name
            description
            partners {
              uuid
              services {
                uuid
                name
              }
            }
          }
        }
      }
    }
  }
`;

const partnerRequirementQuery = gql`
  query ($partnerId: ID!, $requirementId: ID!) {
    partner(partnerId: $partnerId) {
      uuid
      requirement(requirementId: $requirementId) {
        uuid
        name
        description
        startDate
        endDate
        status
        requestStatus
      }
    }
  }
`;

const partnerRequirementRequestQuery = gql`
  query ($partnerId: ID!, $requirementRequestId: ID!) {
    partner(partnerId: $partnerId) {
      uuid
      requirementRequest(requirementRequestId: $requirementRequestId) {
        uuid
        name
        description
        startDate
        endDate
        status
        requestStatus
      }
    }
  }
`;

const partnerRequirementTypesQuery = gql`
  query ($partnerId: ID!) {
    partner(partnerId: $partnerId) {
      requirementTypes {
        uuid
        name
        description
      }
    }
  }
`;

const partnerRequirementRequestsRequirementTypeQuery = gql`
  query ($partnerId: ID!) {
    partner(partnerId: $partnerId) {
      requirementRequests {
        items {
          uuid
          requirementType {
            uuid
            name
            description
          }
        }
      }
    }
  }
`;

const partnerRequirementsProjectLocationQuery = gql`
  query ($partnerId: ID!) {
    partner(partnerId: $partnerId) {
      requirements {
        items {
          uuid
          project {
            uuid
            client {
              locations {
                country
                province
              }
            }
          }
        }
      }
    }
  }
`;

const partnerClientTypesQuery = gql`
  query ($partnerId: ID!) {
    partner(partnerId: $partnerId) {
      clientTypes {
        uuid
        name
      }
    }
  }
`;

const partnerServiceLocationsQuery = gql`
  query ($partnerId: ID!) {
    partner(partnerId: $partnerId) {
      serviceLocations {
        country
        province
      }
    }
  }
`;

describe('Partner queries', () => {
  it('should return requested partner', async () => {
    const variables = { partnerId: partner1Fixture.uuid };
    const {
      body: {
        data: { partner },
      },
    } = await gqlRequest(app, getGqlRequestPayload(fullPartnerQuery, variables), partner1UserFixture);
    expect(partner.uuid).toBe(partner1Fixture.uuid);
    expect(partner.name).toBe(partner1Fixture.name);
    expect(partner.description).toBe(partner1Fixture.description);
    // Check that logo is signed
    expect(mediaIsSignedTest(partner.logo)).toBe(true);
    expect(partner.contactEmail).toBe(partner1Fixture.contactEmail);
    expect(partner.websiteUrl).toBe(partner1Fixture.websiteUrl);
    expect(partner.contactPhoneNumber).toBe(partner1Fixture.contactPhoneNumber);
    expect(partner.country).toBe(partner1Fixture.country);
    expect(partner.province).toBe(partner1Fixture.province);
    expect(partner.projectTimeline).toBe(partner1Fixture.projectTimeline);
    expect(partner.hubspotId).toBeNull(); // Only admins should see this value
    expect(partner.twitterUrl).toBe(partner1Fixture.twitterUrl);
    expect(partner.linkedInUrl).toBe(partner1Fixture.linkedInUrl);
    expect(partner.facebookUrl).toBe(partner1Fixture.facebookUrl);
    expect(partner.vertical.uuid).toBe(vertical1Fixture.uuid);
    expect(partner.vertical.name).toBe(vertical1Fixture.name);
  });

  it('should allow admin users to access a partner', async () => {
    const variables = { partnerId: partner1Fixture.uuid };
    const {
      body: {
        data: { partner },
      },
    } = await gqlRequest(app, getGqlRequestPayload(partialPartnerQuery, variables), adminUserFixture);
    expect(partner.uuid).toBe(partner1Fixture.uuid);
    expect(partner.name).toBe(partner1Fixture.name);
    expect(partner.hubspotId).toBe(partner1Fixture.hubspotId);
  });

  it('should return an error if the user is not a partner user', async () => {
    const variables = { partnerId: partner1Fixture.uuid };
    const {
      body: { data, errors },
    } = await gqlRequest(app, getGqlRequestPayload(partialPartnerQuery, variables), client1UserFixture);
    expect(data).toBeNull();
    expect(errors.length).toBe(1);
    expect(errors[0].extensions.code).toBe(APOLLO_FORBIDDEN_CODE);
  });

  it('should return an error if the user is a partner user of a different partner', async () => {
    const variables = { partnerId: partner1Fixture.uuid };
    const {
      body: { data, errors },
    } = await gqlRequest(app, getGqlRequestPayload(partialPartnerQuery, variables), partner2UserFixture);
    expect(data).toBeNull();
    expect(errors.length).toBe(1);
    expect(errors[0].extensions.code).toBe(APOLLO_FORBIDDEN_CODE);
  });

  it('should return an error if the user is not logged in', async () => {
    const variables = { partnerId: partner1Fixture.uuid };
    const {
      body: { data, errors },
    } = await gqlRequest(app, getGqlRequestPayload(partialPartnerQuery, variables), null);
    expect(data).toBeNull();
    expect(errors.length).toBe(1);
    expect(errors[0].extensions.code).toBe(APOLLO_AUTHENTICATION_CODE);
  });

  it('should fetch services belonging to a partner', async () => {
    const variables = { partnerId: partner1Fixture.uuid };
    const {
      body: {
        data: {
          partner: { services },
        },
      },
    } = await gqlRequest(app, getGqlRequestPayload(partnerServicesQuery, variables), adminUserFixture);

    expect(services.length).toBe(2);
    expect(services[0].uuid).toBe(service1Fixture.uuid);
    expect(services[0].name).toBe(service1Fixture.name);
  });

  it('should fetch requirements, project, and client under a partner', async () => {
    const variables = { partnerId: partner1Fixture.uuid };
    const {
      body: {
        data: {
          partner: { requirements: requirementsListResponse },
        },
      },
    } = await gqlRequest(
      app,
      getGqlRequestPayload(partnerRequirementsProjectClientQuery, variables),
      partner1UserFixture,
    );

    const { pageInfo, items: requirements } = requirementsListResponse;

    expect(pageInfo.totalCount).toBe(1);
    expect(requirements[0].uuid).toBe(requirement1Fixture.uuid);
    expect(requirements[0].name).toBe(requirement1Fixture.name);
    expect(requirements[0].description).toBe(requirement1Fixture.description);
    expect(requirements[0].status).toBe('DONE');
    expect(requirements[0].startDate).toBe(requirement1Fixture.startDate.toISOString());
    expect(requirements[0].endDate).toBe(requirement1Fixture.endDate.toISOString());

    const { project } = requirements[0];

    expect(project.uuid).toBe(project1Fixture.uuid);
    expect(project.name).toBe(project1Fixture.name);
    expect(project.description).toBe(project1Fixture.description);
    expect(project.status).toBe('ON_HOLD');
    expect(project.startDate).toBe(project1Fixture.startDate.toISOString());
    expect(project.endGoalDate).toBe(project1Fixture.endGoalDate.toISOString());
    expect(project.completionDate).toBe(project1Fixture.completionDate.toISOString());

    const { client } = project;

    expect(client.uuid).toBe(client1Fixture.uuid);
    expect(client.name).toBe(client1Fixture.name);
    expect(client.description).toBe(client1Fixture.description);
    expect(mediaIsSignedTest(client.logo)).toBe(true);
    expect(client.contactEmail).toBe(client1Fixture.contactEmail);
    expect(client.websiteUrl).toBe(client1Fixture.websiteUrl);
    expect(client.contactPhoneNumber).toBe(client1Fixture.contactPhoneNumber);
    expect(client.twitterUrl).toBe(client1Fixture.twitterUrl);
    expect(client.linkedInUrl).toBe(client1Fixture.linkedInUrl);
    expect(client.stockTicker).toBe(client1Fixture.stockTicker);
  });

  it('should fetch requirements, project, and project type under a partner', async () => {
    const variables = { partnerId: partner1Fixture.uuid };
    const {
      body: {
        data: {
          partner: {
            requirements: { items: requirements },
          },
        },
      },
    } = await gqlRequest(
      app,
      getGqlRequestPayload(partnerRequirementsProjectProjectTypeQuery, variables),
      partner1UserFixture,
    );

    const {
      project: { projectType },
    } = requirements[0];
    expect(projectType.uuid).toBe(projectType1Fixture.uuid);
    expect(projectType.name).toBe(projectType1Fixture.name);
    expect(mediaIsSignedTest(projectType.logo)).toBe(true);
  });

  it('should fetch requirementRequests and project under a partner', async () => {
    const variables = { partnerId: partner1Fixture.uuid };
    const {
      body: {
        data: {
          partner: {
            requirementRequests: { items: requirementRequests, pageInfo },
          },
        },
      },
    } = await gqlRequest(
      app,
      getGqlRequestPayload(partnerRequirementRequestsProjectQuery, variables),
      partner1UserFixture,
    );

    expect(pageInfo.totalCount).toBe(2);
    expect(requirementRequests[0].uuid).toBe(requirement3Fixture.uuid);
    expect(requirementRequests[0].name).toBe(requirement3Fixture.name);
    expect(requirementRequests[0].description).toBe(requirement3Fixture.description);
    expect(requirementRequests[0].status).toBe('ON_HOLD');
    expect(requirementRequests[0].startDate).toBe(requirement3Fixture.startDate.toISOString());
    expect(requirementRequests[0].endDate).toBe(requirement3Fixture.endDate.toISOString());

    const { project } = requirementRequests[0];
    expect(project.uuid).toBe(project3Fixture.uuid);
    expect(project.name).toBe(project3Fixture.name);
    expect(project.description).toBe(project3Fixture.description);
    expect(project.status).toBe('DONE');
    expect(project.startDate).toBe(project3Fixture.startDate.toISOString());
    expect(project.endGoalDate).toBe(project3Fixture.endGoalDate.toISOString());
    expect(project.completionDate).toBe(project3Fixture.completionDate.toISOString());
  });

  it('should fetch a requirement under a partner', async () => {
    const variables = { partnerId: partner1Fixture.uuid, requirementId: requirement1Fixture.uuid };
    const {
      body: {
        data: {
          partner: { requirement },
        },
      },
    } = await gqlRequest(app, getGqlRequestPayload(partnerRequirementQuery, variables), partner1UserFixture);

    expect(requirement.uuid).toBe(requirement1Fixture.uuid);
    expect(requirement.name).toBe(requirement1Fixture.name);
    expect(requirement.description).toBe(requirement1Fixture.description);
    expect(requirement.startDate).toBe(requirement1Fixture.startDate.toISOString());
    expect(requirement.endDate).toBe(requirement1Fixture.endDate.toISOString());
    expect(requirement.status).toBe('DONE');
    expect(requirement.requestStatus).toBe('APPROVED');
  });

  it('should return a not found error if the requirement is actually a request under a partner', async () => {
    const variables = { partnerId: partner1Fixture.uuid, requirementId: requirement3Fixture.uuid };
    const {
      body: { data, errors },
    } = await gqlRequest(app, getGqlRequestPayload(partnerRequirementQuery, variables), partner1UserFixture);
    expect(data).toBeNull();
    expect(errors.length).toBe(1);
    expect(errors[0].extensions.code).toBe(APOLLO_NOT_FOUND_CODE);
  });

  it('should fetch a requirementRequest under a partner', async () => {
    const variables = { partnerId: partner1Fixture.uuid, requirementRequestId: requirement3Fixture.uuid };
    const {
      body: {
        data: {
          partner: { requirementRequest },
        },
      },
    } = await gqlRequest(app, getGqlRequestPayload(partnerRequirementRequestQuery, variables), partner1UserFixture);

    expect(requirementRequest.uuid).toBe(requirement3Fixture.uuid);
    expect(requirementRequest.name).toBe(requirement3Fixture.name);
    expect(requirementRequest.description).toBe(requirement3Fixture.description);
    expect(requirementRequest.startDate).toBe(requirement3Fixture.startDate.toISOString());
    expect(requirementRequest.endDate).toBe(requirement3Fixture.endDate.toISOString());
    expect(requirementRequest.status).toBe('ON_HOLD');
    expect(requirementRequest.requestStatus).toBe('PENDING');
  });

  it('should return a not found error if the requested requirementRequest is actually a requirement', async () => {
    const variables = { partnerId: partner1Fixture.uuid, requirementRequestId: requirement1Fixture.uuid };
    const {
      body: { data, errors },
    } = await gqlRequest(app, getGqlRequestPayload(partnerRequirementRequestQuery, variables), partner1UserFixture);
    expect(data).toBeNull();
    expect(errors.length).toBe(1);
    expect(errors[0].extensions.code).toBe(APOLLO_NOT_FOUND_CODE);
  });

  it('should fetch requirementType under requirementRequests under a top level partner', async () => {
    const variables = { partnerId: partner1Fixture.uuid };
    const {
      body: {
        data: {
          partner: {
            requirementRequests: { items },
          },
        },
      },
    } = await gqlRequest(
      app,
      getGqlRequestPayload(partnerRequirementRequestsRequirementTypeQuery, variables),
      partner1UserFixture,
    );

    expect(items.length).toBe(2);

    const { requirementType } = items[0];
    expect(requirementType.uuid).toBe(requirementType3Fixture.uuid);
    expect(requirementType.name).toBe(requirementType3Fixture.name);
    expect(requirementType.description).toBe(requirementType3Fixture.description);
  });

  it('should fetch locations from client when listing requirements under a top level partner', async () => {
    const variables = { partnerId: partner1Fixture.uuid };
    const {
      body: {
        data: {
          partner: {
            requirements: { items },
          },
        },
      },
    } = await gqlRequest(
      app,
      getGqlRequestPayload(partnerRequirementsProjectLocationQuery, variables),
      partner1UserFixture,
    );

    const {
      project: {
        client: { locations },
      },
    } = items[0];
    expect(locations.length).toBe(1);
    expect(locations[0].country).toBe(clientLocation1Fixture.country);
    expect(locations[0].province).toBe(clientLocation1Fixture.province);
  });

  it('should fetch requirements and documents under a partner', async () => {
    const variables = { partnerId: partner1Fixture.uuid };
    const {
      body: {
        data: {
          partner: {
            requirements: { items: requirements },
          },
        },
      },
    } = await gqlRequest(app, getGqlRequestPayload(partnerRequirementsDocumentsQuery, variables), partner1UserFixture);

    const { documents } = requirements[0];
    expect(documents[0].uuid).toBe(requirementDocument1Fixture.uuid);
    expect(documents[0].name).toBe(requirementDocument1Fixture.name);
    expect(documents[0].type).toBe('FILE');
    expect(mediaIsSignedTest(documents[0].file)).toBe(true);

    expect(documents[1].uuid).toBe(requirementDocument3Fixture.uuid);
    expect(documents[1].name).toBe(requirementDocument3Fixture.name);
    expect(documents[1].type).toBe('URL');
    expect(documents[1].file).toBe(requirementDocument3Fixture.file);
    expect(mediaIsSignedTest(documents[1].file)).toBe(true);
  });

  it('should fetch requirements, project, and initiative under a partner', async () => {
    const variables = { partnerId: partner1Fixture.uuid };
    const {
      body: {
        data: {
          partner: {
            requirements: { items: requirements },
          },
        },
      },
    } = await gqlRequest(
      app,
      getGqlRequestPayload(partnerRequirementsProjectInitiativeQuery, variables),
      partner1UserFixture,
    );

    const {
      project: { initiative },
    } = requirements[0];
    expect(initiative.uuid).toBe(initiative1Fixture.uuid);
    expect(initiative.name).toBe(initiative1Fixture.name);
    expect(initiative.objective).toBe(initiative1Fixture.objective);
    expect(mediaIsSignedTest(initiative.logo)).toBe(true);
    expect(mediaIsSignedTest(initiative.onboardingLogo)).toBe(true);
  });

  it('should fetch requirements, requirementType, partners, and services under a partner', async () => {
    const variables = { partnerId: partner1Fixture.uuid };
    const {
      body: {
        data: {
          partner: {
            requirements: { items: requirements },
          },
        },
      },
    } = await gqlRequest(
      app,
      getGqlRequestPayload(partnerRequirementsRequirementTypePartnersServicesQuery, variables),
      partner1UserFixture,
    );

    const { requirementType } = requirements[0];
    expect(requirementType.uuid).toBe(requirementType1Fixture.uuid);
    expect(requirementType.name).toBe(requirementType1Fixture.name);
    expect(requirementType.description).toBe(requirementType1Fixture.description);

    const { partners } = requirementType;
    expect(partners.length).toBe(1);
    expect(partners[0].uuid).toBe(partner1Fixture.uuid);

    const { services } = partners[0];
    expect(services.length).toBe(2);
    expect(services[0].uuid).toBe(service1Fixture.uuid);
    expect(services[0].name).toBe(service1Fixture.name);
    expect(services[1].uuid).toBe(service3Fixture.uuid);
    expect(services[1].name).toBe(service3Fixture.name);
  });

  it('should return requirementTypes under a partner', async () => {
    const variables = { partnerId: partner1Fixture.uuid };
    const {
      body: {
        data: {
          partner: { requirementTypes },
        },
      },
    } = await gqlRequest(app, getGqlRequestPayload(partnerRequirementTypesQuery, variables), partner1UserFixture);

    expect(requirementTypes.length).toBe(1);
    expect(requirementTypes[0].uuid).toBe(requirementType1Fixture.uuid);
    expect(requirementTypes[0].name).toBe(requirementType1Fixture.name);
    expect(requirementTypes[0].description).toBe(requirementType1Fixture.description);
  });

  it('should return client types under a partner', async () => {
    const variables = { partnerId: partner1Fixture.uuid };
    const {
      body: {
        data: {
          partner: { clientTypes },
        },
      },
    } = await gqlRequest(app, getGqlRequestPayload(partnerClientTypesQuery, variables), partner1UserFixture);

    expect(clientTypes.length).toBe(2);
    expect(clientTypes[0].uuid).toBe(clientType1Fixture.uuid);
    expect(clientTypes[0].name).toBe(clientType1Fixture.name);
    expect(clientTypes[1].uuid).toBe(clientType2Fixture.uuid);
    expect(clientTypes[1].name).toBe(clientType2Fixture.name);
  });

  it('should return service locations under a partner', async () => {
    const variables = { partnerId: partner1Fixture.uuid };
    const {
      body: {
        data: {
          partner: { serviceLocations },
        },
      },
    } = await gqlRequest(app, getGqlRequestPayload(partnerServiceLocationsQuery, variables), partner1UserFixture);

    expect(serviceLocations.length).toBe(2);
    expect(serviceLocations[0].country).toBe(partnerLocation1Fixture.country);
    expect(serviceLocations[0].province).toBe(partnerLocation1Fixture.province);
    expect(serviceLocations[1].country).toBe(partnerLocation2Fixture.country);
    expect(serviceLocations[1].province).toBe(partnerLocation2Fixture.province);
  });
});
