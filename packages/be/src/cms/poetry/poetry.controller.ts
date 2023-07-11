import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PoetryService } from './poetry.service';
import { CreatePoetryDto } from './dto/create-poetry.dto';
import { UpdatePoetryDto } from './dto/update-poetry.dto';
import { SearchPoetryDto, SearchPoetryDtoWithNotPage } from './dto/search-poetry.dto';
import { ApiPaginatedResponse } from '@/utils/swagger';
import { Poetry } from './entities/poetry.entity';
import { IsNotObjectEmpty } from '@/common/pipes/is-not-object-empty';
import { Log } from '@/common/decorators/log.decorator';
import { OperateLog } from '@/common/enum/operate-log';

@Log()
@ApiTags('poetry')
@Controller('poetry')
export class PoetryController {
  constructor(private readonly poetryService: PoetryService) {}

  /**
   * 分页查询
   */
  @Log(OperateLog.NORESULT)
  @Get('/query')
  @ApiPaginatedResponse(Poetry)
  query(@Query() searchPoetryDto: SearchPoetryDto) {
    return this.poetryService.query(searchPoetryDto);
  }

  /**
   * 查询总条数
   */
  @Get('/count')
  count(@Query() searchPoetryDto: SearchPoetryDtoWithNotPage) {
    return this.poetryService.count(searchPoetryDto);
  }

  /**
   * 创建诗词
   */
  @Post()
  create(@Body() createPoetryDto: CreatePoetryDto) {
    return this.poetryService.create(createPoetryDto);
  }

  /**
   * 通过ID获取诗词
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.poetryService.findOne(+id);
  }

  /**
   * 更新诗词
   */
  @Patch(':id')
  update(@Param('id') id: string, @Body(new IsNotObjectEmpty()) updatePoetryDto: UpdatePoetryDto) {
    return this.poetryService.update(+id, updatePoetryDto);
  }

  /**
   * 删除诗词
   */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.poetryService.remove(id.split(',').map((i) => Number(i)));
  }
}
