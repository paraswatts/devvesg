import { SqlEntityRepository } from '@mikro-orm/postgresql';
import { EntityManager, FilterQuery, FindOptions } from '@mikro-orm/core';
import { QuizSection } from '../entities';
import { ModelSortOrder, modelSortOrderToQueryOrderMap } from './utils';

export class QuizSectionModel {
  repo: SqlEntityRepository<QuizSection>;

  constructor(em: EntityManager) {
    this.repo = em.getRepository(QuizSection);
  }

  fetchAll(options: { quizId?: string, orderBy?: ModelSortOrder[] }) {
    const findOptions: FindOptions<QuizSection> = {
      orderBy: modelSortOrderToQueryOrderMap(options.orderBy),
    };
    const where: FilterQuery<QuizSection> = {
      quiz: options.quizId,
    };
    if (!options.quizId) {
      delete where.quiz;
    }
    if (!options.orderBy) {
      delete findOptions.orderBy;
    }
    return this.repo.find(where, findOptions);
  }
}
