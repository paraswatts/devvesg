import { SqlEntityRepository } from '@mikro-orm/postgresql';
import { EntityManager, FilterQuery } from '@mikro-orm/core';
import { PartnerLocation } from '../entities';

export class PartnerLocationModel {
  repo: SqlEntityRepository<PartnerLocation>;

  constructor(em: EntityManager) {
    this.repo = em.getRepository(PartnerLocation);
  }

  fetchAll(options: { partnerId: string }) {
    const where: FilterQuery<PartnerLocation> = {
      partner: options.partnerId,
    };
    return this.repo.find(where);
  }
}
