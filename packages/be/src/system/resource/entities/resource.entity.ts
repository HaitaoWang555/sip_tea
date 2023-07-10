import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { Base } from '@/common/entities/base';

import { Role } from '../../role/entities/role.entity';

/**
 * 资源
 */
@Entity()
export class Resource extends Base {
  /**
   * 主键
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * 名称
   */
  @Column({ comment: '名称', length: 64 })
  @IsNotEmpty()
  title: string;

  /**
   * 资源路径
   */
  @Column({ comment: '资源路径', length: 128 })
  @IsNotEmpty()
  url: string;

  /**
   * 角色
   */
  @ManyToMany(() => Role, (role) => role.resources, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  roles?: Role[];
}
