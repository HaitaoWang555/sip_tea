import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { GenTableService } from './gen_table.service';
import { CreateGenTableDto } from './dto/create-gen_table.dto';
import { UpdateGenTableDto } from './dto/update-gen_table.dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiPaginatedResponse } from '@/utils/swagger';
import { SearchGenTableDto } from './dto/search-gen_table.dto';
import { GenTable } from './entities/gen_table.entity';

@ApiTags('gen-table')
@Controller('gen-table')
export class GenTableController {
  constructor(private readonly genTableService: GenTableService) {}

  /**
   * 分页查询
   */
  @Get('/query')
  @ApiPaginatedResponse(GenTable)
  query(@Query() searchGenTableDto: SearchGenTableDto) {
    return this.genTableService.query(searchGenTableDto);
  }

  /**
   * 创建代码生成表
   */
  @Post()
  create(@Body() createGenTableDto: CreateGenTableDto) {
    return this.genTableService.create(createGenTableDto);
  }

  /**
   * 获取所有代码生成表
   */
  @Get()
  findAll() {
    return this.genTableService.findAll();
  }

  /**
   * 通过ID获取代码生成表
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.genTableService.findOne(+id);
  }

  /**
   * 更新代码生成表
   */
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGenTableDto: UpdateGenTableDto) {
    return this.genTableService.update(+id, updateGenTableDto);
  }

  /**
   * 删除代码生成表
   */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.genTableService.remove(+id);
  }

  /**
   * 生成代码
   */
  @Post('/generate/:id')
  generate(@Param('id') id: string, @Body() templeteFiles?: string[]) {
    return this.genTableService.generate(+id, templeteFiles);
  }
}
