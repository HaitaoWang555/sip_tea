import { ApiProperty } from '@nestjs/swagger';
import { ResultCode, ResultMessage } from './result-enum';

export class CommonResult<T> {
  @ApiProperty({ description: '数据' })
  readonly data: T;
  @ApiProperty({ description: '提示信息' })
  readonly message: string;
  @ApiProperty({ description: '状态码' })
  readonly code: number;

  constructor(data?: T, message?: string, code?: number) {
    this.code = code;
    this.message = message;
    this.data = data;
  }

  public success(data: T, message: string = ResultMessage.SUCCESS) {
    return new CommonResult(data, message, ResultCode.SUCCESS);
  }

  public fail(message?: string, code?: number) {
    return new CommonResult(null, message || ResultMessage.FAILED, code || ResultCode.FAILED);
  }
}
