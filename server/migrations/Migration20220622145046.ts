import { Migration } from '@mikro-orm/migrations';

export class Migration20220622145046 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "nft" add column "mint_receipt_uri" text null;');
    this.addSql('alter table "nft" add column "retired_on" timestamptz(0) null;');
  }

}
