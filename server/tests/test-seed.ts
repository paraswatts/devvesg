import { MikroORM, wrap } from '@mikro-orm/core';

import {
  adminUserFixture,
  carbonFootprintFixtures,
  client1Fixture,
  client1UserFixture,
  client2Fixture,
  client2UserFixture,
  clientTypeFixtures,
  initiativeFixtures,
  clientLocationFixtures,
  partner1Fixture,
  partner1UserFixture,
  partner2Fixture,
  partner2UserFixture,
  projectFixtures,
  projectTypeFixtures,
  requirementFixtures,
  requirementDocumentFixtures,
  requirementTypeFixtures,
  serviceFixtures,
  verticalFixtures,
  requirement1Fixture,
  requirement3Fixture,
  deactivateUserFixture,
  vertical3Fixture,
  partner3Fixture,
  partner3UserFixture,
  partnerLocationFixtures,
} from './fixtures';
import {
  CarbonFootprint,
  Client,
  ClientLocation,
  ClientType,
  Initiative,
  Partner,
  PartnerLocation,
  Project,
  ProjectType,
  Requirement,
  RequirementDocument,
  RequirementRequestStatus,
  RequirementType,
  Service,
  User,
  Vertical,
} from '../entities';
import { generatePassword } from '../lib/util';

testSeed();

const { salt, hash } = generatePassword('P@ssword1');

