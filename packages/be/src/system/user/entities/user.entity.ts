import { Entity, Column, PrimaryGeneratedColumn, JoinTable, ManyToMany, Index } from 'typeorm';
import { IsNotEmpty, Allow, IsEnum, IsEmail } from 'class-validator';
import { Status } from '@/common/enum';
import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { Base } from '@/common/entities/base';
import { formatDate } from 'lib';

import { Position } from '../../position/entities/position.entity';
import { Department } from '../../department/entities/department.entity';
import { Role } from '../../role/entities/role.entity';

/**
 * 用户
 */
@Entity()
export class User extends Base {
  /**
   * 主键
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * 用户名
   */
  @Index({ unique: true })
  @Column({ comment: '用户名', length: 64 })
  @IsNotEmpty()
  username: string;

  /**
   * 密码
   */
  @Column({ comment: '密码', length: 512, select: false })
  @IsNotEmpty()
  password: string;

  /**
   * 邮箱
   */
  @Column({ comment: '邮箱', length: 256 })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  /**
   * 昵称
   */
  @Column({ comment: '昵称', length: 128 })
  @Allow()
  nickName: string;

  /**
   * 头像
   */
  @Column({ comment: '头像', length: 512, nullable: true })
  @Allow()
  icon: string;

  /**
   * 最后登录时间
   */
  @Column({
    nullable: true,
    type: 'timestamp',
    transformer: {
      from(value: Date): string {
        return formatDate(value, 'YYYY-MM-DD HH:mm:ss');
      },
      to(value: Date): Date {
        return value;
      },
    },
  })
  loginTime: Date;

  /**
   * 状态
   */
  @ApiProperty({ enum: [Status.YES, Status.NO] })
  @Type(() => Number)
  @IsEnum(Status)
  @Column({ default: Status.NO })
  status: Status;

  /**
   * 职位
   */
  @ManyToMany(() => Position, (position) => position.users)
  @JoinTable()
  positions?: Position[];

  /**
   * 职位id 集合
   */
  @Allow()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return value.split(',').map((i) => Number(i));
    } else {
      return value;
    }
  })
  positionIds?: number[];

  /**
   * 部门
   */
  @ManyToMany(() => Department, (department) => department.users)
  @JoinTable()
  @Allow()
  departments?: Department[];

  /**
   * 部门id 集合
   */
  @Allow()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return value.split(',').map((i) => Number(i));
    } else {
      return value;
    }
  })
  departmentIds?: number[];

  /**
   * 角色
   */
  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable()
  @Allow()
  roles?: Role[];

  /**
   * 角色id 集合
   */
  @Allow()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return value.split(',').map((i) => Number(i));
    } else {
      return value;
    }
  })
  roleIds?: number[];
}
