import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { SearchRoleDto } from './dto/search-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, Equal } from 'typeorm';
import { Role } from './entities/role.entity';
import { PageInfo } from '@/common/api/common-page';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  async query(searchRoleDto: SearchRoleDto) {
    const data = await this.roleRepository.findAndCount({
      where: {
        title: searchRoleDto.title && Like('%' + searchRoleDto.title + '%'),
        code: searchRoleDto.code && Like('%' + searchRoleDto.code + '%'),
        status: searchRoleDto.status && Equal(searchRoleDto.status),
      },
      skip: searchRoleDto.pageNum - 1,
      take: searchRoleDto.pageSize,
    });

    return new PageInfo(searchRoleDto.pageNum, searchRoleDto.pageSize, data[1], data[0]);
  }

  create(createRoleDto: CreateRoleDto) {
    return this.roleRepository.save(createRoleDto);
  }

  findAll() {
    return this.roleRepository.find();
  }

  findOne(id: number) {
    return this.roleRepository.findOneBy({ id });
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return this.roleRepository.update({ id }, updateRoleDto);
  }

  remove(id: number) {
    return this.roleRepository.delete(id);
  }
}
