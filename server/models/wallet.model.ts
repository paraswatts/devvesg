import { SqlEntityRepository } from '@mikro-orm/postgresql';
import { EntityManager, FilterQuery } from '@mikro-orm/core';
import { Wallet } from '../entities';

export class WalletModel {
  repo: SqlEntityRepository<Wallet>;

  constructor(em: EntityManager) {
    this.repo = em.getRepository(Wallet);
  }

  fetch(options: { walletId: string }) {
    const where: FilterQuery<Wallet> = {
      uuid: options.walletId,
    };
    return this.repo.findOne(where);
  }
}
