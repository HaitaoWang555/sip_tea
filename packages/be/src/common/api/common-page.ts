import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min, IsNotEmpty } from 'class-validator';
import { PickType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class PageInfo<T> {
  /**
   * 分页开始
   * @example 1
   */
  @ApiProperty({ description: '分页开始', example: 1 })
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Transform(({ value }) => parseInt(value))
  readonly pageNum: number;
  /**
   * 分页数
   * @example 10
   */
  @ApiProperty({ description: '分页数', example: 10 })
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Transform(({ value }) => parseInt(value))
  readonly pageSize: number;

  @ApiProperty({ description: '总页数' })
  readonly total: number;

  /**
   * 分页
   */
  @ApiProperty({ description: '分页列表' })
  readonly list: T[];

  constructor(pageNum?: number, pageSize?: number, total?: number, list?: T[]) {
    this.pageNum = pageNum;
    this.pageSize = pageSize;
    this.total = total;
    this.list = list;
  }
}

export class PageParams extends PickType(PageInfo, ['pageNum', 'pageSize']) {}
