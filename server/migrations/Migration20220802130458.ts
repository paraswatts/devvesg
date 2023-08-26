import { Migration } from '@mikro-orm/migrations';

export class Migration20220802130458 extends Migration {

  async up(): Promise<void> {

    this.addSql('alter table "wallet" alter column "wallet_address" set default \'\';');
    this.addSql('alter table "wallet" alter column "email_verified" set default \'NO\';');
    this.addSql('alter table "wallet" add column "error_code" text null default \'OK\', add column "error_message" text null default null;');
    }
}