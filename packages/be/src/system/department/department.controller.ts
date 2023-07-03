import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { DepartmentService } from './department.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { SearchDepartmentDto, SearchDepartmentDtoWithNotPage } from './dto/search-department.dto';
import { ApiPaginatedResponse } from '@/utils/swagger';
import { Department } from './entities/department.entity';
import { IsNotObjectEmpty } from '@/common/pipes/is-not-object-empty';
import { arrayToTree } from '@/utils/tree';
import { TreeDepartment } from './dto/tree-department';

@ApiTags('department')
@Controller('department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  /**
   * 分页查询
   */
  @Get('/query')
  @ApiPaginatedResponse(Department)
  query(@Query() searchDepartmentDto: SearchDepartmentDto) {
    return this.departmentService.query(searchDepartmentDto);
  }

  /**
   * 创建部门
   */
  @Post()
  create(@Body() createDepartmentDto: CreateDepartmentDto) {
    return this.departmentService.create(createDepartmentDto);
  }

  /**
   * 获取所有部门
   */
  @Get()
  findAll() {
    return this.departmentService.findAll();
  }

  /**
   * 获取部门树形结构数据
   */
  @Get('/tree')
  @ApiOkResponse({ type: TreeDepartment })
  async tree(@Query() searchDepartmentDto: SearchDepartmentDtoWithNotPage) {
    const arr = await this.departmentService.tree(searchDepartmentDto);
    return arrayToTree<Department>(arr);
  }

  /**
   * 通过ID获取部门
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.departmentService.findOne(+id);
  }

  /**
   * 更新部门
   */
  @Patch(':id')
  update(@Param('id') id: string, @Body(new IsNotObjectEmpty()) updateDepartmentDto: UpdateDepartmentDto) {
    return this.departmentService.update(+id, updateDepartmentDto);
  }

  /**
   * 删除部门
   */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.departmentService.remove(+id);
  }
}
