import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';

export enum Status {
  ENABLE = 0,
  DISABLE = 1,
}

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
  @ApiProperty({ enum: [Status.ENABLE, Status.DISABLE] })
  @Type(() => Number)
  @IsEnum(Status)
  @Column()
  status: Status;
}
