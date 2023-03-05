import { MigrationInterface, QueryRunner } from "typeorm";

export class InitTable1678018171473 implements MigrationInterface {
    name = 'InitTable1678018171473'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "publication" ADD "total_interactions" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "publication" ADD "total_comments" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "publication" ALTER COLUMN "date" SET DEFAULT 'NOW()'`);
        await queryRunner.query(`ALTER TABLE "comments" ALTER COLUMN "createdAt" SET DEFAULT 'NOW()'`);
        await queryRunner.query(`ALTER TABLE "comments" ALTER COLUMN "updatedAt" SET DEFAULT 'NOW()'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments" ALTER COLUMN "updatedAt" SET DEFAULT '2023-03-05 11:46:10.750957'`);
        await queryRunner.query(`ALTER TABLE "comments" ALTER COLUMN "createdAt" SET DEFAULT '2023-03-05 11:46:10.750957'`);
        await queryRunner.query(`ALTER TABLE "publication" ALTER COLUMN "date" SET DEFAULT '2023-03-05 11:46:10.750957'`);
        await queryRunner.query(`ALTER TABLE "publication" DROP COLUMN "total_comments"`);
        await queryRunner.query(`ALTER TABLE "publication" DROP COLUMN "total_interactions"`);
    }

}
