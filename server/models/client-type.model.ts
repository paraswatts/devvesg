import { SqlEntityRepository } from '@mikro-orm/postgresql';
import { EntityManager, FilterQuery, FindOptions } from '@mikro-orm/core';
import { ClientType } from '../entities';
import { ModelSortOrder, modelSortOrderToQueryOrderMap } from './utils';

export class ClientTypeModel {
  repo: SqlEntityRepository<ClientType>;

  constructor(em: EntityManager) {
    this.repo = em.getRepository(ClientType);
  }

  fetchAll(options: { orderBy?: ModelSortOrder[]; id?: string[]; partnerId?: string } = {}) {
    const findOptions: FindOptions<ClientType> = {
      orderBy: modelSortOrderToQueryOrderMap(options.orderBy),
    };
    const where: FilterQuery<ClientType> = {
      uuid: options.id,
      partners: { uuid: options.partnerId },
    };
    if (!options.id) {
      delete where.uuid;
    }
    if (!options.partnerId) {
      delete where.partners;
    }
    if (!findOptions.orderBy) {
      delete findOptions.orderBy;
    }
    return this.repo.find(where, findOptions);
  }

  fetch(options: { clientTypeId: string }) {
    const where: FilterQuery<ClientType> = {
      uuid: options.clientTypeId,
    };
    return this.repo.findOneOrFail(where);
  }
}
