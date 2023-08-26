import { SqlEntityRepository } from '@mikro-orm/postgresql';
import { EntityManager, FilterQuery } from '@mikro-orm/core';
import { QuizInstanceAnswer } from '../entities';

export class QuizQuestionAnswerModel {
  repo: SqlEntityRepository<QuizInstanceAnswer>;

  constructor(em: EntityManager) {
    this.repo = em.getRepository(QuizInstanceAnswer);
  }

  fetchAll(options: { quizInstanceId?: string }) {
    const where: FilterQuery<QuizInstanceAnswer> = {
      quizInstance: options.quizInstanceId,
    };

    if (!options.quizInstanceId) {
      delete where.quizInstance;
    }

    return this.repo.find(where);
  }
  fetchByQuestion(options: { quizQuestionId?: string }) {
    const where: FilterQuery<QuizInstanceAnswer> = {
      quizQuestion: options.quizQuestionId,
    };

    if (!options.quizQuestionId) {
      delete where.quizQuestion;
    }

    return this.repo.find(where);
  }
}
