import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PositionService } from './position.service';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';
import { SearchPositionDto } from './dto/search-position.dto';
import { ApiPaginatedResponse } from '@/utils/swagger';
import { Position } from './entities/position.entity';
import { IsNotObjectEmpty } from '@/common/pipes/is-not-object-empty';

@ApiTags('position')
@Controller('position')
export class PositionController {
  constructor(private readonly positionService: PositionService) {}

  /**
   * 分页查询
   */
  @Get('/query')
  @ApiPaginatedResponse(Position)
  query(@Query() searchPositionDto: SearchPositionDto) {
    return this.positionService.query(searchPositionDto);
  }

  /**
   * 创建职位
   */
  @Post()
  create(@Body() createPositionDto: CreatePositionDto) {
    return this.positionService.create(createPositionDto);
  }

  /**
   * 获取所有职位
   */
  @Get()
  findAll() {
    return this.positionService.findAll();
  }

  /**
   * 通过ID获取职位
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.positionService.findOne(+id);
  }

  /**
   * 更新职位
   */
  @Patch(':id')
  update(@Param('id') id: string, @Body(new IsNotObjectEmpty()) updatePositionDto: UpdatePositionDto) {
    return this.positionService.update(+id, updatePositionDto);
  }

  /**
   * 删除职位
   */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.positionService.remove(+id);
  }
}
