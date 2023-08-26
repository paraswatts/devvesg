import { Migration } from '@mikro-orm/migrations';

export class Migration20220616061844 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "nft_type" ("uuid" uuid not null default uuid_generate_v4(), "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" varchar(255) not null, "description" varchar(255) not null);');
    this.addSql('alter table "nft_type" add constraint "nft_type_pkey" primary key ("uuid");');
    this.addSql('alter table "nft_type" add constraint "nft_type_name_unique" unique ("name");');

    this.addSql('alter table "nft" drop constraint if exists "nft_nft_type_check";');
    this.addSql('alter table "nft" alter column "nft_type" type text using ("nft_type"::text);');
    this.addSql('alter table "nft" alter column "nft_type" set default \'\';');
    this.addSql('alter table "nft" drop constraint if exists "nft_notes_check";');
    this.addSql('alter table "nft" alter column "notes" type text using ("notes"::text);');
    this.addSql('alter table "nft" alter column "notes" set default \'\';');
    this.addSql('alter table "nft" alter column "notes" set not null;');
    this.addSql('alter table "nft" drop constraint if exists "nft_sale_receipt_uri_check";');
    this.addSql('alter table "nft" alter column "sale_receipt_uri" type text using ("sale_receipt_uri"::text);');
    this.addSql('alter table "nft" alter column "sale_receipt_uri" set default \'\';');
    this.addSql('alter table "nft" alter column "sale_receipt_uri" set not null;');

    this.addSql('alter table "wallet" drop constraint if exists "wallet_partner_uuid_check";');
    this.addSql('alter table "wallet" alter column "partner_uuid" type uuid using ("partner_uuid"::uuid);');
    this.addSql('alter table "wallet" drop constraint if exists "wallet_client_uuid_check";');
    this.addSql('alter table "wallet" alter column "client_uuid" type uuid using ("client_uuid"::uuid);');
    this.addSql('alter table "wallet" drop constraint if exists "wallet_user_uuid_check";');
    this.addSql('alter table "wallet" alter column "user_uuid" type uuid using ("user_uuid"::uuid);');
  }

}
