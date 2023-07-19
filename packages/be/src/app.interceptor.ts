import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommonResult } from './common/api/common-result';
import { Request } from 'express';
import { OperatelogService } from './monitor/operateLog/operateLog.service';
import { OperateLog } from './common/enum/operate-log';

@Injectable()
export class AppInterceptor implements NestInterceptor {
  private readonly logger = new Logger(AppInterceptor.name);

  constructor(private operatelogService: OperatelogService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        const result = new CommonResult().success(data);

        const request: Request = context.switchToHttp().getRequest();

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
              result: loggerType !== OperateLog.NORESULT ? JSON.stringify(result) : '',
              error: '',
              time: (Date.now() - request['starting']) / 1000,
              createdBy: request['user'] && request['user'].username,
              status: 1,
              createdAt: new Date(),
            })
            .catch((err) => {
              this.logger.error(err, err.stack);
            });
        }

        return result;
      }),
    );
  }
}
