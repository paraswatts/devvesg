import { SqlEntityRepository } from '@mikro-orm/postgresql';
import { EntityManager, FilterQuery, QueryOrder } from '@mikro-orm/core';
import { ProjectType } from '../entities';

export class ProjectTypeModel {
  repo: SqlEntityRepository<ProjectType>;

  constructor(em: EntityManager) {
    this.repo = em.getRepository(ProjectType);
  }

  fetchAll(options: { initiativeId?: string }) {
    const where: FilterQuery<ProjectType> = {
      initiative: options.initiativeId,
    };
    if (!options.initiativeId) {
      delete where.initiative;
    }
    return this.repo.find(where, { orderBy: { name: QueryOrder.ASC } });
  }

  fetch(options: { projectTypeId: string }) {
    const where: FilterQuery<ProjectType> = {
      uuid: options.projectTypeId,
    };
    return this.repo.findOneOrFail(where);
  }
}
