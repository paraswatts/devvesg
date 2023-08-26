import { Collection, Entity, ManyToMany, Property, Unique } from '@mikro-orm/core';

import { BaseEntity } from './base.entity';
import { Partner } from './partner.entity';

@Entity()
export class Service extends BaseEntity<Service> {
  @Property()
  @Unique()
  public name!: string;

  @ManyToMany(() => Partner, (p) => p.services)
  partners: Collection<Partner> = new Collection<Partner>(this);
}
