import { Entity, ManyToOne, Property } from '@mikro-orm/core';

import { BaseEntity } from './base.entity';
import { Project } from './project.entity';

/*
 * Deprecated
 *
 * This is a deprecated model and is not currently used in the application
 */
@Entity()
export class Benefit extends BaseEntity<Benefit> {
  @Property()
  public name!: string;

  @Property()
  public value: string;

  @Property()
  public unit: string;

  @Property({ columnType: 'text', default: '' })
  public tooltip: string;

  @ManyToOne(() => Project)
  project: Project;
}
