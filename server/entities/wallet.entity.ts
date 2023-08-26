import { Entity, Property, OneToOne } from '@mikro-orm/core';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';
import { Client } from './client.entity';
import { Partner } from './partner.entity';
import { WalletEmailVerificationStatus } from '../enums';
@Entity()
export class Wallet extends BaseEntity<Wallet> {
  @Property()
  public email!: string;

  @Property({ columnType: 'text', default: 'NO', nullable: false })
  public emailVerified!: WalletEmailVerificationStatus;

  @Property()
  public userName!: string;

  @OneToOne(() => Partner, (partner) => partner.wallet, { owner: true, nullable: true })
  partner!: Partner;

  @OneToOne(() => Client, (client) => client.wallet, { owner: true, nullable: true })
  client!: Client;

  @OneToOne(() => User, (user) => user.wallet, { owner: true, nullable: true })
  user!: User;

}
