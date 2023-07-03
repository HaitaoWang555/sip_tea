import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Allow, IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { Status } from '@/common/enum';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { GenTable } from '@/gen_table/entities/gen_table.entity';

/**
 * 代码生成表属性
 */
@Entity()
export class GenTableColumn {
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * 归属表ID
   */
  @ManyToOne(() => GenTable, (table) => table.columns, { onDelete: 'CASCADE' })
  @Allow()
  table: GenTable;

  /**
   * 列名称
   */
  @IsNotEmpty()
  @Column()
  columnName: string;

  /**
   * 列描述
   */
  @IsNotEmpty()
  @Column()
  columnComment: string;

  /**
   * 列类型
   */
  @IsNotEmpty()
  @Column()
  columnType: string;

  /**
   * 列为字符串时的长度
   */
  @Allow()
  @IsNumber()
  @Column({ nullable: true })
  length: number;

  /**
   * 是否主键（1是）(0不是)
   */
  @ApiProperty({ enum: [Status.YES, Status.NO] })
  @Type(() => Number)
  @IsEnum(Status)
  @Column()
  isPk: Status;

  /**
   * 是否列表字段（1是）(0不是)
   */
  @ApiProperty({ enum: [Status.YES, Status.NO] })
  @Type(() => Number)
  @IsEnum(Status)
  @Column()
  isTable: Status;

  /**
   * 是否编辑字段（1是）(0不是)
   */
  @ApiProperty({ enum: [Status.YES, Status.NO] })
  @Type(() => Number)
  @IsEnum(Status)
  @Column()
  isForm: Status;

  /**
   * 是否查询字段（1是）(0不是)
   */
  @ApiProperty({ enum: [Status.YES, Status.NO] })
  @Type(() => Number)
  @IsEnum(Status)
  @Column()
  isQuery: Status;

  /**
   * 是否详情字段（1是）(0不是)
   */
  @ApiProperty({ enum: [Status.YES, Status.NO] })
  @Type(() => Number)
  @IsEnum(Status)
  @Column()
  isInfo: Status;

  /**
   * 是否必填（1是）(0不是)
   */
  @ApiProperty({ enum: [Status.YES, Status.NO] })
  @Type(() => Number)
  @IsEnum(Status)
  @Column()
  isRequired: Status;

  /**
   * 校验规则
   */
  @Allow()
  @Column({ nullable: true })
  validatorType: string;

  /**
   * 查询类型
   */
  @Allow()
  @Column({ nullable: true })
  queryType: string;

  /**
   * 前端编辑组件
   */
  @Allow()
  @Column({ nullable: true })
  formType: string;

  /**
   * 字典类型
   */
  @Allow()
  @Column({ nullable: true })
  dictType: string;
}
