import { Collection, Entity, ManyToOne, OneToMany, OneToOne, Property, QueryOrder } from '@mikro-orm/core';
import { v4 as uuid } from 'uuid';

import { BaseEntity } from './base.entity';
import { User } from './user.entity';
import { Project } from './project.entity';
import { getSignedUrl } from '../config/s3';
import { MediaEntityTypes } from '../interfaces';
import { ClientLocation } from './client-location.entity';
import { Vertical } from './vertical.entity';
import { ClientType } from './client-type.entity';
import { Wallet } from './wallet.entity';
import { QuizInstance } from './quiz-instance.entity';
import { CarbonFootprint } from './carbon-footprint.entity';

@Entity()
export class Client extends BaseEntity<Client> {
  @Property()
  public name!: string;

  @Property({ columnType: 'text', default: '' })
  public description: string;

  @Property({ nullable: true })
  public logo: string;

  @Property({ nullable: true })
  public stockTicker: string;

  @Property({ nullable: true })
  public report1: string;

  @Property({ nullable: true })
  public report2: string;

  @Property({ nullable: true })
  public contactEmail: string;

  @Property({ nullable: true })
  public websiteUrl: string;

  @ManyToOne(() => Vertical, { nullable: true })
  public vertical: Vertical;

  @ManyToOne(() => ClientType, { nullable: true })
  public clientType: ClientType;

  @OneToMany(() => ClientLocation, (loc) => loc.client)
  public clientLocations: Collection<ClientLocation> = new Collection<ClientLocation>(this);

  @Property({ nullable: true })
  public contactPhoneNumber: string;

  @Property({ nullable: true })
  public twitterUrl: string;

  @Property({ nullable: true })
  public linkedInUrl: string;

  @Property()
  public mediaUuid: string = uuid();

  @Property({ nullable: true, lazy: true })
  hubspotId: string;

  @OneToMany(() => User, (u) => u.client)
  users: Collection<User> = new Collection<User>(this);

  @OneToMany(() => Project, (p) => p.client, { orderBy: { name: QueryOrder.ASC } })
  projects: Collection<Project> = new Collection<Project>(this);

  @OneToOne(() => Wallet, (wallet) => wallet.client)
  wallet!: Wallet;
  @OneToMany(() => QuizInstance, (q) => q.client, { orderBy: { name: QueryOrder.ASC } })
  quizzes: Collection<QuizInstance> = new Collection<QuizInstance>(this);

  @OneToMany(() => CarbonFootprint, (cf) => cf.client)
  public carbonFootprints: Collection<CarbonFootprint> = new Collection<CarbonFootprint>(this);

  public signMedia() {
    this.logo = getSignedUrl(this.logo, MediaEntityTypes.CLIENT, 'logo', this.mediaUuid);
    this.report1 = getSignedUrl(this.report1, MediaEntityTypes.CLIENT, 'report1', this.mediaUuid);
    this.report2 = getSignedUrl(this.report2, MediaEntityTypes.CLIENT, 'report2', this.mediaUuid);
  }
}
