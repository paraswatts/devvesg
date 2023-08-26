import { Collection, Entity, ManyToOne, OneToMany, Property } from '@mikro-orm/core';
import { v4 as uuid } from 'uuid';
import { RequirementType } from '.';

import { getSignedUrl } from '../config/s3';
import { MediaEntityTypes } from '../interfaces';
import { BaseEntity } from './base.entity';
import { Initiative } from './initiative.entity';
import { Project } from './project.entity';

@Entity()
export class ProjectType extends BaseEntity<ProjectType> {
  @Property()
  public name!: string;

  @Property({ columnType: 'text', default: '' })
  public objective: string;

  @Property({ default: '' })
  public logo: string;

  @Property()
  public mediaUuid: string = uuid();

  @ManyToOne(() => Initiative)
  initiative: Initiative;

  @OneToMany(() => Project, (p) => p.projectType)
  projects: Collection<Project> = new Collection<Project>(this);

  @OneToMany(() => RequirementType, (rt) => rt.projectType)
  requirementTypes: Collection<RequirementType> = new Collection<RequirementType>(this);

  public signMedia() {
    this.logo = getSignedUrl(this.logo, MediaEntityTypes.PROJECT_TYPE, 'logo', this.mediaUuid);
  }
}
