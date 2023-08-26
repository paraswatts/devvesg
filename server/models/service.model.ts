import { EntityManager, FilterQuery } from '@mikro-orm/core';
import { SqlEntityRepository } from '@mikro-orm/postgresql';

import { Service } from '../entities';

export class ServiceModel {
  repo: SqlEntityRepository<Service>;

  constructor(em: EntityManager) {
    this.repo = em.getRepository(Service);
  }

  fetchAll(options: { partnerId?: string }) {
    const where: FilterQuery<Service> = {
      partners: [options.partnerId],
    };
    if (!options.partnerId) {
      delete where.partners;
    }
    return this.repo.find(where);
  }
}
