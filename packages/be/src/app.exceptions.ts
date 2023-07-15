import { ExceptionFilter, Catch, ArgumentsHost, HttpException, Logger, HttpStatus } from '@nestjs/common';
import { CommonResult } from './common/api/common-result';
import { HttpAdapterHost } from '@nestjs/core';
import { ResultCode } from './common/api/result-enum';
import { OperateLog } from './common/enum';
import { OperatelogService } from './monitor/operateLog/operateLog.service';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);
  constructor(
    private readonly httpAdapterHost: HttpAdapterHost,
    private readonly operatelogService: OperatelogService,
  ) {}

  catch(exception: any, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const loggerType = request['loggerType'];

    if (loggerType && loggerType !== OperateLog.NO) {
      // 操作日志入库
      const ip = request.ips && request.ips.length > 0 ? request.ips[0] : request.ip;

      this.operatelogService
        .create({
          path: request.path,
          method: request.method,
          ip: ip,
          query: request.query ? JSON.stringify(request.query) : '',
          params: request.params ? JSON.stringify(request.params) : '',
          body: request.body ? JSON.stringify(request.body) : '',
          result: '',
          error: JSON.stringify(exception),
          time: (Date.now() - request['starting']) / 1000,
          createdBy: request['user'].username,
          status: 1,
          createdAt: new Date(),
        })
        .catch((err) => {
          this.logger.error(err, err.stack);
        });
    }

    const status = exception instanceof HttpException ? exception.getStatus() : ResultCode.FAILED;
    if (status === HttpStatus.NOT_FOUND) {
      this.logger.error(exception.toString());
    } else {
      this.logger.error(exception.toString(), exception.stack);
    }
    this.logger.error('path: ' + httpAdapter.getRequestUrl(request));
    this.logger.error('method: ' + httpAdapter.getRequestMethod(request));

    httpAdapter.reply(ctx.getResponse(), new CommonResult().fail(exception.toString(), status), HttpStatus.OK);
  }
}
