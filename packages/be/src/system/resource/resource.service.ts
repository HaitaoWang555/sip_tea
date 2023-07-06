import { Injectable } from '@nestjs/common';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';
import { SearchResourceDto } from './dto/search-resource.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Resource } from './entities/resource.entity';
import { PageInfo } from '@/common/api/common-page';

@Injectable()
export class ResourceService {
  constructor(
    @InjectRepository(Resource)
    private resourceRepository: Repository<Resource>,
  ) {}

  async query(searchResourceDto: SearchResourceDto) {
    const data = await this.resourceRepository.findAndCount({
      where: {
        title: searchResourceDto.title && Like('%' + searchResourceDto.title + '%'),
        url: searchResourceDto.url && Like('%' + searchResourceDto.url + '%'),
      },
      skip: searchResourceDto.pageNum - 1,
      take: searchResourceDto.pageSize,
    });

    return new PageInfo(searchResourceDto.pageNum, searchResourceDto.pageSize, data[1], data[0]);
  }

  create(createResourceDto: CreateResourceDto) {
    return this.resourceRepository.save(createResourceDto);
  }

  findAll() {
    return this.resourceRepository.find();
  }

  findOne(id: number) {
    return this.resourceRepository.findOneBy({ id });
  }

  update(id: number, updateResourceDto: UpdateResourceDto) {
    return this.resourceRepository.update({ id }, updateResourceDto);
  }

  remove(id: number) {
    return this.resourceRepository.delete(id);
  }
}
