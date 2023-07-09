import { Injectable } from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { SearchDepartmentDto, SearchDepartmentDtoWithNotPage } from './dto/search-department.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, Equal } from 'typeorm';
import { Department } from './entities/department.entity';
import { PageInfo } from '@/common/api/common-page';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(Department)
    private departmentRepository: Repository<Department>,
  ) {}

  async query(searchDepartmentDto: SearchDepartmentDto) {
    const data = await this.departmentRepository.findAndCount({
      where: {
        title: searchDepartmentDto.title && Like('%' + searchDepartmentDto.title + '%'),
        status: searchDepartmentDto.status && Equal(searchDepartmentDto.status),
        code: searchDepartmentDto.code && Like('%' + searchDepartmentDto.code + '%'),
      },
      skip: (searchDepartmentDto.pageNum - 1) * searchDepartmentDto.pageSize,
      take: searchDepartmentDto.pageSize,
    });

    return new PageInfo(searchDepartmentDto.pageNum, searchDepartmentDto.pageSize, data[1], data[0]);
  }

  create(createDepartmentDto: CreateDepartmentDto) {
    return this.departmentRepository.save(createDepartmentDto);
  }

  findAll() {
    return this.departmentRepository.find();
  }

  tree(searchDepartmentDto: SearchDepartmentDtoWithNotPage) {
    return this.departmentRepository.find({
      where: {
        title: searchDepartmentDto.title && Like('%' + searchDepartmentDto.title + '%'),
        status: searchDepartmentDto.status && Equal(searchDepartmentDto.status),
        code: searchDepartmentDto.code && Like('%' + searchDepartmentDto.code + '%'),
      },
    });
  }

  findOne(id: number) {
    return this.departmentRepository.findOneBy({ id });
  }

  update(id: number, updateDepartmentDto: UpdateDepartmentDto) {
    return this.departmentRepository.update({ id }, updateDepartmentDto);
  }

  remove(ids: number[]) {
    return this.departmentRepository.delete(ids);
  }
}
