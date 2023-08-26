import { SqlEntityRepository } from '@mikro-orm/postgresql';
import { EntityManager, FilterQuery, FindOptions } from '@mikro-orm/core';
import { QuizQuestion } from '../entities';
import { ModelSortOrder, modelSortOrderToQueryOrderMap } from './utils';

export class QuizQuestionModel {
  repo: SqlEntityRepository<QuizQuestion>;

  constructor(em: EntityManager) {
    this.repo = em.getRepository(QuizQuestion);
  }

  fetchAll(options: { quizSectionId?: string, orderBy?: ModelSortOrder[] }) {
    const findOptions: FindOptions<QuizQuestion> = {
      orderBy: modelSortOrderToQueryOrderMap(options.orderBy),
    };
    const where: FilterQuery<QuizQuestion> = {
      quizSection: options.quizSectionId,
    };
    if (!options.quizSectionId) {
      delete where.quizSection;
    }
    if (!options.orderBy) {
      delete findOptions.orderBy;
    }
    return this.repo.find(where, findOptions);
  }
}