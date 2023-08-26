import { Migration } from '@mikro-orm/migrations';

export class Migration20211221183746 extends Migration {
  async up(): Promise<void> {
    this.addSql('alter table "partner" drop constraint if exists "partner_logo_check";');
    this.addSql('alter table "partner" alter column "logo" type varchar(255) using ("logo"::varchar(255));');
    this.addSql('alter table "partner" alter column "logo" drop not null;');
    this.addSql('alter table "partner" drop constraint if exists "partner_contact_phone_number_check";');
    this.addSql(
      'alter table "partner" alter column "contact_phone_number" type varchar(255) using ("contact_phone_number"::varchar(255));',
    );
    this.addSql('alter table "partner" alter column "contact_phone_number" drop not null;');

    this.addSql('alter table "client" drop constraint if exists "client_contact_email_check";');
    this.addSql(
      'alter table "client" alter column "contact_email" type varchar(255) using ("contact_email"::varchar(255));',
    );
    this.addSql('alter table "client" alter column "contact_email" drop not null;');
    this.addSql('alter table "client" drop constraint if exists "client_website_url_check";');
    this.addSql(
      'alter table "client" alter column "website_url" type varchar(255) using ("website_url"::varchar(255));',
    );
    this.addSql('alter table "client" alter column "website_url" drop not null;');
    this.addSql('alter table "client" drop constraint if exists "client_client_type_check";');
    this.addSql(
      'alter table "client" alter column "client_type" type varchar(255) using ("client_type"::varchar(255));',
    );
    this.addSql('alter table "client" alter column "client_type" drop not null;');
    this.addSql('alter table "client" drop constraint if exists "client_contact_phone_number_check";');
    this.addSql(
      'alter table "client" alter column "contact_phone_number" type varchar(255) using ("contact_phone_number"::varchar(255));',
    );
    this.addSql('alter table "client" alter column "contact_phone_number" drop not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "partner" drop constraint if exists "partner_logo_check";');
    this.addSql('alter table "partner" alter column "logo" type varchar(255) using ("logo"::varchar(255));');
    this.addSql('alter table "partner" alter column "logo" set not null;');
    this.addSql('alter table "partner" drop constraint if exists "partner_contact_phone_number_check";');
    this.addSql(
      'alter table "partner" alter column "contact_phone_number" type varchar(255) using ("contact_phone_number"::varchar(255));',
    );
    this.addSql('alter table "partner" alter column "contact_phone_number" set not null;');

    this.addSql('alter table "client" drop constraint if exists "client_contact_email_check";');
    this.addSql(
      'alter table "client" alter column "contact_email" type varchar(255) using ("contact_email"::varchar(255));',
    );
    this.addSql('alter table "client" alter column "contact_email" set not null;');
    this.addSql('alter table "client" drop constraint if exists "client_website_url_check";');
    this.addSql(
      'alter table "client" alter column "website_url" type varchar(255) using ("website_url"::varchar(255));',
    );
    this.addSql('alter table "client" alter column "website_url" set not null;');
    this.addSql('alter table "client" drop constraint if exists "client_client_type_check";');
    this.addSql(
      'alter table "client" alter column "client_type" type varchar(255) using ("client_type"::varchar(255));',
    );
    this.addSql('alter table "client" alter column "client_type" set not null;');
    this.addSql('alter table "client" drop constraint if exists "client_contact_phone_number_check";');
    this.addSql(
      'alter table "client" alter column "contact_phone_number" type varchar(255) using ("contact_phone_number"::varchar(255));',
    );
    this.addSql('alter table "client" alter column "contact_phone_number" set not null;');
  }
}
