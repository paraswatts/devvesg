import { SqlEntityRepository } from '@mikro-orm/postgresql';
import { EntityManager, FilterQuery } from '@mikro-orm/core';
import { ClientLocation } from '../entities/client-location.entity';

export class ClientLocationModel {
  repo: SqlEntityRepository<ClientLocation>;

  constructor(em: EntityManager) {
    this.repo = em.getRepository(ClientLocation);
  }

  fetchAll(options: { clientId: string }) {
    const where: FilterQuery<ClientLocation> = {
      client: options.clientId,
    };
    return this.repo.find(where);
  }
}
