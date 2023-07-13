import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1689243702614 implements MigrationInterface {
  name = 'Init1689243702614';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`gen_table\` (\`created_by\` varchar(64) NULL, \`updated_by\` varchar(64) NULL, \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, \`remark\` varchar(500) NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`table_name\` varchar(255) NOT NULL, \`table_comment\` varchar(255) NOT NULL, \`package\` varchar(255) NOT NULL, \`is_have_base\` tinyint NOT NULL DEFAULT '0', \`is_tree\` tinyint NOT NULL DEFAULT '0', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`gen_table_column\` (\`id\` int NOT NULL AUTO_INCREMENT, \`column_name\` varchar(255) NOT NULL, \`column_comment\` varchar(255) NOT NULL, \`column_type\` varchar(255) NOT NULL, \`length\` int NULL, \`is_pk\` tinyint NOT NULL DEFAULT '0', \`is_table\` tinyint NOT NULL DEFAULT '0', \`is_form\` tinyint NOT NULL DEFAULT '0', \`is_query\` tinyint NOT NULL DEFAULT '0', \`is_info\` tinyint NOT NULL DEFAULT '0', \`is_required\` tinyint NOT NULL DEFAULT '0', \`validator_type\` varchar(255) NULL, \`query_type\` varchar(255) NULL, \`form_type\` varchar(255) NULL, \`dict_type\` varchar(255) NULL, \`table_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`poetry\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(64) NOT NULL COMMENT '标题', \`dynasty\` varchar(16) NULL COMMENT '朝代', \`author\` varchar(16) NULL COMMENT '作者', \`content\` text NULL COMMENT '内容', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`operatelog\` (\`id\` int NOT NULL AUTO_INCREMENT, \`path\` varchar(64) NULL COMMENT '请求路径', \`method\` varchar(8) NULL COMMENT '请求方式', \`ip\` varchar(16) NULL COMMENT 'ip', \`query\` varchar(2048) NULL COMMENT 'query', \`params\` varchar(128) NULL COMMENT 'params', \`body\` varchar(2048) NULL COMMENT 'body', \`result\` text NULL COMMENT '响应结果', \`error\` varchar(2048) NULL COMMENT '错误信息', \`time\` float NULL COMMENT '响应时间', \`created_by\` varchar(64) NULL COMMENT '操作人', \`status\` tinyint NOT NULL DEFAULT '0', \`created_at\` timestamp NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`position\` (\`created_by\` varchar(64) NULL, \`updated_by\` varchar(64) NULL, \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, \`remark\` varchar(500) NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(64) NOT NULL COMMENT '职位', \`code\` varchar(64) NOT NULL COMMENT '职位编码', \`post_rank\` varchar(64) NULL COMMENT '职级', \`status\` tinyint NOT NULL DEFAULT '0', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`menu\` (\`created_by\` varchar(64) NULL, \`updated_by\` varchar(64) NULL, \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, \`remark\` varchar(500) NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(64) NOT NULL COMMENT '菜单标题', \`parent_id\` int NOT NULL COMMENT '上级', \`type\` tinyint NOT NULL DEFAULT '1', \`code\` tinyint NOT NULL DEFAULT '0', \`url\` varchar(128) NOT NULL COMMENT '前端路径', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`resource\` (\`created_by\` varchar(64) NULL, \`updated_by\` varchar(64) NULL, \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, \`remark\` varchar(500) NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(64) NOT NULL COMMENT '名称', \`url\` varchar(128) NOT NULL COMMENT '资源路径', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`role\` (\`created_by\` varchar(64) NULL, \`updated_by\` varchar(64) NULL, \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, \`remark\` varchar(500) NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(64) NOT NULL COMMENT '角色名称', \`code\` varchar(64) NOT NULL COMMENT '角色编码', \`status\` tinyint NOT NULL DEFAULT '0', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`user\` (\`created_by\` varchar(64) NULL, \`updated_by\` varchar(64) NULL, \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, \`remark\` varchar(500) NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`username\` varchar(64) NOT NULL COMMENT '用户名', \`password\` varchar(512) NOT NULL COMMENT '密码', \`email\` varchar(256) NOT NULL COMMENT '邮箱', \`nick_name\` varchar(128) NOT NULL COMMENT '昵称', \`icon\` varchar(512) NULL COMMENT '头像', \`login_time\` timestamp NULL, \`status\` tinyint NOT NULL DEFAULT '0', UNIQUE INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` (\`username\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`department\` (\`created_by\` varchar(64) NULL, \`updated_by\` varchar(64) NULL, \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, \`remark\` varchar(500) NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(64) NOT NULL COMMENT '部门名称', \`parent_id\` int NOT NULL COMMENT '上级部门', \`status\` tinyint NOT NULL DEFAULT '0', \`code\` varchar(64) NOT NULL COMMENT '部门编码', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`role_menus_menu\` (\`role_id\` int NOT NULL, \`menu_id\` int NOT NULL, INDEX \`IDX_6e004b7f1dd4799d21c5fb269b\` (\`role_id\`), INDEX \`IDX_34abafc343439e01d70c7e43ed\` (\`menu_id\`), PRIMARY KEY (\`role_id\`, \`menu_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`role_resources_resource\` (\`role_id\` int NOT NULL, \`resource_id\` int NOT NULL, INDEX \`IDX_c1ae9dfbd827739de39e18c196\` (\`role_id\`), INDEX \`IDX_a4675b91c993eb8e1167541531\` (\`resource_id\`), PRIMARY KEY (\`role_id\`, \`resource_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`user_positions_position\` (\`user_id\` int NOT NULL, \`position_id\` int NOT NULL, INDEX \`IDX_ea38ce451243a72bd975a31b1b\` (\`user_id\`), INDEX \`IDX_e34b94d718c6e16c95e15aecdd\` (\`position_id\`), PRIMARY KEY (\`user_id\`, \`position_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`user_departments_department\` (\`user_id\` int NOT NULL, \`department_id\` int NOT NULL, INDEX \`IDX_9de1372519f03eef49056a60b4\` (\`user_id\`), INDEX \`IDX_ddeb3d34d4988b599ec88d9887\` (\`department_id\`), PRIMARY KEY (\`user_id\`, \`department_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`user_roles_role\` (\`user_id\` int NOT NULL, \`role_id\` int NOT NULL, INDEX \`IDX_09d115a69b6014d324d592f9c4\` (\`user_id\`), INDEX \`IDX_0e2f5483d5e8d52043f9763453\` (\`role_id\`), PRIMARY KEY (\`user_id\`, \`role_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`gen_table_column\` ADD CONSTRAINT \`FK_39fefec056a5198f74c0b994421\` FOREIGN KEY (\`table_id\`) REFERENCES \`gen_table\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`role_menus_menu\` ADD CONSTRAINT \`FK_6e004b7f1dd4799d21c5fb269b4\` FOREIGN KEY (\`role_id\`) REFERENCES \`role\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`role_menus_menu\` ADD CONSTRAINT \`FK_34abafc343439e01d70c7e43ede\` FOREIGN KEY (\`menu_id\`) REFERENCES \`menu\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`role_resources_resource\` ADD CONSTRAINT \`FK_c1ae9dfbd827739de39e18c196f\` FOREIGN KEY (\`role_id\`) REFERENCES \`role\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`role_resources_resource\` ADD CONSTRAINT \`FK_a4675b91c993eb8e11675415319\` FOREIGN KEY (\`resource_id\`) REFERENCES \`resource\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_positions_position\` ADD CONSTRAINT \`FK_ea38ce451243a72bd975a31b1bc\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_positions_position\` ADD CONSTRAINT \`FK_e34b94d718c6e16c95e15aecdd8\` FOREIGN KEY (\`position_id\`) REFERENCES \`position\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_departments_department\` ADD CONSTRAINT \`FK_9de1372519f03eef49056a60b43\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_departments_department\` ADD CONSTRAINT \`FK_ddeb3d34d4988b599ec88d9887b\` FOREIGN KEY (\`department_id\`) REFERENCES \`department\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_roles_role\` ADD CONSTRAINT \`FK_09d115a69b6014d324d592f9c42\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_roles_role\` ADD CONSTRAINT \`FK_0e2f5483d5e8d52043f97634538\` FOREIGN KEY (\`role_id\`) REFERENCES \`role\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`user_roles_role\` DROP FOREIGN KEY \`FK_0e2f5483d5e8d52043f97634538\``);
    await queryRunner.query(`ALTER TABLE \`user_roles_role\` DROP FOREIGN KEY \`FK_09d115a69b6014d324d592f9c42\``);
    await queryRunner.query(
      `ALTER TABLE \`user_departments_department\` DROP FOREIGN KEY \`FK_ddeb3d34d4988b599ec88d9887b\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_departments_department\` DROP FOREIGN KEY \`FK_9de1372519f03eef49056a60b43\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_positions_position\` DROP FOREIGN KEY \`FK_e34b94d718c6e16c95e15aecdd8\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_positions_position\` DROP FOREIGN KEY \`FK_ea38ce451243a72bd975a31b1bc\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`role_resources_resource\` DROP FOREIGN KEY \`FK_a4675b91c993eb8e11675415319\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`role_resources_resource\` DROP FOREIGN KEY \`FK_c1ae9dfbd827739de39e18c196f\``,
    );
    await queryRunner.query(`ALTER TABLE \`role_menus_menu\` DROP FOREIGN KEY \`FK_34abafc343439e01d70c7e43ede\``);
    await queryRunner.query(`ALTER TABLE \`role_menus_menu\` DROP FOREIGN KEY \`FK_6e004b7f1dd4799d21c5fb269b4\``);
    await queryRunner.query(`ALTER TABLE \`gen_table_column\` DROP FOREIGN KEY \`FK_39fefec056a5198f74c0b994421\``);
    await queryRunner.query(`DROP INDEX \`IDX_0e2f5483d5e8d52043f9763453\` ON \`user_roles_role\``);
    await queryRunner.query(`DROP INDEX \`IDX_09d115a69b6014d324d592f9c4\` ON \`user_roles_role\``);
    await queryRunner.query(`DROP TABLE \`user_roles_role\``);
    await queryRunner.query(`DROP INDEX \`IDX_ddeb3d34d4988b599ec88d9887\` ON \`user_departments_department\``);
    await queryRunner.query(`DROP INDEX \`IDX_9de1372519f03eef49056a60b4\` ON \`user_departments_department\``);
    await queryRunner.query(`DROP TABLE \`user_departments_department\``);
    await queryRunner.query(`DROP INDEX \`IDX_e34b94d718c6e16c95e15aecdd\` ON \`user_positions_position\``);
    await queryRunner.query(`DROP INDEX \`IDX_ea38ce451243a72bd975a31b1b\` ON \`user_positions_position\``);
    await queryRunner.query(`DROP TABLE \`user_positions_position\``);
    await queryRunner.query(`DROP INDEX \`IDX_a4675b91c993eb8e1167541531\` ON \`role_resources_resource\``);
    await queryRunner.query(`DROP INDEX \`IDX_c1ae9dfbd827739de39e18c196\` ON \`role_resources_resource\``);
    await queryRunner.query(`DROP TABLE \`role_resources_resource\``);
    await queryRunner.query(`DROP INDEX \`IDX_34abafc343439e01d70c7e43ed\` ON \`role_menus_menu\``);
    await queryRunner.query(`DROP INDEX \`IDX_6e004b7f1dd4799d21c5fb269b\` ON \`role_menus_menu\``);
    await queryRunner.query(`DROP TABLE \`role_menus_menu\``);
    await queryRunner.query(`DROP TABLE \`department\``);
    await queryRunner.query(`DROP INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` ON \`user\``);
    await queryRunner.query(`DROP TABLE \`user\``);
    await queryRunner.query(`DROP TABLE \`role\``);
    await queryRunner.query(`DROP TABLE \`resource\``);
    await queryRunner.query(`DROP TABLE \`menu\``);
    await queryRunner.query(`DROP TABLE \`position\``);
    await queryRunner.query(`DROP TABLE \`operatelog\``);
    await queryRunner.query(`DROP TABLE \`poetry\``);
    await queryRunner.query(`DROP TABLE \`gen_table_column\``);
    await queryRunner.query(`DROP TABLE \`gen_table\``);
  }
}
