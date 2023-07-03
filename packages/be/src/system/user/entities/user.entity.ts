import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty, Allow, IsEnum } from 'class-validator';
import { Status } from '@/common/enum';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { Base } from '@/common/entities/base';
import { formatDate } from 'lib';

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
  @Column({ comment: '用户名', length: 64 })
  @IsNotEmpty()
  username: string;

  /**
   * 密码
   */
  @Column({ comment: '密码', length: 512 })
  @Allow()
  password: string;

  /**
   * 邮箱
   */
  @Column({ comment: '邮箱', length: 256 })
  @IsNotEmpty()
  email: string;

  /**
   * 昵称
   */
  @Column({ comment: '昵称', length: 128 })
  @Allow()
  nickName: string;

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
}
