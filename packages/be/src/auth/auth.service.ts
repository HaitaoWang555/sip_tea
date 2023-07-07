import { ApiException } from '@/common/api/error';
import { ResultCode, ResultMessage } from '@/common/api/result-enum';
import { UserService } from '@/system/user/user.service';
import { encrypt } from '@/utils/crypto';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignInResultDto } from './dto/sign-in-result.dto';
import { ProfileDto } from './dto/profile.dto';
import { RoleService } from '@/system/role/role.service';
import { InjectRedis } from '@/redis/redis.decorators';
import { Redis } from 'ioredis';
import { REDIS_USER_RESOURCE } from '@/utils/consts';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private roleService: RoleService,
    @InjectRedis() private readonly redis: Redis,
  ) {}

  async signIn(username: string, pass: string): Promise<SignInResultDto> {
    const user = await this.userService.findOneByUsername(username);
    if (!user || user.password !== encrypt(pass)) {
      throw new ApiException(ResultMessage.LOGIN_FAILED, ResultCode.LOGIN_FAILED);
    }
    const payload = { username: user.username, sub: user.id };
    return {
      token: await this.jwtService.signAsync(payload),
    };
  }

  async profile(id: number) {
    const user = await this.userService.findOne(id);
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
}
