import { Entity, ManyToOne, Property } from '@mikro-orm/core';

import { BaseEntity } from './base.entity';
import { Client } from '.';

@Entity()
export class ClientLocation extends BaseEntity<ClientLocation> {
  @Property()
  public country!: string;

  @Property()
  public province!: string;

  @ManyToOne(() => Client, { nullable: true })
  client: Client;
}
