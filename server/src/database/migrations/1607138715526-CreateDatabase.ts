import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateDatabase1607138715526 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createDatabase('gcbdesenv', true);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropDatabase('gcbdesenv');
  }
}
