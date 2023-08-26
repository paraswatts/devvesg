import { SqlEntityRepository } from '@mikro-orm/postgresql';
import { EntityManager, FilterQuery } from '@mikro-orm/core';
import { Nft } from '../entities/nft.entity';

export class NftModel {
    repo: SqlEntityRepository<Nft>;

    constructor(em: EntityManager) {
        this.repo = em.getRepository(Nft);
    }

    fetch(options: { nftId: string }) {
        const where: FilterQuery<Nft> = {
            uuid: options.nftId,
        };
        return this.repo.findOne(where);
    }
}
