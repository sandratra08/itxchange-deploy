import { MigrationInterface, QueryRunner } from 'typeorm';

export class Reaction1677929972153 implements MigrationInterface {
  name = 'Reaction1677929972153';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "publication" ALTER COLUMN "date" SET DEFAULT 'NOW()'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "publication" ALTER COLUMN "date" SET DEFAULT '2023-03-04 10:04:43.367382'`,
    );
  }
}
