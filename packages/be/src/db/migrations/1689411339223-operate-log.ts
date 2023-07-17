import { MigrationInterface, QueryRunner } from 'typeorm';

export class OperateLog1689411339223 implements MigrationInterface {
  name = 'OperateLog1689411339223';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`operatelog\` MODIFY \`ip\` varchar(64) NULL COMMENT 'ip'`);
    await queryRunner.query(`ALTER TABLE \`operatelog\` MODIFY \`body\` text NULL COMMENT 'body'`);
    await queryRunner.query(`ALTER TABLE \`operatelog\` MODIFY \`error\` text NULL COMMENT '错误信息'`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`operatelog\` MODIFY \`error\` varchar(2048) NULL COMMENT '错误信息'`);
    await queryRunner.query(`ALTER TABLE \`operatelog\` MODIFY \`body\` varchar(2048) NULL COMMENT 'body'`);
    await queryRunner.query(`ALTER TABLE \`operatelog\` MODIFY \`ip\` varchar(16) NULL COMMENT 'ip'`);
  }
}
