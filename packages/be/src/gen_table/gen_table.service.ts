import { Injectable } from '@nestjs/common';
import { CreateGenTableDto } from './dto/create-gen_table.dto';
import { UpdateGenTableDto } from './dto/update-gen_table.dto';
import { GenTable } from './entities/gen_table.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { SearchGenTableDto } from './dto/search-gen_table.dto';
import { PageInfo } from '@/common/api/common-page';

@Injectable()
export class GenTableService {
  constructor(
    @InjectRepository(GenTable)
    private genTableRepository: Repository<GenTable>,
  ) {}

  async query(searchGenTableDto: SearchGenTableDto) {
    const data = await this.genTableRepository.findAndCount({
      where: {
        tableName: searchGenTableDto.tableName && Like('%' + searchGenTableDto.tableName + '%'),
        tableComment: searchGenTableDto.tableComment && Like('%' + searchGenTableDto.tableComment + '%'),
      },
      skip: searchGenTableDto.pageNum - 1,
      take: searchGenTableDto.pageSize,
    });

    return new PageInfo(searchGenTableDto.pageNum, searchGenTableDto.pageSize, data[1], data[0]);
  }

  create(createGenTableDto: CreateGenTableDto) {
    return this.genTableRepository.save(createGenTableDto);
  }

  findAll() {
    return this.genTableRepository.find();
  }

  findOne(id: number) {
    return this.genTableRepository.findOne({ where: { id }, relations: { columns: true } });
  }

  update(id: number, updateGenTableDto: UpdateGenTableDto) {
    return this.genTableRepository.update({ id }, updateGenTableDto);
  }

  remove(id: number) {
    return this.genTableRepository.delete(id);
  }
}
