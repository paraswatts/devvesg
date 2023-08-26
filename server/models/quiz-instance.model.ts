import { SqlEntityRepository } from '@mikro-orm/postgresql';
import { EntityManager, FilterQuery, FindOptions } from '@mikro-orm/core';
import { QuizInstance } from '../entities';
import { ModelSortOrder, modelSortOrderToQueryOrderMap } from './utils';

export class QuizInstanceModal {
  repo: SqlEntityRepository<QuizInstance>;

  constructor(em: EntityManager) {
    this.repo = em.getRepository(QuizInstance);
  }

  fetchAll() {
    return this.repo.findAll();
  }

  fetchPending(options: { quizId?: string; status?: string, clientId?: string, orderBy?: ModelSortOrder[], limit?: number }) {
    const where: FilterQuery<QuizInstance> = {
      quiz: options.quizId,
      status: options.status,
      client: options.clientId
    };

    const findOptions: FindOptions<QuizInstance> = {
      orderBy: modelSortOrderToQueryOrderMap(options.orderBy),
    };

    if (!options.quizId) {
      delete where.quiz;
    }
    if (!options.status) {
      delete where.status;
    }
    if (!options.clientId) {
      delete where.client;
    }
    if (!options.orderBy) {
      delete findOptions.orderBy;
    }
    return this.repo.find(where, findOptions);
  }
}
