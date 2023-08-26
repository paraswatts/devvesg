import { SqlEntityRepository } from '@mikro-orm/postgresql';
import { EntityManager, FilterQuery } from '@mikro-orm/core';
import { NftType } from '../entities/nft-type.entity';

export class CreditTypeModel {
    repo: SqlEntityRepository<NftType>;

    constructor(em: EntityManager) {
        this.repo = em.getRepository(NftType);
    }

    fetch(options: { creditTypeId: string }) {
        const where: FilterQuery<NftType> = {
            uuid: options.creditTypeId,
        };
        return this.repo.findOne(where);
    }
}