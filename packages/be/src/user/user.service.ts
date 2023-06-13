import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SearchUserDto } from './dto/search-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Equal, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { PageInfo } from '@/common/api/common-page';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async query(searchUserDto: SearchUserDto) {
    const data = await this.usersRepository.findAndCount({
      where: {
        email: searchUserDto.email && Like('%' + searchUserDto.email + '%'),
        name: searchUserDto.name && Like('%' + searchUserDto.name + '%'),
        status: searchUserDto.status && Equal(searchUserDto.status),
      },
      skip: searchUserDto.pageNum - 1,
      take: searchUserDto.pageSize,
    });

    return new PageInfo(searchUserDto.pageNum, searchUserDto.pageSize, data[1], data[0]);
  }

  create(createUserDto: CreateUserDto) {
    return this.usersRepository.save(createUserDto);
  }

  findAll() {
    return this.usersRepository.find();
  }

  findOne(id: number) {
    return this.usersRepository.findOneBy({ id });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.usersRepository.update({ id }, updateUserDto);
  }

  remove(id: number) {
    return this.usersRepository.delete(id);
  }
}
