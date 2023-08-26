import { SqlEntityRepository } from '@mikro-orm/postgresql';
import { EntityManager, FilterQuery, FindOptions } from '@mikro-orm/core';
import { Partner } from '../entities';
import { ModelSortOrder, modelSortOrderToQueryOrderMap } from './utils';

export class PartnerModel {
  repo: SqlEntityRepository<Partner>;

  constructor(em: EntityManager) {
    this.repo = em.getRepository(Partner);
  }

  fetch(options: { partnerId: string }) {
    const where: FilterQuery<Partner> = {
      uuid: options.partnerId,
    };
    return this.repo.findOne(where);
  }

  fetchAll(options: { requirementTypeId: string; orderBy?: ModelSortOrder[] }) {
    const where: FilterQuery<Partner> = {
      requirementTypes: [options.requirementTypeId],
    };
    const findOptions: FindOptions<Partner> = {
      filters: ['isApproved'],
      orderBy: modelSortOrderToQueryOrderMap(options.orderBy),
    };
    if (!options.requirementTypeId) {
      delete where.requirementTypes;
    }
    if (!options.orderBy) {
      delete findOptions.orderBy;
    }
    return this.repo.find(where, findOptions);
  }
}
