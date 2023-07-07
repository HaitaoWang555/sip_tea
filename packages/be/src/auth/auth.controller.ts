import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from '../decorators/public.decorator';
import { ApiTags } from '@nestjs/swagger';
import { SignInDto, SignInSuccessDto } from './dto/sign-in.dto';
import { InjectRedis } from '@/redis/redis.decorators';
import { Redis } from 'ioredis';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, @InjectRedis() private readonly redis: Redis) {}

  /**
   * 登录
   */
  @Public()
  @Post('login')
  signIn(@Body() signInDto: SignInDto): Promise<SignInSuccessDto> {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  /**
   * 获取登录用户
   */
  @Get('profile')
  getProfile(@Request() req) {
    if (req.user && req.user.sub) {
      return this.authService.profile(req.user.sub);
    }
    return req.user;
  }
}
