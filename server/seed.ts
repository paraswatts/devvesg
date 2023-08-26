if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

import { Collection, MikroORM } from '@mikro-orm/core';
import fs from 'fs';
import path from 'path';

import { generatePassword } from './lib/util';
import {
  Client,
  Initiative,
  Partner,
  ProjectType,
  RequirementType,
  Service,
  User,
  UserTypes,
  Vertical,
} from './entities';
import { MediaEntityTypes } from './interfaces';
import { uploadFile } from './config/s3';
import { PARTNERS, SeedPartner } from './seed-data/partners';
import { SERVICES } from './seed-data/services';
import { RelationshipTypes, SeedData } from './seed-data/interface';
import { REQUIREMENT_TYPES, SeedRequirementType } from './seed-data/requirement-types';
import { PROJECT_TYPES, SeedProjectType } from './seed-data/project-types';
import { INITIATIVES, SeedInitiative } from './seed-data/initiatives';
import { VERTICALS } from './seed-data/verticals';

seed();

// The super duper magical function to seed our DB, as long as everything's in the right format
async function createItemsAndAssignRelationship(
  JSON_DATA: SeedData<SeedPartner | SeedRequirementType | SeedProjectType | SeedInitiative>,
  ClassName: new () => Partner | RequirementType | ProjectType | Initiative | Client,
  relationshipKeys: RelationshipTypes[],
  relationshipEntries: any[],
  entityType?: MediaEntityTypes,
) {
  // To be the final items we will persist
  const finalArray: Array<Promise<SeedPartner | SeedRequirementType | SeedProjectType | SeedInitiative>> = [];
  // Pass in one of the seed-data consts
  Object.keys(JSON_DATA).forEach((key, index) => {
    const promise = new Promise<SeedPartner | SeedRequirementType | SeedProjectType | SeedInitiative>(async (res) => {
      // Instantiate a version of the entity class and assign the seed data to it.
      // Give it a special key so we can parse relationships.
      const thisItem = (new ClassName() as any).assign({ ...JSON_DATA[key].data, seedId: key });
      if (JSON_DATA[key].relationships) {
        relationshipKeys.forEach((relationshipKey) => {
          JSON_DATA[key].relationships[relationshipKey]?.length
          const relationships = JSON_DATA[key].relationships ? JSON_DATA[key].relationships[relationshipKey] : [];
          // Parse the relationship and add the relevant entity (relationshipEntries) to the relevant key
          relationships?.length && relationships.forEach((relationship) => {
            const itemToAdd = relationshipEntries.find((item) => item.seedId === relationship);
            (thisItem[relationshipKey] as Collection<any>).add(itemToAdd);
          });
        })

      }
      // If a logo is available, seed it
      if (thisItem.logo && entityType) {
        const fileName = `${key}-logo.png`;
        const file: Express.Multer.File = {
          buffer: fs.readFileSync(path.join(__dirname, 'seed-data', 'images', entityType, fileName)),
          originalname: fileName,
        } as Express.Multer.File;
        const logoUrl = await uploadFile(file, entityType, 'logo', thisItem.mediaUuid);
        thisItem.logo = logoUrl.Location;
      }

      if (thisItem.onboardingLogo && entityType) {
        const fileName = `${key}-onboardingLogo.jpg`;
        const file: Express.Multer.File = {
          buffer: fs.readFileSync(path.join(__dirname, 'seed-data', 'images', entityType, fileName)),
          originalname: fileName,
        } as Express.Multer.File;
        const logoUrl = await uploadFile(file, entityType, 'onboardingLogo', thisItem.mediaUuid);
        thisItem.onboardingLogo = logoUrl.Location;
      }
      res(thisItem);
    });
    finalArray.push(promise);
  });
  return Promise.all(finalArray);
}

async function seed() {
  const orm = await MikroORM.init();
  const initiativeRepo = orm.em.getRepository(Initiative);
  const partnerRepo = orm.em.getRepository(Partner);
  const projectTypeRepo = orm.em.getRepository(ProjectType);
  const requirementTypeRepo = orm.em.getRepository(RequirementType);
  const serviceRepo = orm.em.getRepository(Service);
  const userRepo = orm.em.getRepository(User);
  const verticalRepo = orm.em.getRepository(Vertical);

  /**
   * ORDER OF OPERATIONS:
   * 1. Create services and persist
   * 2. Create partners
   * 3. Add services to partners and persist partners
   * 4. Create Requirement Types
   * 5. Add partners to requirement types and persist requirement types
   * 6. Create project types
   * 7. Add requirement types to project types and persist project types
   * 8. Create Initiatives
   * 9. Add project types to initiatives and persist initiatives
   * 10. Add verticals
   * 11. Add admin user

   */

  // 1. Services
  const services: { name: string }[] = [];
  Object.values(SERVICES).forEach((service) => {
    services.push(new Service().assign({ name: service, seedId: service }));
  });
  await serviceRepo.persist(services);

  // 2. & 3. Partners
  const partners: SeedPartner[] = (await createItemsAndAssignRelationship(
    PARTNERS,
    Partner,
    [RelationshipTypes.services],
    services,
    MediaEntityTypes.PARTNER,
  )) as SeedPartner[];
  await partnerRepo.persist(partners);

  // 4. & 5. Requirement Types

  const requirementTypes: SeedRequirementType[] = (await createItemsAndAssignRelationship(
    REQUIREMENT_TYPES,
    RequirementType,
    [RelationshipTypes.partners],
    partners,
  )) as SeedRequirementType[];
  await requirementTypeRepo.persist(requirementTypes);

  // 6. & 7. Project types
  const projectTypes: SeedProjectType[] = (await createItemsAndAssignRelationship(
    PROJECT_TYPES,
    ProjectType,
    [RelationshipTypes.requirementTypes],
    requirementTypes,
    MediaEntityTypes.PROJECT_TYPE,
  )) as SeedProjectType[];
  await projectTypeRepo.persist(projectTypes);

  // 8. & 9. Initiatives

  const initiatives = (await createItemsAndAssignRelationship(
    INITIATIVES,
    Initiative,
    [RelationshipTypes.projectTypes],
    projectTypes,
    MediaEntityTypes.INITIATIVE,
  )) as SeedInitiative[];
  await initiativeRepo.persist(initiatives);

  //10. Verticals

  const verticals: { name: string }[] = [];
  Object.values(VERTICALS).forEach((vert) => {
    verticals.push(new Vertical().assign({ name: vert }));
  });
  await verticalRepo.persist(verticals);

  //11. Admin user

  const { salt, hash } = generatePassword('P@ssword1');
  const adminUser = new User().assign({
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@devv.io',
    type: UserTypes.ADMIN,
    userAgreementCompleted: false,
    salt,
    hash,
  });
  await userRepo.persist([adminUser]);

  // End
  await orm.em.flush();

  process.exit(0);
}
