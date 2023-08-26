import { Entity, ManyToOne, Property } from '@mikro-orm/core';

import { BaseEntity } from './base.entity';
import { Client } from '.';

@Entity()
export class CarbonFootprint extends BaseEntity<CarbonFootprint> {
  @Property()
  public total!: number;

  @ManyToOne(() => Client)
  client!: Client;
}
