import { Collection, Entity, OneToMany, Property, Unique } from "@mikro-orm/core";
import { BaseEntity } from "./base.entity";
import { Nft } from "./nft.entity";

@Entity()
export class CreditType extends BaseEntity<CreditType>{

    @Property()
    @Unique()
    public name: string;

    @Property()
    public description: string;

    @Property()
    public type: string;

    @OneToMany(() => Nft, (p) => p.creditType)
    projects: Collection<Nft> = new Collection<Nft>(this);

}
