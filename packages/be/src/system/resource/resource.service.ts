import { Injectable } from '@nestjs/common';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';
import { SearchResourceDto } from './dto/search-resource.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Resource } from './entities/resource.entity';
import { PageInfo } from '@/common/api/common-page';
import { InjectRedis } from '@/redis/redis.decorators';
import { Redis } from 'ioredis';
import { RoleService } from '../role/role.service';

@Injectable()
export class ResourceService {
  constructor(
    @InjectRepository(Resource)
    private resourceRepository: Repository<Resource>,
    @InjectRedis()
    private readonly redis: Redis,
    private roleService: RoleService,
  ) {}

  async query(searchResourceDto: SearchResourceDto) {
    const data = await this.resourceRepository.findAndCount({
      where: {
        title: searchResourceDto.title && Like('%' + searchResourceDto.title + '%'),
        url: searchResourceDto.url && Like('%' + searchResourceDto.url + '%'),
      },
      skip: (searchResourceDto.pageNum - 1) * searchResourceDto.pageSize,
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
    this.delRedisCache(id);
    return this.resourceRepository.update({ id }, updateResourceDto);
  }

  remove(ids: number[]) {
    ids.forEach((i) => this.delRedisCache(i));
    return this.resourceRepository.delete(ids);
  }

  private async effectRoles(id: number) {
    const resource = await this.resourceRepository.findOne({
      where: { id },
      relations: { roles: true },
    });
    return resource.roles;
  }

  async delRedisCache(id: number) {
    const roles = await this.effectRoles(id);
    roles.forEach((i) => {
      this.roleService.delRedisCache(i.id);
    });
  }
}
