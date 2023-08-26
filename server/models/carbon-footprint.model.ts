import { EntityManager, FilterQuery, FindOptions, QueryOrder } from '@mikro-orm/core';
import { SqlEntityRepository } from '@mikro-orm/postgresql';
import { CarbonFootprint } from '../entities';
import { ModelSortOrder, modelSortOrderToQueryOrderMap } from './utils';

export class CarbonFootprintModel {
  repo: SqlEntityRepository<CarbonFootprint>;

  constructor(em: EntityManager) {
    this.repo = em.getRepository(CarbonFootprint);
  }

  fetch(options: { clientId: string; carbonFootprintId: string }) {
    return this.repo.findOneOrFail({ client: options.clientId, uuid: options.carbonFootprintId });
  }

  fetchLatestForClient(options: { clientId: string }) {
    return this.repo.find({ client: options.clientId }, { orderBy: { createdAt: QueryOrder.DESC }, limit: 1 });
  }

  fetchAll(options: { clientId: string; orderBy?: ModelSortOrder[] }) {
    const where: FilterQuery<CarbonFootprint> = {
      client: options.clientId,
    };
    const findOptions: FindOptions<CarbonFootprint> = {
      orderBy: modelSortOrderToQueryOrderMap(options.orderBy),
    };
    if (!options.orderBy) {
      delete findOptions.orderBy;
    }

    return this.repo.find(where, findOptions);
  }
}
