import { Collection, Entity, OneToMany, Property, Unique } from '@mikro-orm/core';
import { Client } from '.';

import { BaseEntity } from './base.entity';

@Entity()
export class Vertical extends BaseEntity<Vertical> {
  @Property()
  @Unique()
  public name!: string;

  @OneToMany(() => Client, (c) => c.vertical)
  clients: Collection<Client> = new Collection<Client>(this);
}
