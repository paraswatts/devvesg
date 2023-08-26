import { BaseEntity as MikroBaseEntity, PrimaryKey, Property } from '@mikro-orm/core';

export class BaseEntity<T extends { uuid: string }> extends MikroBaseEntity<T, 'uuid'> {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'uuid_generate_v4()' })
  uuid: string;

  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();
}
