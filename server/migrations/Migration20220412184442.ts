import { Migration } from '@mikro-orm/migrations';

export class Migration20220412184442 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "carbon_footprint" ("uuid" uuid not null default uuid_generate_v4(), "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "total" float not null, "client_uuid" uuid not null);',
    );
    this.addSql('alter table "carbon_footprint" add constraint "carbon_footprint_pkey" primary key ("uuid");');

    this.addSql(
      'alter table "carbon_footprint" add constraint "carbon_footprint_client_uuid_foreign" foreign key ("client_uuid") references "client" ("uuid") on update cascade;',
    );
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "carbon_footprint" cascade;');
  }
}
