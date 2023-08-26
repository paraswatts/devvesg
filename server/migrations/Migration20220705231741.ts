import { Migration } from '@mikro-orm/migrations';

export class Migration20220705231741 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "nft" add column "sold_to_wallet" text not null default \'\', add column "sold_item_reference" text not null default \'\', add column "sold_order_id" text not null default \'\';');
    this.addSql('alter table "nft" drop constraint if exists "nft_mint_receipt_uri_check";');
    this.addSql('alter table "nft" alter column "mint_receipt_uri" type text using ("mint_receipt_uri"::text);');
    this.addSql('alter table "nft" alter column "mint_receipt_uri" set default \'\';');
    this.addSql('alter table "nft" alter column "mint_receipt_uri" set not null;');
  }

}
