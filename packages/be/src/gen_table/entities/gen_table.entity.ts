import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Allow, IsEnum, IsNotEmpty } from 'class-validator';
import { GenTableColumn } from './gen_table_column.entity';
import { Base } from '@/common/entities/base';
import { Status } from '@/common/enum';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

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
   * 生成文件包名
   */
  @Allow()
  @Column()
  package: string;

  /**
   * 是否包含基础字段
   */
  @Allow()
  @ApiProperty({ enum: [Status.YES, Status.NO] })
  @Type(() => Number)
  @IsEnum(Status)
  @Column({ default: Status.NO })
  isHaveBase: Status;

  /**
   * 一对多关联 代码生成表属性
   */
  @OneToMany(() => GenTableColumn, (column) => column.table, { cascade: true })
  @Allow()
  columns: GenTableColumn[];
}
