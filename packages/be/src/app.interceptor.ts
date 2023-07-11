import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable, of } from 'rxjs';
import { map, catchError, finalize } from 'rxjs/operators';
import { CommonResult } from './common/api/common-result';
import { LOGGER_TYPE } from './common/decorators/log.decorator';
import { Request } from 'express';
import { OperatelogService } from './monitor/operateLog/operateLog.service';
import { OperateLog } from './common/enum/operate-log';

@Injectable()
export class AppInterceptor implements NestInterceptor {
  private readonly logger = new Logger(AppInterceptor.name);

  constructor(private reflector: Reflector, private operatelogService: OperatelogService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const loggerType = this.reflector.getAllAndOverride<string>(LOGGER_TYPE, [
      context.getHandler(),
      context.getClass(),
    ]);

    let result, error;
    const time = Date.now();

    return next.handle().pipe(
      map((data) => {
        result = new CommonResult().success(data);
        return result;
      }),
      catchError((err) => {
        error = err;
        if (err.code) {
          // 自定义错误 不需要打印
          return of(new CommonResult().fail(err.message, err.code));
        }
        this.logger.error(err, err.stack);

        if (err.status) {
          return of(new CommonResult().fail(err.response.message, err.status));
        }
        return of(new CommonResult().fail(err.message));
      }),
      finalize(() => {
        if (loggerType && loggerType !== OperateLog.NO) {
          // 操作日志入库
          const request: Request = context.switchToHttp().getRequest();

          const ip = request.ips && request.ips.length > 0 ? request.ips[0] : request.ip;
          this.operatelogService.create({
            path: request.path,
            method: request.method,
            ip: ip,
            query: request.query ? JSON.stringify(request.query) : '',
            params: request.params ? JSON.stringify(request.params) : '',
            body: request.body ? JSON.stringify(request.body) : '',
            result: loggerType !== OperateLog.NORESULT ? JSON.stringify(result) : '',
            error: JSON.stringify(error),
            time: (Date.now() - time) / 1000,
            createdBy: request['user'].username,
            status: error ? 0 : 1,
            createdAt: new Date(),
          });
        }
      }),
    );
  }
}
