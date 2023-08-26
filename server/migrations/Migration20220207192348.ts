import { Migration } from '@mikro-orm/migrations';

export class Migration20220207192348 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'alter table "partner" add column "country" varchar(255) null, add column "province" varchar(255) null, add column "vertical_uuid" uuid null;',
    );

    this.addSql(
      'create table "partner_location" ("uuid" uuid not null default uuid_generate_v4(), "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "country" varchar(255) not null, "province" varchar(255) not null, "partner_uuid" uuid null);',
    );
    this.addSql('alter table "partner_location" add constraint "partner_location_pkey" primary key ("uuid");');

    this.addSql(
      'alter table "partner" add constraint "partner_vertical_uuid_foreign" foreign key ("vertical_uuid") references "vertical" ("uuid") on update cascade on delete set null;',
    );

    this.addSql(
      'alter table "partner_location" add constraint "partner_location_partner_uuid_foreign" foreign key ("partner_uuid") references "partner" ("uuid") on update cascade on delete set null;',
    );
  }

  async down(): Promise<void> {
    this.addSql(
      'alter table "partner" drop column "country", drop column "province", drop column "vertical_uuid" uuid null;',
    );

    this.addSql('drop table "partner_location";');

    this.addSql('alter table "partner" drop constraint "partner_vertical_uuid_foreign";');
  }
}
