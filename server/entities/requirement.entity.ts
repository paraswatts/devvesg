import { Entity, ManyToOne, OneToMany, Property, Collection, QueryOrder } from '@mikro-orm/core';

import { BaseEntity } from './base.entity';
import { Partner } from './partner.entity';
import { RequirementDocument } from './requirement-document.entity';
import { Project } from './project.entity';
import { RequirementType } from './requirement-type.entity';

export enum RequirementStatuses {
  DONE = 'done',
  IN_PROGRESS = 'inprogress',
  NOT_STARTED = 'notstarted',
  ON_HOLD = 'onhold',
}

export enum RequirementRequestStatus {
  UNASSIGNED = 'unassigned',
  PENDING = 'pending',
  APPROVED = 'approved',
}

@Entity()
export class Requirement extends BaseEntity<Requirement> {
  @Property()
  public name!: string;

  @Property({ columnType: 'text', default: '' })
  public description: string;

  @Property({ nullable: true })
  public startDate: Date;

  @Property({ nullable: true })
  public endDate: Date;

  @Property({ nullable: true })
  public projectCode: string;

  @Property({ nullable: true })
  public areaCode: string;

  @Property()
  public status: RequirementStatuses;

  @Property({ nullable: true })
  public hubspotDealId: string;

  @Property({ default: RequirementRequestStatus.UNASSIGNED })
  public requestStatus: RequirementRequestStatus;

  @ManyToOne(() => Partner, { nullable: true })
  partner: Partner;

  @ManyToOne(() => Project)
  project: Project;

  @ManyToOne(() => RequirementType, { nullable: true })
  requirementType: RequirementType;

  @OneToMany(() => RequirementDocument, (d) => d.requirement, { orderBy: { createdAt: QueryOrder.ASC } })
  requirementDocuments: Collection<RequirementDocument> = new Collection<RequirementDocument>(this);
}
