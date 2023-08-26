import { Migration } from '@mikro-orm/migrations';

export class Migration20211220214932 extends Migration {
  async up(): Promise<void> {
    this.addSql('alter table "partner" add column "marketing_disabled_at" timestamptz(0) null;');

    this.addSql(
      'create table "email_event" ("uuid" uuid not null default uuid_generate_v4(), "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "email" varchar(255) not null, "type" varchar(255) not null, "meta" varchar(255) not null, "received_at" timestamptz(0) not null);',
    );
    this.addSql('alter table "email_event" add constraint "email_event_pkey" primary key ("uuid");');
    this.addSql('create index "email_event_email_index" on "email_event" ("email");');
  }

  async down(): Promise<void> {
    this.addSql('alter table "partner" drop column "marketing_disabled_at";');

    this.addSql('drop index "email_event_email_index";');
    this.addSql('drop table "email_event";');
  }
}
