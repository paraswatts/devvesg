import { Collection, Entity, OneToMany, Property, Unique } from "@mikro-orm/core";
import { BaseEntity } from "./base.entity";
import { Nft } from "./nft.entity";

@Entity()
export class NftType extends BaseEntity<NftType>{

    @Property()
    @Unique()
    public name: string;

    @Property()
    public description: string;
}
