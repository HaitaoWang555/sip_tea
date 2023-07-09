import { Controller, Get, Delete, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CacheService } from './cache.service';

@ApiTags('cache')
@Controller('cache')
export class CacheController {
  constructor(private readonly cacheService: CacheService) {}

  /**
   * 获取Redis信息
   */
  @Get('info')
  getInfo() {
    return this.cacheService.getInfo();
  }

  /**
   * 获取所有缓存Key的固定前缀
   */
  @Get()
  findAllPrefixKeys() {
    return this.cacheService.getPrefixKeys();
  }

  /**
   * 获取以此前缀开头的Key
   */
  @Get(':prefix')
  findAllGroupKeys(@Param('prefix') prefix: string) {
    return this.cacheService.getGroupKeys(prefix);
  }

  /**
   * 通过完整的Key获取值
   */
  @Get(':key/:type')
  getValue(@Param('key') key: string, @Param('type') type: string) {
    return this.cacheService.getValue(key, type);
  }

  /**
   * 删除缓存组
   */
  @Delete('/group/:prefix')
  removeGroup(@Param('prefix') prefix: string) {
    return this.cacheService.removeGroup(prefix);
  }

  /**
   * 删除具体单个Key
   */
  @Delete('/single/:key')
  removeSingle(@Param('key') key: string) {
    return this.cacheService.removeSingle(key);
  }

  /**
   * 删除所有缓存
   */
  @Delete('/all')
  removeAll() {
    return this.cacheService.removeAll();
  }
}
