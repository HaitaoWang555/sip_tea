import { Column } from 'typeorm';
import { formatDate } from 'lib';

export class Base {
  /**
   * 创建人
   */
  @Column({ nullable: true, length: 64 })
  createdBy?: string;
  /**
   * 更新人
   */
  @Column({ nullable: true, length: 64 })
  updatedBy?: string;
  /**
   * 创建时间
   */
  @Column({
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
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
  createdAt?: Date;
  /**
   * 更新时间
   */
  @Column({
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
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
  updatedAt?: Date;

  /**
   * 备注
   */
  @Column({ nullable: true, length: 500 })
  remark?: string;
}
