import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { CommonResult } from './common/api/common-result';

@Injectable()
export class AppInterceptor implements NestInterceptor {
  private readonly logger = new Logger(AppInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        return new CommonResult().success(data);
      }),
      catchError((err) => {
        this.logger.error(err);

        if (err.status) {
          return of(new CommonResult().fail(err.response.message, err.status));
        }
        return of(new CommonResult().fail(err.message));
      }),
    );
  }
}
