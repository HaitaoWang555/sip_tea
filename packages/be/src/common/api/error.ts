import { ResultCode, ResultMessage } from '@/common/api/result-enum';

export class ApiException extends Error {
  code: number;
  message: string;

  constructor(code?: number, message?: string) {
    super();
    this.code = code || ResultCode.FAILED;
    this.message = message || ResultMessage.FAILED;
  }
}
