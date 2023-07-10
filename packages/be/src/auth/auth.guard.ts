import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { ResultMessage } from '@/common/api/result-enum';
import { Request } from 'express';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { AuthService } from './auth.service';
import { extractTokenFromHeader } from '@/utils/common';
import { Redis } from 'ioredis';
import { InjectRedis } from '@/redis/redis.decorators';
import { REDIS_USER_LOGOUT_TOKEN } from '@/utils/consts';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger = new Logger(AuthGuard.name);
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
    private authService: AuthService,
    @InjectRedis() private readonly redis: Redis,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      // 💡 See this condition
      return true;
    }

    const request: Request = context.switchToHttp().getRequest();
    const token = extractTokenFromHeader(request);
    const isLogout = await this.redis.exists(REDIS_USER_LOGOUT_TOKEN + ':' + token);
    if (!token || isLogout === 1) {
      throw new UnauthorizedException(ResultMessage.UNAUTHORIZED);
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.SECRET,
      });
      // 查询权限判断是否可以访问此路径资源

      await this.verifyResource(payload.sub, request.path, request.method);
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      request['user'] = payload;
    } catch (e: any) {
      this.logger.error(e);
      if (e.name === 'ForbiddenException') {
        throw new ForbiddenException(e.message);
      }
      throw new UnauthorizedException(ResultMessage.UNAUTHORIZED);
    }
    return true;
  }

  private async verifyResource(id: number, url: string, method: string) {
    const urls = await this.authService.getUserResource(id);
    for (let index = 0; index < urls.length; index++) {
      let temUrl = url;
      const element = urls[index];
      if (['GET', 'POST', 'DELETE', 'PATCH', 'DELETE'].some((i) => element.startsWith(i))) {
        temUrl = method + ':' + temUrl;
      }
      if (element.endsWith('/**')) {
        const startUrl = element.slice(0, -3);
        if (temUrl.startsWith(startUrl)) return;
      } else {
        if (element === temUrl) {
          return;
        }
      }
    }
    throw new ForbiddenException(ResultMessage.FORBIDDEN);
  }
}
