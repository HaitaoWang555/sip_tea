import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { SearchMenuDto, SearchMenuDtoWithNotPage } from './dto/search-menu.dto';
import { ApiPaginatedResponse } from '@/utils/swagger';
import { Menu } from './entities/menu.entity';
import { IsNotObjectEmpty } from '@/common/pipes/is-not-object-empty';
import { arrayToTree } from '@/utils/tree';
import { TreeMenu } from './dto/tree-menu';

@ApiTags('menu')
@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  /**
   * 分页查询
   */
  @Get('/query')
  @ApiPaginatedResponse(Menu)
  query(@Query() searchMenuDto: SearchMenuDto) {
    return this.menuService.query(searchMenuDto);
  }

  /**
   * 创建菜单
   */
  @Post()
  create(@Body() createMenuDto: CreateMenuDto) {
    return this.menuService.create(createMenuDto);
  }

  /**
   * 获取所有菜单
   */
  @Get()
  findAll() {
    return this.menuService.findAll();
  }

  /**
   * 获取菜单树形结构数据
   */
  @Get('/tree')
  @ApiOkResponse({ type: TreeMenu })
  async tree(@Query() searchMenuDto: SearchMenuDtoWithNotPage) {
    const arr = await this.menuService.tree(searchMenuDto);
    return arrayToTree<Menu>(arr);
  }

  /**
   * 通过ID获取菜单
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.menuService.findOne(+id);
  }

  /**
   * 更新菜单
   */
  @Patch(':id')
  update(@Param('id') id: string, @Body(new IsNotObjectEmpty()) updateMenuDto: UpdateMenuDto) {
    return this.menuService.update(+id, updateMenuDto);
  }

  /**
   * 删除菜单
   */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.menuService.remove(+id);
  }
}
