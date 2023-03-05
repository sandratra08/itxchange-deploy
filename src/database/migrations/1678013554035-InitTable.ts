import { MigrationInterface, QueryRunner } from "typeorm";

export class InitTable1678013554035 implements MigrationInterface {
    name = 'InitTable1678013554035'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "publication" ALTER COLUMN "date" SET DEFAULT 'NOW()'`);
        await queryRunner.query(`ALTER TABLE "comments" ALTER COLUMN "createdAt" SET DEFAULT 'NOW()'`);
        await queryRunner.query(`ALTER TABLE "comments" ALTER COLUMN "updatedAt" SET DEFAULT 'NOW()'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments" ALTER COLUMN "updatedAt" SET DEFAULT '2023-03-05 10:08:52.168631'`);
        await queryRunner.query(`ALTER TABLE "comments" ALTER COLUMN "createdAt" SET DEFAULT '2023-03-05 10:08:52.168631'`);
        await queryRunner.query(`ALTER TABLE "publication" ALTER COLUMN "date" SET DEFAULT '2023-03-05 10:08:52.168631'`);
    }

}
