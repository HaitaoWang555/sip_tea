import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { IsNotEmpty, IsEnum, Allow } from 'class-validator';
import { Status } from '@/common/enum';
import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { Base } from '@/common/entities/base';

import { User } from '../../user/entities/user.entity';
import { Menu } from '../../menu/entities/menu.entity';
import { Resource } from '../../resource/entities/resource.entity';
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
  @ManyToMany(() => User, (user) => user.roles, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  users?: User[];

  /**
   * 菜单
   */
  @ManyToMany(() => Menu, (menu) => menu.roles)
  @JoinTable()
  @Allow()
  menus?: Menu[];

  /**
   * 菜单id 集合
   */
  @Allow()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return value.split(',').map((i) => Number(i));
    } else {
      return value;
    }
  })
  menuIds?: number[];

  /**
   * 资源
   */
  @ManyToMany(() => Resource, (r) => r.roles)
  @JoinTable()
  @Allow()
  resources?: Resource[];

  /**
   * 资源id 集合
   */
  @Allow()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return value.split(',').map((i) => Number(i));
    } else {
      return value;
    }
  })
  resourceIds?: number[];
}
