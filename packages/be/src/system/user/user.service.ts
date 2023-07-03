import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SearchUserDto } from './dto/search-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, Equal } from 'typeorm';
import { User } from './entities/user.entity';
import { PageInfo } from '@/common/api/common-page';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async query(searchUserDto: SearchUserDto) {
    const data = await this.userRepository.findAndCount({
      where: {
        username: searchUserDto.username && Like('%' + searchUserDto.username + '%'),
        email: searchUserDto.email && Like('%' + searchUserDto.email + '%'),
        nickName: searchUserDto.nickName && Like('%' + searchUserDto.nickName + '%'),
        status: searchUserDto.status && Equal(searchUserDto.status),
      },
      skip: searchUserDto.pageNum - 1,
      take: searchUserDto.pageSize,
    });

    return new PageInfo(searchUserDto.pageNum, searchUserDto.pageSize, data[1], data[0]);
  }

  create(createUserDto: CreateUserDto) {
    return this.userRepository.save(createUserDto);
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return this.userRepository.findOneBy({ id });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update({ id }, updateUserDto);
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }
}
