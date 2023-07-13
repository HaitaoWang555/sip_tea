import { ApiException } from '@/common/api/error';
import { ResultCode, ResultMessage } from '@/common/api/result-enum';
import { UserService } from '@/system/user/user.service';
import { encrypt } from '@/utils/crypto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ProfileDto } from './dto/profile.dto';
import { RoleService } from '@/system/role/role.service';
import { InjectRedis } from '@/redis/redis.decorators';
import { Redis } from 'ioredis';
import { REDIS_USER_RESOURCE, REDIS_USER_CAPTCHA, REDIS_USER_LOGOUT_TOKEN } from '@/utils/consts';
import { createMathExpr } from 'svg-captcha';
import { SignInDto, SignInSuccessDto } from './dto/sign-in.dto';
import { UpdateProfileDto } from './type';
import { UpdatePassword } from '@/system/user/dto/update-password';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private roleService: RoleService,
    @InjectRedis() private readonly redis: Redis,
  ) {}

  async signIn(signInDto: SignInDto): Promise<SignInSuccessDto> {
    // captcha 验证
    const captchaKey = REDIS_USER_CAPTCHA + ':' + signInDto.captchaKey;
    const captchaValue = await this.redis.get(captchaKey);
    if (captchaValue !== signInDto.captcha) {
      throw new ApiException('验证码错误！');
    }
    this.redis.del(captchaKey);

    const user = await this.userService.findOneByUsername(signInDto.username);
    if (!user || user.password !== encrypt(signInDto.password)) {
      throw new ApiException(ResultMessage.LOGIN_FAILED, ResultCode.FAILED);
    }

    const payload = { username: user.username, sub: user.id };
    const token = await this.jwtService.signAsync(payload);
    this.userService.update(user.id, { loginTime: new Date() });
    return {
      token: token,
    };
  }

  async profile(id: number, token?: string) {
    const user = await this.userService.findOne(id);
    if (!user) {
      await this.logout(token);
      throw new ApiException(ResultMessage.UNAUTHORIZED, ResultCode.UNAUTHORIZED);
    }
    const profile: ProfileDto = user;
    const roleIds = profile.roleIds;
    if (roleIds && roleIds.length > 0) {
      profile.menus = await this.roleService.findMenusByRoleIds(roleIds);
    }
    return profile;
  }

  async getUserResource(id: number) {
    const redisKey = REDIS_USER_RESOURCE + ':' + id;
    let urls: string[] = [];
    const hasKey = (await this.redis.exists(redisKey)) === 1;
    if (hasKey) {
      return await this.redis.lrange(redisKey, 0, -1);
    }
    const user = await this.userService.findOne(id);
    const roleIds = user.roleIds;
    if (roleIds && roleIds.length > 0) {
      const resources = await this.roleService.findResourcesByRoleIds(roleIds);
      urls = resources.map((i) => i.url);
    }
    this.redis.lpush(redisKey, ...urls);

    return urls;
  }

  async captcha(key: string, ip: string) {
    const ipKey = REDIS_USER_CAPTCHA + ':' + ip;
    const ipValue = await this.redis.get(ipKey);
    const maxIpValue = 20;
    if (ipValue && Number(ipValue) > maxIpValue) {
      throw new ApiException('请求频繁！');
    }

    if (ipValue) {
      const expire = await this.redis.ttl(ipKey);
      this.redis.setex(ipKey, expire, Number(ipValue) + 1);
    } else {
      this.redis.setex(ipKey, 60, 1);
    }

    const data = createMathExpr({ mathMin: 1, mathMax: 99, mathOperator: '+/-', width: 90, height: 35 });
    this.redis.setex(REDIS_USER_CAPTCHA + ':' + key, 60, data.text);
    return data.data;
  }

  async logout(token: string) {
    if (!token) return;
    try {
      const payload = this.jwtService.verify(token, {
        secret: process.env.SECRET,
      });

      const time = payload.exp - Math.floor(Date.now() / 1000);
      await this.redis.setex(REDIS_USER_LOGOUT_TOKEN + ':' + token, time, '');
    } catch (error) {
      throw new UnauthorizedException(ResultMessage.UNAUTHORIZED);
    }
  }

  updateProfile(id: number, updateProfileDto: UpdateProfileDto) {
    return this.userService.update(id, updateProfileDto);
  }

  updateProfilePassword(username: string, updatePassword: UpdatePassword) {
    return this.userService.changePassword(username, updatePassword);
  }
}
