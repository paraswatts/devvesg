import { Entity, ManyToOne, Property, Unique, OneToMany, OneToOne } from '@mikro-orm/core';
import { ApprovalStatuses } from '../enums';
import { v4 as uuid } from 'uuid';

import { BaseEntity } from './base.entity';
import { Client } from './client.entity';
import { Partner } from './partner.entity';
import { Wallet } from './wallet.entity';

export enum UserTypes {
  ADMIN = 'admin',
  CLIENT = 'client',
  PARTNER = 'partner',
}

@Entity()
export class User extends BaseEntity<User> {
  @Property()
  @Unique()
  public email!: string;

  @Property()
  public firstName!: string;

  @Property()
  public lastName!: string;

  @Property()
  public type: UserTypes;

  @Property({ columnType: 'text', default: ApprovalStatuses.APPROVED, nullable: true })
  public approvalStatus: ApprovalStatuses;

  @Property()
  public hash: string;

  @Property()
  public salt: string;

  @Property({ default: false })
  public userAgreementCompleted: boolean;

  @Property({ nullable: true })
  public dateAgreementCompleted: Date | null;

  @Property({ nullable: true })
  public code: string | null;

  @Property({ default: false })
  public onboardingComplete: boolean;

  @Property({ defaultRaw: 'uuid_generate_v4()' })
  @Unique()
  public resetPasswordToken: string;

  @Property()
  public resetPasswordSentAt: Date = new Date();

  @Property({ nullable: true, lazy: true })
  hubspotId: string;

  @ManyToOne(() => Client, { nullable: true })
  client: Client;

  @ManyToOne(() => Partner, { nullable: true })
  partner: Partner;

  @OneToOne(() => Wallet, (wallet) => wallet.user)
  wallet!: Wallet;

  public renewResetPasswordFields() {
    this.resetPasswordSentAt = new Date();
    this.resetPasswordToken = uuid();
  }
}
