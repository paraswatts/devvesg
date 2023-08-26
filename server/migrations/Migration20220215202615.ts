import { Migration } from '@mikro-orm/migrations';

export class Migration20220215202615 extends Migration {
  async up(): Promise<void> {
    this.addSql('alter table "client" add column "hubspot_id" varchar(255) null;');

    this.addSql('alter table "partner" add column "hubspot_id" varchar(255) null;');

    this.addSql('alter table "user" add column "hubspot_id" varchar(255) null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "client" drop column "hubspot_id";');

    this.addSql('alter table "partner" drop column "hubspot_id";');

    this.addSql('alter table "user" drop column "hubspot_id";');
  }
}
