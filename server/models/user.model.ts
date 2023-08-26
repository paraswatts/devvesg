import { SqlEntityRepository } from '@mikro-orm/postgresql';
import { EntityManager, FilterQuery } from '@mikro-orm/core';
import { User } from '../entities';

export class UserModel {
  repo: SqlEntityRepository<User>;

  constructor(em: EntityManager) {
    this.repo = em.getRepository(User);
  }

  fetch(options: { userId: string }) {
    const where: FilterQuery<User> = {
      uuid: options.userId,
    };
    return this.repo.findOne(where);
  }
}
