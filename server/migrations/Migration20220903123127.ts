import { Migration } from '@mikro-orm/migrations';

export class Migration20220903123127 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "nft" add column "transfer_receipt_uri" text null default null;');
    this.addSql('alter table "nft" add column "transfer_client_id" text null default null;');
  }

}
