import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Allow, IsNotEmpty } from 'class-validator';
import { GenTableColumn } from './gen_table_column.entity';
import { Base } from '@/common/entities/base';

/**
 * 代码生成表
 */
@Entity()
export class GenTable extends Base {
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * 表名称
   */
  @IsNotEmpty()
  @Column()
  tableName: string;

  /**
   * 表描述
   */
  @IsNotEmpty()
  @Column()
  tableComment: string;

  /**
   * 一对多关联 代码生成表属性
   */
  @OneToMany(() => GenTableColumn, (column) => column.table, { cascade: true })
  @Allow()
  columns: GenTableColumn[];
}
