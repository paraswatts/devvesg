import { Collection, Entity, ManyToMany, ManyToOne, OneToMany, Property } from '@mikro-orm/core';

import { Partner, ProjectType, Requirement } from '.';
import { BaseEntity } from './base.entity';

@Entity()
export class RequirementType extends BaseEntity<RequirementType> {
  @Property()
  public name!: string;

  @Property({ columnType: 'text', default: '' })
  public description: string;

  @Property({ default: 0 })
  public sortOrder: number;

  @ManyToOne(() => ProjectType)
  projectType!: ProjectType;

  @OneToMany(() => Requirement, (r) => r.requirementType)
  requirements: Collection<Requirement> = new Collection<Requirement>(this);

  @ManyToMany(() => Partner, (p) => p.requirementTypes, { owner: true })
  partners: Collection<Partner> = new Collection<Partner>(this);
}
