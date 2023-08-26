import { Collection, Entity, ManyToMany, OneToMany, Property, Unique } from '@mikro-orm/core';

import { BaseEntity } from './base.entity';
import { Client } from './client.entity';
import { Partner } from './partner.entity';

@Entity()
export class ClientType extends BaseEntity<ClientType> {
  @Property()
  @Unique()
  public name!: string;

  @ManyToMany(() => Partner, (p) => p.clientTypes)
  partners: Collection<Partner> = new Collection<Partner>(this);

  @OneToMany(() => Client, (c) => c.clientType)
  clients: Collection<Client> = new Collection<Client>(this);
}
