import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { IsNotEmpty, IsEnum } from 'class-validator';
import { MenuType, Status } from '@/common/enum';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { Base } from '@/common/entities/base';

import { Role } from '../../role/entities/role.entity';

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
   * 类型
   */
  @ApiProperty({ enum: [MenuType.MENU, MenuType.BUTTON] })
  @Type(() => Number)
  @IsEnum(MenuType)
  @Column({ default: MenuType.MENU, type: 'tinyint' })
  type?: MenuType;

  /**
   * 状态
   */
  @ApiProperty({ enum: [Status.YES, Status.NO] })
  @Type(() => Number)
  @IsEnum(Status)
  @Column({ default: Status.NO, type: 'tinyint' })
  code: Status;

  /**·
   * 前端路径
   */
  @Column({ comment: '前端路径', length: 128 })
  @IsNotEmpty()
  url: string;

  /**
   * 角色
   */
  @ManyToMany(() => Role, (role) => role.menus, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  roles?: Role[];
}
