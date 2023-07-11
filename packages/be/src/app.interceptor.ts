import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable, of } from 'rxjs';
import { map, catchError, finalize } from 'rxjs/operators';
import { CommonResult } from './common/api/common-result';
import { LOGGER_TYPE } from './common/decorators/log.decorator';
import { Request } from 'express';

@Injectable()
export class AppInterceptor implements NestInterceptor {
  private readonly logger = new Logger(AppInterceptor.name);

  constructor(private reflector: Reflector) {}

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
        if (loggerType) {
          const request: Request = context.switchToHttp().getRequest();
          this.logger.log(
            `url: ${request.url} - method: ${request.method} - 
            ip: ${request.ip} - ips: ${JSON.stringify(request.ips)} - 
            params: ${JSON.stringify(request.params)} - 
            body: ${JSON.stringify(request.body)} - 
            result: ${JSON.stringify(result)} - 
            error: ${JSON.stringify(error)} - 
            time: ${(Date.now() - time) / 1000} - 
            user: ${JSON.stringify(request['user'])}`,
          );
        }
      }),
    );
  }
}
