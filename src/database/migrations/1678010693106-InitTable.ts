import { MigrationInterface, QueryRunner } from "typeorm";

export class InitTable1678010693106 implements MigrationInterface {
    name = 'InitTable1678010693106'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "publication" ALTER COLUMN "date" SET DEFAULT 'NOW()'`);
        await queryRunner.query(`ALTER TABLE "comments" ALTER COLUMN "createdAt" SET DEFAULT 'NOW()'`);
        await queryRunner.query(`ALTER TABLE "comments" ALTER COLUMN "updatedAt" SET DEFAULT 'NOW()'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments" ALTER COLUMN "updatedAt" SET DEFAULT '2023-03-05 10:03:23.356868'`);
        await queryRunner.query(`ALTER TABLE "comments" ALTER COLUMN "createdAt" SET DEFAULT '2023-03-05 10:03:23.356868'`);
        await queryRunner.query(`ALTER TABLE "publication" ALTER COLUMN "date" SET DEFAULT '2023-03-05 10:03:23.356868'`);
    }

}
