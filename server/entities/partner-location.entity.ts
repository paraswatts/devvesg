import { Entity, ManyToOne, Property } from '@mikro-orm/core';

import { BaseEntity } from './base.entity';
import { Partner } from '.';

@Entity()
export class PartnerLocation extends BaseEntity<PartnerLocation> {
  @Property()
  public country!: string;

  @Property()
  public province!: string;

  @ManyToOne(() => Partner, { nullable: true })
  partner: Partner;
}
