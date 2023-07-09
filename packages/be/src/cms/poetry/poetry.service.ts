import { Injectable } from '@nestjs/common';
import { CreatePoetryDto } from './dto/create-poetry.dto';
import { UpdatePoetryDto } from './dto/update-poetry.dto';
import { SearchPoetryDto, SearchPoetryDtoWithNotPage } from './dto/search-poetry.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, Equal } from 'typeorm';
import { Poetry } from './entities/poetry.entity';
import { PageInfo } from '@/common/api/common-page';

@Injectable()
export class PoetryService {
  constructor(
    @InjectRepository(Poetry)
    private poetryRepository: Repository<Poetry>,
  ) {}

  async query(searchPoetryDto: SearchPoetryDto) {
    const data = await this.poetryRepository.find({
      where: {
        title: searchPoetryDto.title && Like('%' + searchPoetryDto.title + '%'),
        dynasty: searchPoetryDto.dynasty && Equal(searchPoetryDto.dynasty),
        author: searchPoetryDto.author && Equal(searchPoetryDto.author),
        content: searchPoetryDto.content && Like('%' + searchPoetryDto.content + '%'),
      },
      skip: (searchPoetryDto.pageNum - 1) * searchPoetryDto.pageSize,
      take: searchPoetryDto.pageSize,
    });

    return new PageInfo(searchPoetryDto.pageNum, searchPoetryDto.pageSize, 0, data);
  }

  count(searchPoetryDto: SearchPoetryDtoWithNotPage) {
    return this.poetryRepository.count({
      where: {
        title: searchPoetryDto.title && Like('%' + searchPoetryDto.title + '%'),
        dynasty: searchPoetryDto.dynasty && Equal(searchPoetryDto.dynasty),
        author: searchPoetryDto.author && Equal(searchPoetryDto.author),
        content: searchPoetryDto.content && Like('%' + searchPoetryDto.content + '%'),
      },
    });
  }

  create(createPoetryDto: CreatePoetryDto) {
    return this.poetryRepository.save(createPoetryDto);
  }

  findOne(id: number) {
    return this.poetryRepository.findOneBy({ id });
  }

  update(id: number, updatePoetryDto: UpdatePoetryDto) {
    return this.poetryRepository.update({ id }, updatePoetryDto);
  }

  remove(ids: number[]) {
    return this.poetryRepository.delete(ids);
  }
}
