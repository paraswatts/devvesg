import { SqlEntityRepository } from '@mikro-orm/postgresql';
import { EntityManager, FilterQuery, FindOptions } from '@mikro-orm/core';
import { QuizQuestionOption } from '../entities';
import { ModelSortOrder, modelSortOrderToQueryOrderMap } from './utils';

export class QuizQuestionOptionModel {
  repo: SqlEntityRepository<QuizQuestionOption>;

  constructor(em: EntityManager) {
    this.repo = em.getRepository(QuizQuestionOption);
  }

  fetchAll(options: { quizQuestionId?: string, orderBy?: ModelSortOrder[] }) {
    const findOptions: FindOptions<QuizQuestionOption> = {
      orderBy: modelSortOrderToQueryOrderMap(options.orderBy),
    };
    const where: FilterQuery<QuizQuestionOption> = {
      quizQuestion: options.quizQuestionId,
    };
    if (!options.quizQuestionId) {
      delete where.quizQuestion;
    }
    if (!options.orderBy) {
      delete findOptions.orderBy;
    }
    return this.repo.find(where, findOptions);
  }
}
