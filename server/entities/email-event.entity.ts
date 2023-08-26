import { Entity, Index, Property } from '@mikro-orm/core';

import { BaseEntity } from './base.entity';

export enum EmailEventType {
  BOUNCE = 'Bounce',
  COMPLAINT = 'Complaint',
}

@Entity()
export class EmailEvent extends BaseEntity<EmailEvent> {
  @Property()
  @Index()
  public email!: string;

  @Property()
  public type: EmailEventType;

  @Property()
  meta: string;

  @Property()
  receivedAt: Date = new Date();
}
