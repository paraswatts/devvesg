import { SqlEntityRepository } from '@mikro-orm/postgresql';
import { EntityManager, FilterQuery } from '@mikro-orm/core';
import { RequirementType } from '../entities';

export class RequirementTypeModel {
  repo: SqlEntityRepository<RequirementType>;

  constructor(em: EntityManager) {
    this.repo = em.getRepository(RequirementType);
  }

  fetchAll(options: { projectTypeId?: string; partnerId?: string }) {
    const where: FilterQuery<RequirementType> = {
      projectType: options.projectTypeId,
      partners: { uuid: options.partnerId },
    };
    if (!options.partnerId) {
      delete where.partners;
    }
    if (!options.projectTypeId) {
      delete where.projectType;
    }
    return this.repo.find(where);
  }

  fetch(options: { requirementTypeId: string }) {
    const where: FilterQuery<RequirementType> = {
      uuid: options.requirementTypeId,
    };
    return this.repo.findOne(where);
  }
}
