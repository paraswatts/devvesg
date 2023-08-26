import { Migration } from '@mikro-orm/migrations';

export class Migration20220414153155 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "quiz" ("uuid" uuid not null default uuid_generate_v4(), "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" varchar(255) not null);',
    );
    this.addSql('alter table "quiz" add constraint "quiz_pkey" primary key ("uuid");');

    this.addSql(
      'create table "quiz_version" ("uuid" uuid not null default uuid_generate_v4(), "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" varchar(255) not null, "description" text not null default \'\', "quiz_uuid" uuid not null);',
    );
    this.addSql('alter table "quiz_version" add constraint "quiz_version_pkey" primary key ("uuid");');

    this.addSql(
      'alter table "quiz_version" add constraint "quiz_version_quiz_uuid_foreign" foreign key ("quiz_uuid") references "quiz" ("uuid") on update cascade;',
    );
  }

  async down(): Promise<void> {
    this.addSql('drop table "quiz_version";');
    this.addSql('drop table "quiz";');
  }
}
