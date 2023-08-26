import { Migration } from '@mikro-orm/migrations';

export class Migration20220309183525 extends Migration {
  async up(): Promise<void> {
    this.addSql('alter table "requirement" add column "request_status" varchar(255) not null default \'pending\';');

    // Approve all requirements that are already in the system
    this.addSql(`update "requirement" set "request_status" = 'approved' where "request_status" = 'pending';`);
  }

  async down(): Promise<void> {
    this.addSql('alter table "requirement" drop column "request_status";');
  }
}
