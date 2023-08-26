import { Collection, Entity, ManyToOne, OneToMany, Property, QueryOrder } from '@mikro-orm/core';

import { BaseEntity } from './base.entity';
import { Client } from './client.entity';
import { Requirement } from './requirement.entity';
import { ProjectType } from './project-type.entity';

export enum ProjectStatuses {
  DONE = 'done',
  IN_PROGRESS = 'inprogress',
  NOT_STARTED = 'notstarted',
  ON_HOLD = 'onhold',
}

@Entity()
export class Project extends BaseEntity<Project> {
  @Property()
  public name!: string;

  @Property({ columnType: 'text', default: '' })
  public description: string;

  @Property({ default: ProjectStatuses.NOT_STARTED })
  public status: ProjectStatuses;

  @Property({ nullable: true })
  public startDate: Date;

  @Property({ nullable: true })
  public endGoalDate: Date;

  @Property({ nullable: true })
  public completionDate: Date;

  @ManyToOne(() => Client)
  client!: Client;

  @ManyToOne(() => ProjectType)
  projectType!: ProjectType;

  @OneToMany(() => Requirement, (r) => r.project, { orderBy: { name: QueryOrder.ASC } })
  requirements: Collection<Requirement> = new Collection<Requirement>(this);
}
