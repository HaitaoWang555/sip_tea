import { Injectable } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { SearchMenuDto, SearchMenuDtoWithNotPage } from './dto/search-menu.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, Equal } from 'typeorm';
import { Menu } from './entities/menu.entity';
import { PageInfo } from '@/common/api/common-page';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu)
    private menuRepository: Repository<Menu>,
  ) {}

  async query(searchMenuDto: SearchMenuDto) {
    const data = await this.menuRepository.findAndCount({
      where: {
        title: searchMenuDto.title && Like('%' + searchMenuDto.title + '%'),
        code: searchMenuDto.code && Equal(searchMenuDto.code),
        url: searchMenuDto.url && Like('%' + searchMenuDto.url + '%'),
      },
      skip: searchMenuDto.pageNum - 1,
      take: searchMenuDto.pageSize,
    });

    return new PageInfo(searchMenuDto.pageNum, searchMenuDto.pageSize, data[1], data[0]);
  }

  create(createMenuDto: CreateMenuDto) {
    return this.menuRepository.save(createMenuDto);
  }

  findAll() {
    return this.menuRepository.find();
  }

  tree(searchMenuDto: SearchMenuDtoWithNotPage) {
    return this.menuRepository.find({
      where: {
        title: searchMenuDto.title && Like('%' + searchMenuDto.title + '%'),
        code: searchMenuDto.code && Equal(searchMenuDto.code),
        url: searchMenuDto.url && Like('%' + searchMenuDto.url + '%'),
      },
    });
  }

  findOne(id: number) {
    return this.menuRepository.findOneBy({ id });
  }

  update(id: number, updateMenuDto: UpdateMenuDto) {
    return this.menuRepository.update({ id }, updateMenuDto);
  }

  remove(id: number) {
    return this.menuRepository.delete(id);
  }
}
