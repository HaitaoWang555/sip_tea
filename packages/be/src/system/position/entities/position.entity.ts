import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { IsNotEmpty, Allow, IsEnum } from 'class-validator';
import { Status } from '@/common/enum';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { Base } from '@/common/entities/base';

import { User } from '../../user/entities/user.entity';
/**
 * 职位
 */
@Entity()
export class Position extends Base {
  /**
   * 主键
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * 职位
   */
  @Column({ comment: '职位', length: 64 })
  @IsNotEmpty()
  title: string;

  /**
   * 职位编码
   */
  @Column({ comment: '职位编码', length: 64 })
  @IsNotEmpty()
  code: string;

  /**
   * 职级
   */
  @Column({ comment: '职级', length: 64, nullable: true })
  @Allow()
  postRank: string;

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
  @ManyToMany(() => User, (user) => user.positions)
  users?: User[];
}