async function testSeed() {
  const orm = await MikroORM.init();
  const carbonFootprintRepo = orm.em.getRepository(CarbonFootprint);
  const clientRepo = orm.em.getRepository(Client);
  const clientLocationRepo = orm.em.getRepository(ClientLocation);
  const clientTypeRepo = orm.em.getRepository(ClientType);
  const initiativeRepo = orm.em.getRepository(Initiative);
  const partnerRepo = orm.em.getRepository(Partner);
  const partnerLocationRepo = orm.em.getRepository(PartnerLocation);
  const projectRepo = orm.em.getRepository(Project);
  const projectTypeRepo = orm.em.getRepository(ProjectType);
  const requirementRepo = orm.em.getRepository(Requirement);
  const requirementDocumentRepo = orm.em.getRepository(RequirementDocument);
  const requirementTypeRepo = orm.em.getRepository(RequirementType);
  const serviceRepo = orm.em.getRepository(Service);
  const userRepo = orm.em.getRepository(User);
  const verticalRepo = orm.em.getRepository(Vertical);

  // Client Locations
  const clientLocations = clientLocationFixtures.map((cl) => {
    return new ClientLocation().assign(cl);
  });

  await clientLocationRepo.persistAndFlush(clientLocations);

  // Client Types
  const clientTypes = clientTypeFixtures.map((ct) => {
    return new ClientType().assign(ct);
  });

  await clientTypeRepo.persistAndFlush(clientTypes);

  // Initiatives
  const initiatives = initiativeFixtures.map((i) => {
    return new Initiative().assign(i);
  });

  await initiativeRepo.persistAndFlush(initiatives);

  // Project Types
  const projectTypes = projectTypeFixtures.map((pt, i) => {
    return wrap(new ProjectType()).assign({ ...pt, initiative: initiatives[i] }, { em: orm.em });
  });

  await projectTypeRepo.persistAndFlush(projectTypes);

  // Requirement Types
  const requirementTypes = requirementTypeFixtures.map((r, i) => {
    return wrap(new RequirementType()).assign({ ...r, projectType: projectTypes[i] }, { em: orm.em });
  });

  await requirementTypeRepo.persistAndFlush(requirementTypes);

  // Verticals
  const verticals = verticalFixtures.map((v) => {
    return new Vertical().assign(v);
  });

  await verticalRepo.persistAndFlush(verticals);

  // Services

  const services = serviceFixtures.map((s) => {
    return new Service().assign(s);
  });

  await serviceRepo.persistAndFlush(services);

  // Client and Partners
  const client1 = wrap(new Client()).assign(
    { ...client1Fixture, vertical: verticals[0], clientType: clientTypes[0], clientLocations: [clientLocations[0]] },
    { em: orm.em },
  );
  const client2 = wrap(new Client()).assign(
    { ...client2Fixture, vertical: verticals[1], clientType: clientTypes[1], clientLocations: [clientLocations[1]] },
    { em: orm.em },
  );
  const partner1 = wrap(new Partner()).assign(
    {
      ...partner1Fixture,
      vertical: verticals[0],
      services: [services[0], services[2]],
      requirementTypes: [requirementTypes[0]],
      clientTypes: [clientTypes[0], clientTypes[1]],
    },
    { em: orm.em },
  );
  const partner2 = wrap(new Partner()).assign(
    { ...partner2Fixture, vertical: verticals[1], services: [services[1], services[3]] },
    { em: orm.em },
  );

  const partner3 = wrap(new Partner()).assign({ ...partner3Fixture, vertical: vertical3Fixture }, { em: orm.em });

  await clientRepo.persistAndFlush([client1, client2]);
  await partnerRepo.persistAndFlush([partner1, partner2, partner3]);

  // Partner Locations
  const partnerLocations = partnerLocationFixtures.map((pl) => {
    return wrap(new PartnerLocation()).assign({ ...pl, partner: partner1 }, { em: orm.em });
  });

  await partnerLocationRepo.persistAndFlush(partnerLocations);

  // Carbon Footprints
  const carbonFootprints = carbonFootprintFixtures.map((cf) => {
    return wrap(new CarbonFootprint()).assign({ ...cf, client: client1 }, { em: orm.em });
  });

  await carbonFootprintRepo.persistAndFlush(carbonFootprints);

  // Projects

  const projects = projectFixtures.map((p, i) => {
    return wrap(new Project()).assign(
      { ...p, projectType: projectTypes[i], client: i % 2 === 0 ? client1 : client2 },
      { em: orm.em },
    );
  });

  await projectRepo.persistAndFlush(projects);

  // Requirements

  const requirements = requirementFixtures.map((r, i) => {
    let projectIndexToAdd = i;
    let requirementTypeIndexToAdd = i;
    if (i === 4) {
      projectIndexToAdd = 0;
      requirementTypeIndexToAdd = 0;
    } else if (i === 5) {
      projectIndexToAdd = 1;
      requirementTypeIndexToAdd = 1;
    }
    const requirementToSave = wrap(new Requirement()).assign(
      {
        ...r,
        project: projects[projectIndexToAdd],
        requirementType: requirementTypes[requirementTypeIndexToAdd],
        partner: i % 2 === 0 ? partner1 : partner2,
        requestStatus: i < 2 ? RequirementRequestStatus.APPROVED : RequirementRequestStatus.PENDING,
      },
      { em: orm.em },
    );

    return requirementToSave;
  });

  await requirementRepo.persistAndFlush(requirements);

  // Requirement Documents
  const requirementDocuments = requirementDocumentFixtures.map((rd, i) => {
    return wrap(new RequirementDocument()).assign(
      {
        ...rd,
        requirement: i % 2 === 0 ? requirement1Fixture : requirement3Fixture,
      },
      { em: orm.em },
    );
  });

  await requirementDocumentRepo.persistAndFlush(requirementDocuments);

  // Users
  const adminUser = new User().assign({ ...adminUserFixture, ...{ salt, hash } });
  const client1User = wrap(new User()).assign(
    { ...client1UserFixture, ...{ salt, hash, client: client1 } },
    { em: orm.em },
  );
  const partner1User = wrap(new User()).assign(
    { ...partner1UserFixture, ...{ salt, hash, partner: partner1 } },
    { em: orm.em },
  );
  const client2User = wrap(new User()).assign(
    { ...client2UserFixture, ...{ salt, hash, client: client2 } },
    { em: orm.em },
  );
  const partner2User = wrap(new User()).assign(
    { ...partner2UserFixture, ...{ salt, hash, partner: partner2 } },
    { em: orm.em },
  );
  const partner3User = wrap(new User()).assign(
    { ...partner3UserFixture, ...{ salt, hash, partner: partner3 } },
    { em: orm.em },
  );
  const deactivateUser = new User().assign({ ...deactivateUserFixture, ...{ salt, hash } });

  await userRepo.persistAndFlush([
    adminUser,
    client1User,
    client2User,
    partner1User,
    partner2User,
    partner3User,
    deactivateUser,
  ]);

  process.exit(0);
}
