import { Migration } from '@mikro-orm/migrations';

export class Migration20211229140827 extends Migration {
  async up(): Promise<void> {
    this.addSql('alter table "initiative" add column "onboarding_logo" varchar(255) not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "initiative" drop column "onboarding_logo";');
  }
}
