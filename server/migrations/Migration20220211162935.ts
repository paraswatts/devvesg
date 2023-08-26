import { Migration } from '@mikro-orm/migrations';

export class Migration20220211162935 extends Migration {
  async up(): Promise<void> {
    this.addSql('alter table "partner" add column "project_timeline" int4 null;');

    this.addSql(
      'create table "client_type" ("uuid" uuid not null default uuid_generate_v4(), "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" varchar(255) not null);',
    );
    this.addSql('alter table "client_type" add constraint "client_type_pkey" primary key ("uuid");');
    this.addSql('alter table "client_type" add constraint "client_type_name_unique" unique ("name");');

    this.addSql(
      'create table "partner_client_types" ("partner_uuid" uuid not null, "client_type_uuid" uuid not null);',
    );
    this.addSql(
      'alter table "partner_client_types" add constraint "partner_client_types_pkey" primary key ("partner_uuid", "client_type_uuid");',
    );

    this.addSql(
      'alter table "partner_client_types" add constraint "partner_client_types_partner_uuid_foreign" foreign key ("partner_uuid") references "partner" ("uuid") on update cascade on delete cascade;',
    );
    this.addSql(
      'alter table "partner_client_types" add constraint "partner_client_types_client_type_uuid_foreign" foreign key ("client_type_uuid") references "client_type" ("uuid") on update cascade on delete cascade;',
    );
    const CLIENT_TYPES = [
      'Enterprise companies',
      'Mid-size companies',
      'Small businesses',
      'Cities',
      'Countries',
      'Education',
      'Military',
    ];
    CLIENT_TYPES.forEach((ct) => {
      this.addSql(`insert into "client_type" (name, created_at, updated_at) values ('${ct}', now(), now());`);
    });
  }

  async down(): Promise<void> {
    this.addSql('alter table "partner" drop column "project_timeline";');

    this.addSql('drop table "client_type";');

    this.addSql('drop table "partner_client_types";');

    this.addSql('alter table "partner_client_types" drop constraint "partner_client_types_partner_uuid_foreign";');
    this.addSql('alter table "partner_client_types" drop constraint "partner_client_types_client_type_uuid_foreign";');
  }
}
