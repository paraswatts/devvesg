import { Collection, Entity, OneToMany, Property } from '@mikro-orm/core';
import { v4 as uuid } from 'uuid';

import { BaseEntity } from './base.entity';
import { ProjectType } from './project-type.entity';
import { getSignedUrl } from '../config/s3';
import { MediaEntityTypes } from '../interfaces';

@Entity()
export class Initiative extends BaseEntity<Initiative> {
  @Property()
  public name!: string;

  @Property({ columnType: 'text', default: '' })
  public objective: string;

  @Property()
  public logo: string;

  @Property()
  public onboardingLogo: string;

  @Property()
  public mediaUuid: string = uuid();

  @OneToMany(() => ProjectType, (pt) => pt.initiative)
  projectTypes: Collection<ProjectType> = new Collection<ProjectType>(this);

  public signMedia() {
    this.logo = getSignedUrl(this.logo, MediaEntityTypes.INITIATIVE, 'logo', this.mediaUuid);
    this.onboardingLogo = getSignedUrl(
      this.onboardingLogo,
      MediaEntityTypes.INITIATIVE,
      'onboardingLogo',
      this.mediaUuid,
    );
  }
}
