import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { SearchRoleDto } from './dto/search-role.dto';
import { ApiPaginatedResponse } from '@/utils/swagger';
import { Role } from './entities/role.entity';
import { IsNotObjectEmpty } from '@/common/pipes/is-not-object-empty';

@ApiTags('role')
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  /**
   * 分页查询
   */
  @Get('/query')
  @ApiPaginatedResponse(Role)
  query(@Query() searchRoleDto: SearchRoleDto) {
    return this.roleService.query(searchRoleDto);
  }

  /**
   * 创建角色
   */
  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  /**
   * 获取所有角色
   */
  @Get()
  findAll() {
    return this.roleService.findAll();
  }

  /**
   * 通过ID获取角色
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roleService.findOne(+id);
  }

  /**
   * 更新角色
   */
  @Patch(':id')
  update(@Param('id') id: string, @Body(new IsNotObjectEmpty()) updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(+id, updateRoleDto);
  }

  /**
   * 删除角色
   */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roleService.remove(+id);
  }
}
