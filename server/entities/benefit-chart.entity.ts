import { Entity, ManyToOne, Property } from '@mikro-orm/core';

import { BaseEntity } from './base.entity';
import { Project } from './project.entity';

export enum BenefitChartTrends {
  UP = 'up',
  DOWN = 'down',
  NONE = 'none',
}

/*
 * Deprecated
 *
 * This is a deprecated model and is not currently used in the application
 */
@Entity()
export class BenefitChart extends BaseEntity<BenefitChart> {
  @Property()
  public name!: string;

  @Property()
  public value: string;

  @Property()
  public unit: string;

  @Property()
  public percentage: number;

  @Property()
  public trend: BenefitChartTrends;

  @ManyToOne(() => Project)
  project: Project;
}
