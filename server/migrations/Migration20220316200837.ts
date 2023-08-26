import { Migration } from '@mikro-orm/migrations';

export class Migration20220316200837 extends Migration {
  async up(): Promise<void> {
    this.addSql('alter table "client" add column "client_type_uuid" uuid null;');

    this.addSql(
      'alter table "client" add constraint "client_client_type_uuid_foreign" foreign key ("client_type_uuid") references "client_type" ("uuid") on update cascade on delete set null;',
    );
  }

  async down(): Promise<void> {
    this.addSql('alter table "client" drop constraint "client_client_type_uuid_foreign";');

    this.addSql('alter table "client" drop column "client_type_uuid";');
  }
}
