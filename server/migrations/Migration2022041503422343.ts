import { Migration } from '@mikro-orm/migrations';

export class Migration20220415034051 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "credit_type" ("uuid" uuid not null default uuid_generate_v4(), "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" varchar(255) not null,"type" varchar(255) not null, "description" varchar(255) not null);');
    this.addSql('alter table "credit_type" add constraint "credit_type_pkey" primary key ("uuid");');
    this.addSql('alter table "credit_type" add constraint "credit_type_name_unique" unique ("name");');

    this.addSql('alter table "nft" add constraint "nft_credit_type_uuid_foreign" foreign key ("credit_type_uuid") references "credit_type" ("uuid") on update cascade;');

    const CREDIT_TYPE = [
      { "type": "1", "name": "Carbon", "description": "Credits from any type of project offsetting carbon (land, mangrove, burning, soil, etc)." },
      { "type": "2", "name": "Plastic", "description": "Credits created from plastic offset projects. This might include offsetting virgin plastic with ocean collected plastic." }
    ];

    CREDIT_TYPE.forEach((nt) => {
      this.addSql(
        `insert into "credit_type" (created_at, updated_at, name, description, type) values (now(), now(), '${nt.name}', '${nt.description}','${nt.type}');`
      );
    });

  }
}
