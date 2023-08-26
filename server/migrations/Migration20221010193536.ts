import { Migration } from '@mikro-orm/migrations';

export class Migration20221010193536 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "wallet" drop column "pass_hash";');
    this.addSql('alter table "wallet" drop column "wallet_address";');
    this.addSql('alter table "wallet" drop column "error_code";');
    this.addSql('alter table "wallet" drop column "error_message";');
  }

}
