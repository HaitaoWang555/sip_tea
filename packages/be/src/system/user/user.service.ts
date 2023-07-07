import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SearchUserDto } from './dto/search-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, Equal, In, FindOptionsWhere } from 'typeorm';
import { User } from './entities/user.entity';
import { PageInfo } from '@/common/api/common-page';
import { Position } from '../position/type';
import { Department } from '../department/type';
import { Role } from '../role/type';
import { encrypt } from '@/utils/crypto';
import { ApiException } from '@/common/api/error';
import { InjectRedis } from '@/redis/redis.decorators';
import { Redis } from 'ioredis';
import { REDIS_USER_RESOURCE } from '@/utils/consts';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRedis()
    private readonly redis: Redis,
  ) {}

  async query(searchUserDto: SearchUserDto) {
    const where: FindOptionsWhere<User> | FindOptionsWhere<User>[] = {};
    if (searchUserDto.positionIds) {
      where.positions = {
        id: In(searchUserDto.positionIds),
      };
    }
    if (searchUserDto.departmentIds) {
      where.departments = {
        id: In(searchUserDto.departmentIds),
      };
    }
    if (searchUserDto.roleIds) {
      where.roles = {
        id: In(searchUserDto.roleIds),
      };
    }

    const data = await this.userRepository.findAndCount({
      where: {
        username: searchUserDto.username && Like('%' + searchUserDto.username + '%'),
        email: searchUserDto.email && Like('%' + searchUserDto.email + '%'),
        nickName: searchUserDto.nickName && Like('%' + searchUserDto.nickName + '%'),
        status: searchUserDto.status && Equal(searchUserDto.status),
        ...where,
      },
      skip: searchUserDto.pageNum - 1,
      take: searchUserDto.pageSize,
      relations: { positions: true, departments: true, roles: true },
    });

    return new PageInfo(searchUserDto.pageNum, searchUserDto.pageSize, data[1], data[0]);
  }

  async create(createUserDto: CreateUserDto) {
    const user = createUserDto as User;
    this.changeUser(user);
    await this.verifyUsername(user.username);

    user.password = encrypt(user.password);
    return this.userRepository.save(user);
  }

  findAll() {
    return this.userRepository.find();
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: { positions: true, departments: true, roles: true },
    });
    user.positionIds = user.positions.map((i) => i.id);
    user.departmentIds = user.departments.map((i) => i.id);
    user.roleIds = user.roles.map((i) => i.id);
    return user;
  }

  async findOneByUsername(username: string) {
    return this.userRepository.findOne({
      where: { username },
      relations: { positions: true, departments: true, roles: true },
      select: ['email', 'id', 'password', 'username', 'status', 'positions', 'departments', 'roles'],
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    Object.assign(user, updateUserDto);
    this.changeUser(user);
    if (user.roleIds && user.roleIds.length > 0) {
      this.delRedisCache(id);
    }
    return this.userRepository.save(user);
  }

  remove(id: number) {
    this.delRedisCache(id);
    return this.userRepository.delete(id);
  }

  private changeUser(user: User) {
    if (user.positionIds && user.positionIds.length > 0) {
      user.positions = user.positionIds.map((i) => {
        return {
          id: i,
        } as Position;
      });
    }
    if (user.departmentIds && user.departmentIds.length > 0) {
      user.departments = user.departmentIds.map((i) => {
        return {
          id: i,
        } as Department;
      });
    }
    if (user.roleIds && user.roleIds.length > 0) {
      user.roles = user.roleIds.map((i) => {
        return {
          id: i,
        } as Role;
      });
    }
  }

  async verifyUsername(username: string) {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .select(['user.id'])
      .where('user.username = :username', { username })
      .getMany();
    if (user && user.length > 0) {
      throw new ApiException('用户名重复！');
    }
  }

  private delRedisCache(id: number) {
    const redisKey = REDIS_USER_RESOURCE + ':' + id;
    this.redis.del(redisKey);
  }
}
