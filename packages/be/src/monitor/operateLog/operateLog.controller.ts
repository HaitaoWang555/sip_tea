import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OperatelogService } from './operateLog.service';
import { CreateOperatelogDto } from './dto/create-operateLog.dto';
import { UpdateOperatelogDto } from './dto/update-operateLog.dto';
import { SearchOperatelogDto } from './dto/search-operateLog.dto';
import { ApiPaginatedResponse } from '@/utils/swagger';
import { Operatelog } from './entities/operateLog.entity';
import { IsNotObjectEmpty } from '@/common/pipes/is-not-object-empty';

@ApiTags('operateLog')
@Controller('operateLog')
export class OperatelogController {
  constructor(private readonly operateLogService: OperatelogService) {}

  /**
   * 分页查询
   */
  @Get('/query')
  @ApiPaginatedResponse(Operatelog)
  query(@Query() searchOperatelogDto: SearchOperatelogDto) {
    return this.operateLogService.query(searchOperatelogDto);
  }

  /**
   * 创建操作日志
   */
  @Post()
  create(@Body() createOperatelogDto: CreateOperatelogDto) {
    return this.operateLogService.create(createOperatelogDto);
  }

  /**
   * 获取所有操作日志
   */
  @Get()
  findAll() {
    return this.operateLogService.findAll();
  }

  /**
   * 通过ID获取操作日志
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.operateLogService.findOne(+id);
  }

  /**
   * 更新操作日志
   */
  @Patch(':id')
  update(@Param('id') id: string, @Body(new IsNotObjectEmpty()) updateOperatelogDto: UpdateOperatelogDto) {
    return this.operateLogService.update(+id, updateOperatelogDto);
  }

  /**
   * 删除操作日志
   */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.operateLogService.remove(id.split(',').map((i) => Number(i)));
  }
}
