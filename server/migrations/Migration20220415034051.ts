import { Migration } from '@mikro-orm/migrations';

export class Migration20220415034051 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "nft" ("uuid" uuid not null default uuid_generate_v4(), "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "asset_name" text not null default \'\', "creator" text not null default \'DEVVESG\', "asset_reference_url_raw" text not null default \'\', "asset_reference_url_hash" text not null default \'\', "amount" text not null default \'1\', "artist" text not null default \'DEVVESG\', "asset_description" text not null default \'\', "nft_type" text not null default \'Carbon\', "for_sale" boolean not null default false, "sale_price" text not null default \'\', "sale_currency" text not null default \'\', "sale_description" text not null default \'\', "sale_location" text not null default \'\', "sale_link" text not null default \'\', "credit_count" text not null, "project_from_date" timestamptz(0) not null, "project_to_date" timestamptz(0) not null, "methodology" text not null default \'\', "project_type" text not null, "project_name" text not null, "project_description" text not null default \'\', "project_activity" text not null default \'\', "project_code" text not null, "project_id" text not null, "project_batch_id" text not null, "project_ticker" text not null default \'\', "geography" text not null default \'\', "location_coordinates" text not null default \'\', "project_standard" text not null default \'\', "credit_type_uuid" uuid not null, "project_vintage" text not null default \'\', "project_verifier" text not null default \'\', "project_validator" text not null default \'\', "public_registry" text not null default \'\', "public_registry_link" text not null default \'\', "status" text not null default \'UNDER_REVIEW\', "created_by_uuid" uuid not null, "mint_id" varchar(255) null, "media_uuid" varchar(255) not null, "notes" text null, "sale_receipt_uri" text null );');

    this.addSql('alter table "nft" add constraint "nft_pkey" primary key ("uuid");');

    this.addSql('create table "wallet" ("uuid" uuid not null default uuid_generate_v4(), "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "email" varchar(255) not null, "email_verified" text not null default \'NO\', "pass_hash" varchar(255) not null, "wallet_address" varchar(255) not null, "user_name" varchar(255) not null,  "user_uuid" uuid null, "client_uuid" uuid null,  "partner_uuid" uuid null);');
    this.addSql('alter table "wallet" add constraint "wallet_pkey" primary key ("uuid");');
    this.addSql('alter table "wallet" drop constraint if exists "wallet_partner_uuid_check";');
    this.addSql('alter table "wallet" alter column "partner_uuid" type uuid using ("partner_uuid"::uuid);');
    this.addSql('alter table "wallet" drop constraint if exists "wallet_client_uuid_check";');
    this.addSql('alter table "wallet" alter column "client_uuid" type uuid using ("client_uuid"::uuid);');
    this.addSql('alter table "wallet" drop constraint if exists "wallet_user_uuid_check";');
    this.addSql('alter table "wallet" alter column "user_uuid" type uuid using ("user_uuid"::uuid);');
    this.addSql('alter table "wallet" add constraint "wallet_partner_uuid_unique" unique ("partner_uuid");');
    this.addSql('alter table "wallet" add constraint "wallet_client_uuid_unique" unique ("client_uuid");');
    this.addSql('alter table "wallet" add constraint "wallet_user_uuid_unique" unique ("user_uuid");');

    this.addSql('alter table "nft" add constraint "nft_created_by_uuid_foreign" foreign key ("created_by_uuid") references "user" ("uuid") on update cascade;');
    this.addSql('alter table "nft" add column "sold_price" text not null default \'\', add column "sold_currency" text not null default \'\', add column "sold_payment_type" text not null default \'\';');
  }

}
