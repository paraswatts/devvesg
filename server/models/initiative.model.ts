import { SqlEntityRepository } from '@mikro-orm/postgresql';
import { EntityManager, FilterQuery } from '@mikro-orm/core';
import { Initiative } from '../entities';

export class InitiativeModel {
  repo: SqlEntityRepository<Initiative>;

  constructor(em: EntityManager) {
    this.repo = em.getRepository(Initiative);
  }

  fetchAll() {
    return this.repo.findAll();
  }

  fetch(options: { initiativeId?: string; projectTypeId?: string }) {
    const where: FilterQuery<Initiative> = {
      uuid: options.initiativeId,
      projectTypes: options.projectTypeId,
    };
    if (!options.initiativeId) {
      delete where.uuid;
    }
    if (!options.projectTypeId) {
      delete where.projectTypes;
    }
    return this.repo.findOne(where);
  }
}
