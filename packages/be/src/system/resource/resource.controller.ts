import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ResourceService } from './resource.service';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';
import { SearchResourceDto } from './dto/search-resource.dto';
import { ApiPaginatedResponse } from '@/utils/swagger';
import { Resource } from './entities/resource.entity';
import { IsNotObjectEmpty } from '@/common/pipes/is-not-object-empty';

@ApiTags('resource')
@Controller('resource')
export class ResourceController {
  constructor(private readonly resourceService: ResourceService) {}

  /**
   * 分页查询
   */
  @Get('/query')
  @ApiPaginatedResponse(Resource)
  query(@Query() searchResourceDto: SearchResourceDto) {
    return this.resourceService.query(searchResourceDto);
  }

  /**
   * 创建资源
   */
  @Post()
  create(@Body() createResourceDto: CreateResourceDto) {
    return this.resourceService.create(createResourceDto);
  }

  /**
   * 获取所有资源
   */
  @Get()
  findAll() {
    return this.resourceService.findAll();
  }

  /**
   * 通过ID获取资源
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.resourceService.findOne(+id);
  }

  /**
   * 更新资源
   */
  @Patch(':id')
  update(@Param('id') id: string, @Body(new IsNotObjectEmpty()) updateResourceDto: UpdateResourceDto) {
    return this.resourceService.update(+id, updateResourceDto);
  }

  /**
   * 删除资源
   */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.resourceService.remove(id.split(',').map((i) => Number(i)));
  }
}
