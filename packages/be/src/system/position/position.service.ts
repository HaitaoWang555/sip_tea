import { Injectable } from '@nestjs/common';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';
import { SearchPositionDto } from './dto/search-position.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, Equal } from 'typeorm';
import { Position } from './entities/position.entity';
import { PageInfo } from '@/common/api/common-page';

@Injectable()
export class PositionService {
  constructor(
    @InjectRepository(Position)
    private positionRepository: Repository<Position>,
  ) {}

  async query(searchPositionDto: SearchPositionDto) {
    const data = await this.positionRepository.findAndCount({
      where: {
        title: searchPositionDto.title && Like('%' + searchPositionDto.title + '%'),
        code: searchPositionDto.code && Like('%' + searchPositionDto.code + '%'),
        postRank: searchPositionDto.postRank && Equal(searchPositionDto.postRank),
        status: searchPositionDto.status && Equal(searchPositionDto.status),
      },
      skip: searchPositionDto.pageNum - 1,
      take: searchPositionDto.pageSize,
    });

    return new PageInfo(searchPositionDto.pageNum, searchPositionDto.pageSize, data[1], data[0]);
  }

  create(createPositionDto: CreatePositionDto) {
    return this.positionRepository.save(createPositionDto);
  }

  findAll() {
    return this.positionRepository.find();
  }

  findOne(id: number) {
    return this.positionRepository.findOneBy({ id });
  }

  update(id: number, updatePositionDto: UpdatePositionDto) {
    return this.positionRepository.update({ id }, updatePositionDto);
  }

  remove(id: number) {
    return this.positionRepository.delete(id);
  }
}
