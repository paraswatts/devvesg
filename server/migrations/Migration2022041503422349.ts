import { Migration } from '@mikro-orm/migrations';

export class Migration2022041503422349 extends Migration {

  async up(): Promise<void> {
    this.addSql('DROP TABLE IF EXISTS quiz cascade');
    this.addSql('DROP TABLE IF EXISTS quiz_version cascade');
    this.addSql('DROP TABLE IF EXISTS quiz_section cascade');
    this.addSql('DROP TABLE IF EXISTS quiz_version_section cascade');
    this.addSql('DROP TABLE IF EXISTS quiz_version_question cascade');
    this.addSql('DROP TABLE IF EXISTS quiz_version_question_dependencies cascade');
    this.addSql('DROP TABLE IF EXISTS quiz_question cascade');
    this.addSql('DROP TABLE IF EXISTS quiz_instance cascade');
    this.addSql('DROP TABLE IF EXISTS quiz_instance_answer cascade');
    this.addSql('DROP TABLE IF EXISTS quiz_question_option cascade');
    this.addSql('DROP TABLE IF EXISTS quiz_question_dependencies cascade');
    this.addSql('DROP TABLE IF EXISTS quiz_score_type cascade');

    this.addSql(
      'create table "quiz" ("uuid" uuid not null default uuid_generate_v4(), "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" varchar(255) not null);',
    );
    this.addSql('alter table "quiz" add constraint "quiz_pkey" primary key ("uuid");');


    // Create quiz_section Table
    this.addSql(
      'create table "quiz_section" ("uuid" uuid not null default uuid_generate_v4(), "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" varchar(255) not null, "description" text not null default \'\', "sort_order" int4 not null default 0, "quiz_uuid" uuid not null, "key" varchar(255));',
    );
    this.addSql('alter table "quiz_section" add constraint "quiz_section_pkey" primary key ("uuid");');

    this.addSql(
      'alter table "quiz_section" add constraint "quiz_section_quiz_uuid_foreign" foreign key ("quiz_uuid") references "quiz" ("uuid") on update cascade on delete cascade;',
    );

    this.addSql(
      'create table "quiz_score_type" ("uuid" uuid not null default uuid_generate_v4(), "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" varchar(255), "description" varchar(255), "type" int4 default 0);',
    );

    this.addSql('alter table "quiz_score_type" add constraint "quiz_score_type_pkey" primary key ("uuid");');

    //Create quiz_question table
    this.addSql(
      'create table "quiz_question" ("uuid" uuid not null default uuid_generate_v4(), "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" varchar(255) not null, "description" text not null default \'\', "quiz_section_uuid" uuid not null, "has_score" boolean not null default false, "question_type" int4 not null default 1, "sort_order" int4 not null default 0, "lower_limit" int4 default 0, "upper_limit" int4 default 0, "quiz_score_type_uuid" uuid not null);',
    );
    this.addSql('alter table "quiz_question" add constraint "quiz_question_pkey" primary key ("uuid");');

    this.addSql(
      'alter table "quiz_question" add constraint "quiz_question_quiz_section_uuid_foreign" foreign key ("quiz_section_uuid") references "quiz_section" ("uuid")  on update cascade on delete cascade;',
    );

    this.addSql(
      'alter table "quiz_question" add constraint "quiz_question_quiz_score_type_uuid_foreign" foreign key ("quiz_score_type_uuid") references "quiz_score_type" ("uuid")  on update cascade on delete cascade;',
    );

    this.addSql(
      'create table "quiz_question_dependencies" ("quiz_question_uuid" uuid not null, "quiz_question_option_uuid" uuid not null);',
    );
    this.addSql(
      'alter table "quiz_question_dependencies" add constraint "quiz_question_dependencies_pkey" primary key ("quiz_question_uuid", "quiz_question_option_uuid");',
    );
    this.addSql(
      'create table "quiz_question_option" ("uuid" uuid not null default uuid_generate_v4(), "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" varchar(255) not null, "description" text not null default \'\', "score" float not null default 0, "sort_order" int4 not null default 0, "quiz_question_uuid" uuid not null, "is_other" boolean default false null);',
    );
    this.addSql('alter table "quiz_question_option" add constraint "quiz_question_option_pkey" primary key ("uuid");');

    this.addSql(
      'alter table "quiz_question_option" add constraint "quiz_question_option_quiz_question_uuid_foreign" foreign key ("quiz_question_uuid") references "quiz_question" ("uuid")  on update cascade on delete cascade;',
    );

    this.addSql(
      'alter table "quiz_question_dependencies" add constraint "quiz_question_dependencies_quiz_question_uuid_foreign" foreign key ("quiz_question_uuid") references "quiz_question" ("uuid") on update cascade on delete cascade;',
    );
    this.addSql(
      'alter table "quiz_question_dependencies" add constraint "quiz_question_dependencies_quiz_question_option_uuid_foreign" foreign key ("quiz_question_option_uuid") references "quiz_question_option" ("uuid") on update cascade on delete cascade;',
    );

    this.addSql(
      'create table "quiz_instance" ("uuid" uuid not null default uuid_generate_v4(), "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "status" varchar(255) not null, "quiz_uuid" uuid not null, "client_uuid" uuid not null, "score" int4 not null default 0, "section_scores" jsonb);',
    );
    this.addSql('alter table "quiz_instance" add constraint "quiz_instance_pkey" primary key ("uuid");');

    this.addSql(
      'alter table "quiz_instance" add constraint "quiz_instance_quiz_uuid_foreign" foreign key ("quiz_uuid") references "quiz" ("uuid") on update cascade on delete cascade;',
    );
    this.addSql(
      'alter table "quiz_instance" add constraint "quiz_instance_client_uuid_foreign" foreign key ("client_uuid") references "client" ("uuid") on update cascade on delete cascade;',
    );

    this.addSql(
      'create table "quiz_instance_answer" ("uuid" uuid not null default uuid_generate_v4(), "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "status" varchar(255) not null, "quiz_instance_uuid" uuid not null, "quiz_question_uuid" uuid not null, "quiz_question_option_uuid" uuid, "answer_value" varchar(255) null);',
    );
    this.addSql('alter table "quiz_instance_answer" add constraint "quiz_instance_answer_pkey" primary key ("uuid");');

    this.addSql(
      'alter table "quiz_instance_answer" add constraint "quiz_instance_answer_quiz_instance_uuid_foreign" foreign key ("quiz_instance_uuid") references "quiz_instance" ("uuid")  on update cascade on delete cascade;',
    );
    this.addSql(
      'alter table "quiz_instance_answer" add constraint "quiz_instance_answer_quiz_question_uuid_foreign" foreign key ("quiz_question_uuid") references "quiz_question" ("uuid")  on update cascade on delete cascade;',
    );
    this.addSql(
      'alter table "quiz_instance_answer" add constraint "quiz_instance_answer_quiz_question_option_uuid_foreign" foreign key ("quiz_question_option_uuid") references "quiz_question_option" ("uuid")  on update cascade on delete cascade;',
    );
  }
  async down(): Promise<void> {
    this.addSql('DROP TABLE IF EXISTS quiz cascade');
    this.addSql('DROP TABLE IF EXISTS quiz_version cascade');
    this.addSql('DROP TABLE IF EXISTS quiz_section cascade');
    this.addSql('DROP TABLE IF EXISTS quiz_version_section cascade');
    this.addSql('DROP TABLE IF EXISTS quiz_version_question cascade');
    this.addSql('DROP TABLE IF EXISTS quiz_version_question_dependencies cascade');
    this.addSql('DROP TABLE IF EXISTS quiz_question cascade');
    this.addSql('DROP TABLE IF EXISTS quiz_instance cascade');
    this.addSql('DROP TABLE IF EXISTS quiz_instance_answer cascade');
    this.addSql('DROP TABLE IF EXISTS quiz_question_option cascade');
    this.addSql('DROP TABLE IF EXISTS quiz_question_dependencies cascade');
    this.addSql('DROP TABLE IF EXISTS quiz_score_type cascade');
  }
}
