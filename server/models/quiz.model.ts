import { SqlEntityRepository } from '@mikro-orm/postgresql';
import { EntityManager, FilterQuery } from '@mikro-orm/core';
import { Quiz } from '../entities';

export class QuizModel {
  repo: SqlEntityRepository<Quiz>;

  constructor(em: EntityManager) {
    this.repo = em.getRepository(Quiz);
  }

  fetchAll() {
    return this.repo.findAll();
  }

  fetch(options: { quizId?: string; }) {
    const where: FilterQuery<Quiz> = {
      uuid: options.quizId,
    };
    if (!options.quizId) {
      delete where.uuid;
    }
    return this.repo.findOne(where);
  }
}
