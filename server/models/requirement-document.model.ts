import { SqlEntityRepository } from '@mikro-orm/postgresql';
import { EntityManager, FilterQuery } from '@mikro-orm/core';
import { RequirementDocument } from '../entities';

export class RequirementDocumentModel {
  repo: SqlEntityRepository<RequirementDocument>;

  constructor(em: EntityManager) {
    this.repo = em.getRepository(RequirementDocument);
  }

  fetchAll(options: { requirementId: string }) {
    const where: FilterQuery<RequirementDocument> = {
      requirement: options.requirementId,
    };
    return this.repo.find(where);
  }
}
