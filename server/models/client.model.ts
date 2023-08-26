import { SqlEntityRepository } from '@mikro-orm/postgresql';
import { EntityManager, FilterQuery } from '@mikro-orm/core';
import { Client } from '../entities';

export class ClientModel {
  repo: SqlEntityRepository<Client>;

  constructor(em: EntityManager) {
    this.repo = em.getRepository(Client);
  }

  fetch(options: { id: string }) {
    const where: FilterQuery<Client> = {
      uuid: options.id,
    };
    return this.repo.findOne(where);
  }
}
