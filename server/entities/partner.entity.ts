import { Collection, Entity, Filter, ManyToMany, ManyToOne, OneToMany, OneToOne, Property } from '@mikro-orm/core';
import { v4 as uuid } from 'uuid';

import { BaseEntity } from './base.entity';
import { User } from './user.entity';
import { Service } from './service.entity';
import { Requirement } from './requirement.entity';
import { getSignedUrl } from '../config/s3';
import { MediaEntityTypes } from '../interfaces';
import { RequirementType, Vertical } from '.';
import { PartnerLocation } from './partner-location.entity';
import { ClientType } from './client-type.entity';
import { ApprovalStatuses } from '../enums';
import { Wallet } from './wallet.entity';
@Entity()
@Filter({ name: 'isApproved', cond: { approvalStatus: ApprovalStatuses.APPROVED } })
export class Partner extends BaseEntity<Partner> {
  @Property()
  public name!: string;

  @Property({ columnType: 'text', default: '' })
  public description: string;

  @Property({ nullable: true })
  public logo: string;

  @Property()
  public contactEmail: string;

  @Property()
  public websiteUrl: string;

  @Property({ nullable: true })
  public contactPhoneNumber: string;

  @Property({ nullable: true })
  public twitterUrl: string;

  @Property({ nullable: true })
  public facebookUrl: string;

  @Property({ nullable: true })
  public linkedInUrl: string;

  @Property({ nullable: true })
  public marketingDisabledAt: Date;

  @Property({ nullable: true })
  public country: string;

  @Property({ nullable: true })
  public province: string;

  @ManyToOne(() => Vertical, { nullable: true })
  public vertical: Vertical;

  @OneToMany(() => PartnerLocation, (loc) => loc.partner)
  public serviceLocations: Collection<PartnerLocation> = new Collection<PartnerLocation>(this);

  @ManyToMany(() => ClientType, (type) => type.partners, { owner: true })
  public clientTypes: Collection<ClientType> = new Collection<ClientType>(this);

  @Property({ nullable: true })
  public projectTimeline: number;

  @Property({ columnType: 'text', nullable: true })
  public approvalStatus: ApprovalStatuses;

  @Property({ nullable: true })
  hubspotId: string;

  @ManyToMany(() => RequirementType, (s) => s.partners, { nullable: true })
  requirementTypes: Collection<RequirementType> = new Collection<RequirementType>(this);

  @Property()
  public mediaUuid: string = uuid();

  @OneToMany(() => Requirement, (r) => r.partner)
  requirements: Collection<Requirement> = new Collection<Requirement>(this);

  @OneToMany(() => User, (u) => u.partner)
  users: Collection<User> = new Collection<User>(this);

  @ManyToMany(() => Service, (s) => s.partners, { owner: true })
  services: Collection<Service> = new Collection<Service>(this);

  @OneToOne(() => Wallet, (wallet) => wallet.partner)
  wallet!: Wallet;

  public signMedia() {
    this.logo = getSignedUrl(this.logo, MediaEntityTypes.PARTNER, 'logo', this.mediaUuid);
  }
}
