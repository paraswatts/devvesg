import { Entity, Property, ManyToOne } from '@mikro-orm/core';
import { v4 as uuid } from 'uuid';

import { BaseEntity } from './base.entity';
import { Requirement } from './requirement.entity';
import { getSignedUrl } from '../config/s3';
import { MediaEntityTypes } from '../interfaces';

export enum RequirementDocumentTypes {
  FILE = 'file',
  URL = 'url',
}

@Entity()
export class RequirementDocument extends BaseEntity<RequirementDocument> {
  @Property()
  public name!: string;

  @Property()
  public type: RequirementDocumentTypes;

  @Property({ nullable: true })
  public file: string;

  @Property()
  public mediaUuid: string = uuid();

  @ManyToOne(() => Requirement)
  requirement: Requirement;

  public signMedia() {
    this.file = getSignedUrl(this.file, MediaEntityTypes.REQUIREMENT_DOCUMENT, 'file', this.mediaUuid);
  }
}
