import { InjectRedis } from '@/redis/redis.decorators';
import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';
import { parse } from 'redis-info';
import { REDIS_USER_RESOURCE, REDIS_USER_CAPTCHA, REDIS_USER_LOGOUT_TOKEN } from '@/utils/consts';
import { ApiException } from '@/common/api/error';

@Injectable()
export class CacheService {
  constructor(
    @InjectRedis()
    private readonly redis: Redis,
  ) {}

  async getInfo() {
    const info = await this.redis.info();
    return parse(info);
  }

  async getPrefixKeys() {
    return [
      {
        label: '用户资源缓存',
        value: REDIS_USER_RESOURCE,
        type: 'list',
      },
      {
        label: '用户验证码',
        value: REDIS_USER_CAPTCHA,
        type: 'string',
      },
      {
        label: '用户退出Token',
        value: REDIS_USER_LOGOUT_TOKEN,
        type: 'string',
      },
    ];
  }

  getGroupKeys(key: string) {
    return this.redis.keys(key + '*');
  }

  async getValue(key: string, type: string) {
    const hasKey = (await this.redis.exists(key)) === 1;
    if (!hasKey) throw new ApiException('此Key不存在！');
    switch (type) {
      case 'list':
        return this.redis.lrange(key, 0, -1);
      case 'string':
        return this.redis.get(key);
      case 'hash':
        return this.redis.hgetall(key);
      case 'set':
        return this.redis.smembers(key);
      case 'zset':
        return this.redis.zrange(key, 0, -1);
      default:
        return this.redis.get(key);
    }
  }

  removeGroup(key: string) {
    return this.redis.del(key + '*');
  }

  removeSingle(key: string) {
    return this.redis.del(key);
  }

  removeAll() {
    return this.redis.del('*');
  }
}
