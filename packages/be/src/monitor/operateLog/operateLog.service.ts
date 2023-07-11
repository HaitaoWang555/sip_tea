import { Injectable } from '@nestjs/common';
import { CreateOperatelogDto } from './dto/create-operateLog.dto';
import { UpdateOperatelogDto } from './dto/update-operateLog.dto';
import { SearchOperatelogDto } from './dto/search-operateLog.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, Equal } from 'typeorm';
import { Operatelog } from './entities/operateLog.entity';
import { PageInfo } from '@/common/api/common-page';

@Injectable()
export class OperatelogService {
  constructor(
    @InjectRepository(Operatelog)
    private operateLogRepository: Repository<Operatelog>,
  ) {}

  async query(searchOperatelogDto: SearchOperatelogDto) {
    const data = await this.operateLogRepository.findAndCount({
      where: {
        path: searchOperatelogDto.path && Like('%' + searchOperatelogDto.path + '%'),
        method: searchOperatelogDto.method && Equal(searchOperatelogDto.method),
        ip: searchOperatelogDto.ip && Equal(searchOperatelogDto.ip),
        createdBy: searchOperatelogDto.createdBy && Equal(searchOperatelogDto.createdBy),
        status: searchOperatelogDto.status && Equal(searchOperatelogDto.status),
      },
      skip: (searchOperatelogDto.pageNum - 1) * searchOperatelogDto.pageSize,
      take: searchOperatelogDto.pageSize,
      order: { id: 'DESC' },
    });

    return new PageInfo(searchOperatelogDto.pageNum, searchOperatelogDto.pageSize, data[1], data[0]);
  }

  create(createOperatelogDto: CreateOperatelogDto) {
    return this.operateLogRepository.save(createOperatelogDto);
  }

  findAll() {
    return this.operateLogRepository.find();
  }

  findOne(id: number) {
    return this.operateLogRepository.findOne({
      where: { id },
      select: ['id', 'result', 'error'],
    });
  }

  update(id: number, updateOperatelogDto: UpdateOperatelogDto) {
    return this.operateLogRepository.update({ id }, updateOperatelogDto);
  }

  remove(ids: number[]) {
    return this.operateLogRepository.delete(ids);
  }
}
