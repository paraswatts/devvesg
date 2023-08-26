import { SqlEntityRepository } from '@mikro-orm/postgresql';
import { EntityManager, FilterQuery } from '@mikro-orm/core';
import { NftType } from '../entities/nft-type.entity';

export class NftTypeModel {
    repo: SqlEntityRepository<NftType>;
    
    constructor(em: EntityManager) {
        this.repo = em.getRepository(NftType);
    }

    fetch(options: { nftTypeId: string }) {
        const where: FilterQuery<NftType> = {
            uuid: options.nftTypeId,
        };
        return this.repo.findOne(where);
    }
}