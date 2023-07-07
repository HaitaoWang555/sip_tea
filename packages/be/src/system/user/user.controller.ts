import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SearchUserDto } from './dto/search-user.dto';
import { ApiPaginatedResponse } from '@/utils/swagger';
import { User } from './entities/user.entity';
import { IsNotObjectEmpty } from '@/common/pipes/is-not-object-empty';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * 分页查询
   */
  @Get('/query')
  @ApiPaginatedResponse(User)
  query(@Query() searchUserDto: SearchUserDto) {
    return this.userService.query(searchUserDto);
  }

  /**
   * 创建用户
   */
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  /**
   * 获取所有用户
   */
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  /**
   * 通过ID获取用户
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  /**
   * 更新用户
   */
  @Patch(':id')
  update(@Param('id') id: string, @Body(new IsNotObjectEmpty()) updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  /**
   * 删除用户
   */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id.split(',').map((i) => Number(i)));
  }

  /**
   * 验证用户名是否可用
   */
  @Get('/verify/:username')
  verifyUsername(@Param('username') username: string) {
    return this.userService.verifyUsername(username);
  }
}
