import { Migration } from '@mikro-orm/migrations';

export class Migration20211214195131 extends Migration {
  async up(): Promise<void> {
    this.addSql('create extension if not exists "uuid-ossp";');

    this.addSql(
      'create table "service" ("uuid" uuid not null default uuid_generate_v4(), "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" varchar(255) not null);',
    );
    this.addSql('alter table "service" add constraint "service_pkey" primary key ("uuid");');
    this.addSql('alter table "service" add constraint "service_name_unique" unique ("name");');

    this.addSql(
      'create table "partner" ("uuid" uuid not null default uuid_generate_v4(), "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" varchar(255) not null, "description" text not null default \'\', "logo" varchar(255) not null, "contact_email" varchar(255) not null, "website_url" varchar(255) not null, "contact_phone_number" varchar(255) not null, "twitter_url" varchar(255) null, "facebook_url" varchar(255) null, "linked_in_url" varchar(255) null, "media_uuid" varchar(255) not null);',
    );
    this.addSql('alter table "partner" add constraint "partner_pkey" primary key ("uuid");');

    this.addSql('create table "partner_services" ("partner_uuid" uuid not null, "service_uuid" uuid not null);');
    this.addSql(
      'alter table "partner_services" add constraint "partner_services_pkey" primary key ("partner_uuid", "service_uuid");',
    );

    this.addSql(
      'create table "initiative" ("uuid" uuid not null default uuid_generate_v4(), "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" varchar(255) not null, "objective" text not null default \'\', "logo" varchar(255) not null, "media_uuid" varchar(255) not null);',
    );
    this.addSql('alter table "initiative" add constraint "initiative_pkey" primary key ("uuid");');

    this.addSql(
      'create table "project_type" ("uuid" uuid not null default uuid_generate_v4(), "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" varchar(255) not null, "objective" text not null default \'\', "logo" varchar(255) not null default \'\', "media_uuid" varchar(255) not null, "initiative_uuid" uuid not null);',
    );
    this.addSql('alter table "project_type" add constraint "project_type_pkey" primary key ("uuid");');

    this.addSql(
      'create table "requirement_type" ("uuid" uuid not null default uuid_generate_v4(), "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" varchar(255) not null, "description" text not null default \'\', "project_type_uuid" uuid not null);',
    );
    this.addSql('alter table "requirement_type" add constraint "requirement_type_pkey" primary key ("uuid");');

    this.addSql(
      'create table "requirement_type_partners" ("requirement_type_uuid" uuid not null, "partner_uuid" uuid not null);',
    );
    this.addSql(
      'alter table "requirement_type_partners" add constraint "requirement_type_partners_pkey" primary key ("requirement_type_uuid", "partner_uuid");',
    );

    this.addSql(
      'create table "client" ("uuid" uuid not null default uuid_generate_v4(), "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" varchar(255) not null, "description" text not null default \'\', "logo" varchar(255) null, "contact_email" varchar(255) not null, "website_url" varchar(255) not null, "client_type" varchar(255) not null, "contact_phone_number" varchar(255) not null, "twitter_url" varchar(255) null, "linked_in_url" varchar(255) null, "media_uuid" varchar(255) not null);',
    );
    this.addSql('alter table "client" add constraint "client_pkey" primary key ("uuid");');

    this.addSql(
      'create table "project" ("uuid" uuid not null default uuid_generate_v4(), "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" varchar(255) not null, "description" text not null default \'\', "status" varchar(255) not null default \'notstarted\', "start_date" timestamptz(0) null, "end_goal_date" timestamptz(0) null, "completion_date" timestamptz(0) null, "client_uuid" uuid not null, "project_type_uuid" uuid not null);',
    );
    this.addSql('alter table "project" add constraint "project_pkey" primary key ("uuid");');

    this.addSql(
      'create table "requirement" ("uuid" uuid not null default uuid_generate_v4(), "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" varchar(255) not null, "description" text not null default \'\', "start_date" timestamptz(0) null, "end_date" timestamptz(0) null, "project_code" varchar(255) null, "area_code" varchar(255) null, "status" varchar(255) not null, "partner_uuid" uuid null, "project_uuid" uuid not null, "requirement_type_uuid" uuid null);',
    );
    this.addSql('alter table "requirement" add constraint "requirement_pkey" primary key ("uuid");');

    this.addSql(
      'create table "requirement_document" ("uuid" uuid not null default uuid_generate_v4(), "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" varchar(255) not null, "type" varchar(255) not null, "file" varchar(255) null, "media_uuid" varchar(255) not null, "requirement_uuid" uuid not null);',
    );
    this.addSql('alter table "requirement_document" add constraint "requirement_document_pkey" primary key ("uuid");');

    this.addSql(
      'create table "user" ("uuid" uuid not null default uuid_generate_v4(), "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "email" varchar(255) not null, "first_name" varchar(255) not null, "last_name" varchar(255) not null, "type" varchar(255) not null, "hash" varchar(255) not null, "salt" varchar(255) not null, "user_agreement_completed" bool not null default false, "date_agreement_completed" timestamptz(0) null, "code" varchar(255) null, "onboarding_complete" bool not null default false, "reset_password_token" varchar(255) not null default uuid_generate_v4(), "reset_password_sent_at" timestamptz(0) not null, "client_uuid" uuid null, "partner_uuid" uuid null);',
    );
    this.addSql('alter table "user" add constraint "user_pkey" primary key ("uuid");');
    this.addSql('alter table "user" add constraint "user_email_unique" unique ("email");');
    this.addSql(
      'alter table "user" add constraint "user_reset_password_token_unique" unique ("reset_password_token");',
    );

    this.addSql(
      'create table "client_location" ("uuid" uuid not null default uuid_generate_v4(), "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "country" varchar(255) not null, "province" varchar(255) not null, "client_uuid" uuid null);',
    );
    this.addSql('alter table "client_location" add constraint "client_location_pkey" primary key ("uuid");');

    this.addSql(
      'create table "benefit" ("uuid" uuid not null default uuid_generate_v4(), "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" varchar(255) not null, "value" varchar(255) not null, "unit" varchar(255) not null, "tooltip" text not null default \'\', "project_uuid" uuid not null);',
    );
    this.addSql('alter table "benefit" add constraint "benefit_pkey" primary key ("uuid");');

    this.addSql(
      'create table "benefit_chart" ("uuid" uuid not null default uuid_generate_v4(), "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" varchar(255) not null, "value" varchar(255) not null, "unit" varchar(255) not null, "percentage" int4 not null, "trend" varchar(255) not null, "project_uuid" uuid not null);',
    );
    this.addSql('alter table "benefit_chart" add constraint "benefit_chart_pkey" primary key ("uuid");');

    this.addSql(
      'alter table "partner_services" add constraint "partner_services_partner_uuid_foreign" foreign key ("partner_uuid") references "partner" ("uuid") on update cascade on delete cascade;',
    );
    this.addSql(
      'alter table "partner_services" add constraint "partner_services_service_uuid_foreign" foreign key ("service_uuid") references "service" ("uuid") on update cascade on delete cascade;',
    );

    this.addSql(
      'alter table "project_type" add constraint "project_type_initiative_uuid_foreign" foreign key ("initiative_uuid") references "initiative" ("uuid") on update cascade;',
    );

    this.addSql(
      'alter table "requirement_type" add constraint "requirement_type_project_type_uuid_foreign" foreign key ("project_type_uuid") references "project_type" ("uuid") on update cascade;',
    );

    this.addSql(
      'alter table "requirement_type_partners" add constraint "requirement_type_partners_requirement_type_uuid_foreign" foreign key ("requirement_type_uuid") references "requirement_type" ("uuid") on update cascade on delete cascade;',
    );
    this.addSql(
      'alter table "requirement_type_partners" add constraint "requirement_type_partners_partner_uuid_foreign" foreign key ("partner_uuid") references "partner" ("uuid") on update cascade on delete cascade;',
    );

    this.addSql(
      'alter table "project" add constraint "project_client_uuid_foreign" foreign key ("client_uuid") references "client" ("uuid") on update cascade;',
    );
    this.addSql(
      'alter table "project" add constraint "project_project_type_uuid_foreign" foreign key ("project_type_uuid") references "project_type" ("uuid") on update cascade;',
    );

    this.addSql(
      'alter table "requirement" add constraint "requirement_partner_uuid_foreign" foreign key ("partner_uuid") references "partner" ("uuid") on update cascade on delete set null;',
    );
    this.addSql(
      'alter table "requirement" add constraint "requirement_project_uuid_foreign" foreign key ("project_uuid") references "project" ("uuid") on update cascade;',
    );
    this.addSql(
      'alter table "requirement" add constraint "requirement_requirement_type_uuid_foreign" foreign key ("requirement_type_uuid") references "requirement_type" ("uuid") on update cascade on delete set null;',
    );

    this.addSql(
      'alter table "requirement_document" add constraint "requirement_document_requirement_uuid_foreign" foreign key ("requirement_uuid") references "requirement" ("uuid") on update cascade;',
    );

    this.addSql(
      'alter table "user" add constraint "user_client_uuid_foreign" foreign key ("client_uuid") references "client" ("uuid") on update cascade on delete set null;',
    );
    this.addSql(
      'alter table "user" add constraint "user_partner_uuid_foreign" foreign key ("partner_uuid") references "partner" ("uuid") on update cascade on delete set null;',
    );

    this.addSql(
      'alter table "client_location" add constraint "client_location_client_uuid_foreign" foreign key ("client_uuid") references "client" ("uuid") on update cascade on delete set null;',
    );

    this.addSql(
      'alter table "benefit" add constraint "benefit_project_uuid_foreign" foreign key ("project_uuid") references "project" ("uuid") on update cascade;',
    );

    this.addSql(
      'alter table "benefit_chart" add constraint "benefit_chart_project_uuid_foreign" foreign key ("project_uuid") references "project" ("uuid") on update cascade;',
    );
  }
}
