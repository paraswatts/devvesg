import { SqlEntityRepository } from '@mikro-orm/postgresql';
import { EntityManager, FilterQuery } from '@mikro-orm/core';
import { QuizQuestionDependencies } from '../entities';

export class QuizQuestionDependenciesModel {
  repo: SqlEntityRepository<QuizQuestionDependencies>;

  constructor(em: EntityManager) {
    this.repo = em.getRepository(QuizQuestionDependencies);
  }

  fetchAll() {
    return this.repo.find({});
  }
}
