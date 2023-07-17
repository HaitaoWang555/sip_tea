import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Status } from '@/common/enum';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { formatDate } from 'lib';

/**
 * 操作日志
 */
@Entity()
export class Operatelog {
  /**
   * 主键
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * 请求路径
   */
  @Column({ comment: '请求路径', length: 64, nullable: true })
  path: string;

  /**
   * 请求方式
   */
  @Column({ comment: '请求方式', length: 8, nullable: true })
  method: string;

  /**
   * ip
   */
  @Column({ comment: 'ip', length: 64, nullable: true })
  ip: string;

  /**
   * query
   */
  @Column({ comment: 'query', length: 2048, nullable: true })
  query: string;

  /**
   * params
   */
  @Column({ comment: 'params', length: 128, nullable: true })
  params: string;

  /**
   * body
   */
  @Column({ comment: 'body', type: 'text', nullable: true })
  body: string;

  /**
   * 响应结果
   */
  @Column({ comment: '响应结果', type: 'text', nullable: true, select: false })
  result: string;

  /**
   * 错误信息
   */
  @Column({ comment: '错误信息', type: 'text', nullable: true, select: false })
  error: string;

  /**
   * 响应时间
   */
  @Column({ comment: '响应时间', nullable: true, type: 'float' })
  time: number;

  /**
   * 操作人
   */
  @Column({ comment: '操作人', length: 64, nullable: true })
  createdBy: string;

  /**
   * 状态
   */
  @ApiProperty({ enum: [Status.YES, Status.NO] })
  @Type(() => Number)
  @Column({ default: Status.NO, type: 'tinyint' })
  status: Status;

  /**
   * 操作时间
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
  createdAt: Date;
}
