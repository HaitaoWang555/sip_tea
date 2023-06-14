import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { Status } from '@/common/enum';

/**
 * 系统用户
 */
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  /**
   * 姓名
   * @example 'wht'
   */
  @IsNotEmpty()
  @Column()
  name: string;
  /**
   * 邮箱
   * @example '123@456.com'
   */
  @IsEmail()
  @Column()
  email: string;

  /**
   * 生效状态 0 禁用 ；1 启用
   */
  @ApiProperty({ enum: [Status.YES, Status.NO] })
  @Type(() => Number)
  @IsEnum(Status)
  @Column()
  status: Status;
}
