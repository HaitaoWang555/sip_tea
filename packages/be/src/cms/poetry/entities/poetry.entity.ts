import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty, Allow } from 'class-validator';

/**
 * 诗词
 */
@Entity()
export class Poetry {
  /**
   * 主键
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * 标题
   */
  @Column({ comment: '标题', length: 64 })
  @IsNotEmpty()
  title: string;

  /**
   * 朝代
   */
  @Column({ comment: '朝代', length: 16, nullable: true })
  @IsNotEmpty()
  dynasty: string;

  /**
   * 作者
   */
  @Column({ comment: '作者', length: 16, nullable: true })
  @Allow()
  author: string;

  /**
   * 内容
   */
  @Column({ comment: '内容', nullable: true, type: 'text' })
  @Allow()
  content: string;
}
