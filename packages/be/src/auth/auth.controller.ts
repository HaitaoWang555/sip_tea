import { Body, Controller, Get, Ip, Param, Post, Put, Request, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from '../common/decorators/public.decorator';
import { ApiTags } from '@nestjs/swagger';
import { SignInDto, SignInSuccessDto } from './dto/sign-in.dto';
import { extractTokenFromHeader } from '@/utils/common';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ResultMessage } from '@/common/api/result-enum';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   * 获取验证码
   */
  @Public()
  @Get('captcha/:key')
  captcha(@Param('key') key: string, @Ip() ip: string) {
    return this.authService.captcha(key, ip);
  }
  /**
   * 登录
   */
  @Public()
  @Post('login')
  signIn(@Body() signInDto: SignInDto): Promise<SignInSuccessDto> {
    return this.authService.signIn(signInDto);
  }

  /**
   * 退出
   */
  @Post('logout')
  logout(@Request() req) {
    const token = extractTokenFromHeader(req);
    return this.authService.logout(token);
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

  /**
   * 修改自己信息
   */
  @Put('profile')
  updateProfile(@Request() req, @Body() updateProfileDto: UpdateProfileDto) {
    if (req.user && req.user.sub) {
      return this.authService.updateProfile(req.user.sub, updateProfileDto);
    } else {
      throw new UnauthorizedException(ResultMessage.UNAUTHORIZED);
    }
  }
}
