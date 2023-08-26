import { SqlEntityRepository } from '@mikro-orm/postgresql';
import { EntityManager, FilterQuery, FindOptions } from '@mikro-orm/core';
import { Requirement, RequirementRequestStatus } from '../entities';
import { ModelSortOrder, modelSortOrderToQueryOrderMap } from './utils';

export class RequirementModel {
  repo: SqlEntityRepository<Requirement>;

  constructor(em: EntityManager) {
    this.repo = em.getRepository(Requirement);
  }

  fetchAll(options: {
    partnerId?: string;
    projectId?: string;
    requestStatus?: RequirementRequestStatus;
    orderBy?: ModelSortOrder[];
  }) {
    const where: FilterQuery<Requirement> = {
      partner: options.partnerId,
      project: options.projectId,
      requestStatus: options.requestStatus,
    };
    const findOptions: FindOptions<Requirement> = {
      orderBy: modelSortOrderToQueryOrderMap(options.orderBy),
    };
    if (!options.partnerId) {
      delete where.partner;
    }
    if (!options.projectId) {
      delete where.project;
    }
    if (!options.requestStatus) {
      delete where.requestStatus;
    }
    if (!options.orderBy) {
      delete findOptions.orderBy;
    }
    return this.repo.find(where, findOptions);
  }

  fetch(options: {
    requirementId: string;
    partnerId?: string;
    projectId?: string;
    requestStatus?: RequirementRequestStatus;
  }) {
    const where: FilterQuery<Requirement> = {
      uuid: options.requirementId,
      partner: options.partnerId,
      project: options.projectId,
      requestStatus: options.requestStatus,
    };
    if (!options.partnerId) {
      delete where.partner;
    }
    if (!options.projectId) {
      delete where.project;
    }
    if (!options.requestStatus) {
      delete where.requestStatus;
    }
    return this.repo.findOneOrFail(where);
  }
}
