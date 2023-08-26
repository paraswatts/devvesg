import { Migration } from '@mikro-orm/migrations';

export class Migration20220216140305 extends Migration {
  async up(): Promise<void> {
    this.addSql('alter table "partner" add column "approval_status" text;');

    this.addSql('alter table "user" add column "approval_status" text default \'Approved\';');

    this.addSql(`update "partner" set "approval_status" = 'Approved' where coalesce(approval_status, '') = '';`);
  }

  async down(): Promise<void> {
    this.addSql('alter table "partner" drop column "approval_status";');

    this.addSql('alter table "user" drop column "approval_status";');
  }
}
