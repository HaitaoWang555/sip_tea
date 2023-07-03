import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty, IsEnum } from 'class-validator';
import { Status } from '@/common/enum';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { Base } from '@/common/entities/base';

/**
 * 菜单
 */
@Entity()
export class Menu extends Base {
  /**
   * 主键
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * 菜单标题
   */
  @Column({ comment: '菜单标题', length: 64 })
  @IsNotEmpty()
  title: string;

  /**
   * 上级
   */
  @Column({ comment: '上级' })
  @IsNotEmpty()
  parentId: number;

  /**
   * 状态
   */
  @ApiProperty({ enum: [Status.YES, Status.NO] })
  @Type(() => Number)
  @IsEnum(Status)
  @Column({ default: Status.NO })
  code: Status;

  /**
   * 前端路径
   */
  @Column({ comment: '前端路径', length: 128 })
  @IsNotEmpty()
  url: string;
}
