import { SqlEntityRepository } from '@mikro-orm/postgresql';
import { EntityManager, FilterQuery, FindOptions } from '@mikro-orm/core';
import { Project } from '../entities';
import { ModelSortOrder, modelSortOrderToQueryOrderMap } from './utils';

export class ProjectModel {
  repo: SqlEntityRepository<Project>;

  constructor(em: EntityManager) {
    this.repo = em.getRepository(Project);
  }

  fetchAll(options: { clientId?: string; orderBy?: ModelSortOrder[] }) {
    const where: FilterQuery<Project> = {
      client: options.clientId,
    };
    const findOptions: FindOptions<Project> = {
      orderBy: modelSortOrderToQueryOrderMap(options.orderBy),
    };
    if (!options.clientId) {
      delete where.client;
    }
    if (!options.orderBy) {
      delete findOptions.orderBy;
    }
    return this.repo.find(where, findOptions);
  }

  fetch(options: { projectId: string; clientId?: string }) {
    const where: FilterQuery<Project> = {
      uuid: options.projectId,
      client: options.clientId,
    };
    if (!options.clientId) {
      delete where.client;
    }
    return this.repo.findOneOrFail(where);
  }
}
