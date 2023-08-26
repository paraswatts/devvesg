import { SqlEntityRepository } from '@mikro-orm/postgresql';
import { EntityManager, FilterQuery } from '@mikro-orm/core';
import { Vertical } from '../entities';

export class VerticalModel {
  repo: SqlEntityRepository<Vertical>;

  constructor(em: EntityManager) {
    this.repo = em.getRepository(Vertical);
  }

  fetchAll() {
    return this.repo.findAll();
  }

  fetch(options: { verticalId: string }) {
    const where: FilterQuery<Vertical> = {
      uuid: options.verticalId,
    };
    return this.repo.findOne(where);
  }
}
