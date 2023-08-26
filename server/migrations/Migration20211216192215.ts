import { Migration } from '@mikro-orm/migrations';

export class Migration20211216192215 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'alter table "client" add column "stock_ticker" varchar(255) null, add column "report1" varchar(255) null, add column "report2" varchar(255) null;',
    );
  }

  async down(): Promise<void> {
    this.addSql('alter table "client" drop column "stock_ticker", drop column "report1", drop column "report2";');
  }
}
