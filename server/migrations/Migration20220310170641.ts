import { Migration } from '@mikro-orm/migrations';

export class Migration20220310170641 extends Migration {
  async up(): Promise<void> {
    // Change default from pending to unassigned
    this.addSql('alter table "requirement" drop constraint if exists "requirement_request_status_check";');
    this.addSql(
      'alter table "requirement" alter column "request_status" type varchar(255) using ("request_status"::varchar(255));',
    );
    this.addSql('alter table "requirement" alter column "request_status" set default \'unassigned\';');

    // Transition all denied / no partner assigned requirements over to unassigned and make sure the partner is removed
    this.addSql(`update "requirement" set "request_status" = 'unassigned' where "request_status" = 'denied';`);
    this.addSql(`update "requirement" set "request_status" = 'unassigned' where "partner_uuid" IS NULL;`);
    this.addSql(`update "requirement" set "partner_uuid" = NULL where "request_status" = 'unassigned';`);

    // If there is a partner assigned, just set the requirement status to approved
    this.addSql(`update "requirement" set "request_status" = 'approved' where "partner_uuid" IS NOT NULL;`);
  }
}
