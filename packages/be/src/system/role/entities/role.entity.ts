import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { IsNotEmpty, IsEnum } from 'class-validator';
import { Status } from '@/common/enum';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { Base } from '@/common/entities/base';

import { User } from '../../user/entities/user.entity';
/**
 * 角色
 */
@Entity()
export class Role extends Base {
  /**
   * 主键
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * 角色名称
   */
  @Column({ comment: '角色名称', length: 64 })
  @IsNotEmpty()
  title: string;

  /**
   * 角色编码
   */
  @Column({ comment: '角色编码', length: 64 })
  @IsNotEmpty()
  code: string;

  /**
   * 状态
   */
  @ApiProperty({ enum: [Status.YES, Status.NO] })
  @Type(() => Number)
  @IsEnum(Status)
  @Column({ default: Status.NO })
  status: Status;

  /**
   * 用户
   */
  @ManyToMany(() => User, (user) => user.roles)
  users?: User[];
}
