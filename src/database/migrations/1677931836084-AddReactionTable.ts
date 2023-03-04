import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddReactionTable1677931836084 implements MigrationInterface {
  name = 'AddReactionTable1677931836084';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "comments" ("id" SERIAL NOT NULL, "content" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT 'NOW()', "updatedAt" TIMESTAMP NOT NULL DEFAULT 'NOW()', "publicationId" integer, "userId" integer, CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "tag" ("id" BIGSERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_8e4052373c579afc1471f526760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "publication" ("id" SERIAL NOT NULL, "date" TIMESTAMP NOT NULL DEFAULT 'NOW()', "view" integer NOT NULL DEFAULT '0', "type" character varying NOT NULL, "body" character varying NOT NULL, "file" character varying NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_8aea8363d5213896a78d8365fab" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "publications_tags" ("publicationId" integer NOT NULL, "tagId" bigint NOT NULL, CONSTRAINT "PK_e3f96b3ce976dd092cdceb015ca" PRIMARY KEY ("publicationId", "tagId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_739ea17c93a45ddfd4193e4700" ON "publications_tags" ("publicationId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_0c813b02675864cbff631af143" ON "publications_tags" ("tagId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "comments" ADD CONSTRAINT "FK_93212a3c2f662e364c059410b54" FOREIGN KEY ("publicationId") REFERENCES "publication"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "comments" ADD CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "publication" ADD CONSTRAINT "FK_ca72b09f205afc223b9866471fe" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "publications_tags" ADD CONSTRAINT "FK_739ea17c93a45ddfd4193e4700d" FOREIGN KEY ("publicationId") REFERENCES "publication"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "publications_tags" ADD CONSTRAINT "FK_0c813b02675864cbff631af1434" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "publications_tags" DROP CONSTRAINT "FK_0c813b02675864cbff631af1434"`,
    );
    await queryRunner.query(
      `ALTER TABLE "publications_tags" DROP CONSTRAINT "FK_739ea17c93a45ddfd4193e4700d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "publication" DROP CONSTRAINT "FK_ca72b09f205afc223b9866471fe"`,
    );
    await queryRunner.query(
      `ALTER TABLE "comments" DROP CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749"`,
    );
    await queryRunner.query(
      `ALTER TABLE "comments" DROP CONSTRAINT "FK_93212a3c2f662e364c059410b54"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_0c813b02675864cbff631af143"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_739ea17c93a45ddfd4193e4700"`,
    );
    await queryRunner.query(`DROP TABLE "publications_tags"`);
    await queryRunner.query(`DROP TABLE "publication"`);
    await queryRunner.query(`DROP TABLE "tag"`);
    await queryRunner.query(`DROP TABLE "comments"`);
  }
}
