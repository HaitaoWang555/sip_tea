import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { SearchRoleDto } from './dto/search-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, Equal, In } from 'typeorm';
import { Role } from './entities/role.entity';
import { PageInfo } from '@/common/api/common-page';
import { Menu } from '../menu/type';
import { Resource } from '../resource/type';
import { REDIS_USER_RESOURCE } from '@/utils/consts';
import { InjectRedis } from '@/redis/redis.decorators';
import { Redis } from 'ioredis';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    @InjectRedis()
    private readonly redis: Redis,
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
    const role = createRoleDto as Role;
    this.changeRole(role);
    return this.roleRepository.save(role);
  }

  findAll() {
    return this.roleRepository.find();
  }

  async findOne(id: number) {
    const role = await this.roleRepository.findOne({
      where: { id },
      relations: { menus: true, resources: true },
    });
    role.menuIds = role.menus.map((i) => i.id);
    role.resourceIds = role.resources.map((i) => i.id);
    return role;
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const role = await this.findOne(id);
    Object.assign(role, updateRoleDto);
    this.changeRole(role);
    if (role.resourceIds && role.resourceIds.length > 0) {
      this.delRedisCache(id);
    }
    return this.roleRepository.save(role);
  }

  remove(id: number) {
    this.delRedisCache(id);
    return this.roleRepository.delete(id);
  }

  async findMenusByRoleIds(ids: number[]) {
    const roles = await this.roleRepository.find({
      where: { id: In(ids) },
      relations: { menus: true },
    });
    return roles.map((i) => i.menus).flat();
  }

  async findResourcesByRoleIds(ids: number[]) {
    const resources = await this.roleRepository.find({
      where: { id: In(ids) },
      relations: { resources: true },
    });
    return resources.map((i) => i.resources).flat();
  }

  private changeRole(role: Role) {
    if (role.menuIds && role.menuIds.length > 0) {
      role.menus = role.menuIds.map((i) => {
        return {
          id: i,
        } as Menu;
      });
    }
    if (role.resourceIds && role.resourceIds.length > 0) {
      role.resources = role.resourceIds.map((i) => {
        return {
          id: i,
        } as Resource;
      });
    }
  }

  private async effectUsers(id: number) {
    const role = await this.roleRepository.findOne({
      where: { id },
      relations: { users: true },
    });
    return role.users;
  }

  async delRedisCache(id: number) {
    const users = await this.effectUsers(id);
    users.forEach((i) => {
      const redisKey = REDIS_USER_RESOURCE + ':' + i.id;
      this.redis.del(redisKey);
    });
  }
}
