import { Migration } from '@mikro-orm/migrations';

export class Migration20220127174025 extends Migration {
  async up(): Promise<void> {
    this.addSql('alter table "requirement_type" add column "sort_order" int4 not null default 0;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "requirement_type" drop column "sort_order";');
  }
}
