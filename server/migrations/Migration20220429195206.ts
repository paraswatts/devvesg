import { Migration } from '@mikro-orm/migrations';

export class Migration20220429195206 extends Migration {
  async up(): Promise<void> {
    this.addSql('alter table "requirement" add column "hubspot_deal_id" varchar(255) null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "requirement" drop column "hubspot_deal_id";');
  }
}
