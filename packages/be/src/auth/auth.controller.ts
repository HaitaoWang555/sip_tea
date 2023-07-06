import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from '../decorators/public.decorator';
import { ApiTags } from '@nestjs/swagger';
import { SignInDto, SignInSuccessDto } from './dto/sign-in.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   * 登陆
   */
  @Public()
  @Post('login')
  signIn(@Body() signInDto: SignInDto): Promise<SignInSuccessDto> {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  /**
   * 获取登陆用户
   */
  @Get('profile')
  getProfile(@Request() req) {
    if (req.user && req.user.sub) {
      return this.authService.profile(req.user.sub);
    }
    return req.user;
  }
}
