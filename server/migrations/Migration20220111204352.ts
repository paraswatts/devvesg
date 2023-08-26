import { Migration } from '@mikro-orm/migrations';

export class Migration20220111204352 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "vertical" ("uuid" uuid not null default uuid_generate_v4(), "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" varchar(255) not null);',
    );
    this.addSql('alter table "vertical" add constraint "vertical_pkey" primary key ("uuid");');
    this.addSql('alter table "vertical" add constraint "vertical_name_unique" unique ("name");');

    this.addSql('alter table "client" add column "vertical_uuid" uuid null;');
    this.addSql('alter table "client" drop column "client_type";');

    this.addSql(
      'alter table "client" add constraint "client_vertical_uuid_foreign" foreign key ("vertical_uuid") references "vertical" ("uuid") on update cascade on delete set null;',
    );
  }

  async down(): Promise<void> {
    this.addSql('drop table "vertical";');

    this.addSql('alter table "client" drop column "vertical_uuid";');
    this.addSql('alter table "client" add column "client_type" varchar(255) not null;');
    this.addSql('alter table "client" drop constraint "client_vertical_uuid_foreign";');
  }
}
