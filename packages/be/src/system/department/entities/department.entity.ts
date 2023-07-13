import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { IsNotEmpty, Allow, IsEnum } from 'class-validator';
import { Status } from '@/common/enum';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { Base } from '@/common/entities/base';

import { User } from '../../user/entities/user.entity';
/**
 * 部门
 */
@Entity()
export class Department extends Base {
  /**
   * 主键
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * 部门名称
   */
  @Column({ comment: '部门名称', length: 64 })
  @IsNotEmpty()
  title: string;

  /**
   * 上级部门
   */
  @Column({ comment: '上级部门' })
  @Allow()
  parentId: number;

  /**
   * 状态
   */
  @ApiProperty({ enum: [Status.YES, Status.NO] })
  @Type(() => Number)
  @IsEnum(Status)
  @Column({ default: Status.NO, type: 'tinyint' })
  status: Status;

  /**
   * 部门编码
   */
  @Column({ comment: '部门编码', length: 64 })
  @IsNotEmpty()
  code: string;

  /**
   * 用户
   */
  @ManyToMany(() => User, (user) => user.positions, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  users?: User[];
}
