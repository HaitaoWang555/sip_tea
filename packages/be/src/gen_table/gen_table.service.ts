import { Injectable, Logger } from '@nestjs/common';
import { CreateGenTableDto } from './dto/create-gen_table.dto';
import { UpdateGenTableDto } from './dto/update-gen_table.dto';
import { GenTable } from './entities/gen_table.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { SearchGenTableDto } from './dto/search-gen_table.dto';
import { PageInfo } from '@/common/api/common-page';
import { camel, getTemplateString } from '@/utils/generate';

import { glob } from 'glob';
import { dirname } from 'path';
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { EOL } from 'os';

@Injectable()
export class GenTableService {
  private readonly logger = new Logger(GenTableService.name);

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

  async update(id: number, updateGenTableDto: UpdateGenTableDto) {
    const genTable = await this.findOne(id);
    Object.assign(genTable, updateGenTableDto);
    return this.genTableRepository.save(genTable);
  }

  remove(id: number) {
    return this.genTableRepository.delete(id);
  }

  async generate(id: number) {
    const table = await this.findOne(id);
    if (table.columns.length === 0) {
      throw new Error('请设置列！');
    }
    const data = Object.assign({}, table);
    data.columns.map((i) => {
      for (const key in i) {
        if (key.startsWith('is')) {
          i[key] = Boolean(i[key]);
        }
      }
      return i;
    });
    const templetePathStr = process.cwd() + '/src/assets/dot/be';
    const generateFilePathPackage = data.package || data.tableName;

    const generateFilePathPrefix = process.cwd() + '/src/' + generateFilePathPackage;
    const fileSuffix = '.dot';

    const filesPath = await glob(templetePathStr + '/**/*' + fileSuffix);

    filesPath.forEach((str) => {
      const file = readFileSync(str);
      let generateFilePath =
        generateFilePathPrefix + str.slice(templetePathStr.length).slice(0, -fileSuffix.length) + '.ts';
      generateFilePath = generateFilePath.replace('{}', data.tableName);
      const dir = dirname(generateFilePath);

      mkdirSync(dir, { recursive: true });

      writeFileSync(generateFilePath, getTemplateString(file.toString(), data));
    });
    // 入口文件生成
    const modulesFile = readFileSync(process.cwd() + '/src/modules.ts');
    const str = `export { ${camel(data.tableName, true)}Module } from './${generateFilePathPackage}/${
      data.tableName
    }.module';`;
    if (!modulesFile.includes(str)) {
      writeFileSync(process.cwd() + '/src/modules.ts', modulesFile.toString() + str + EOL);
    }
  }
}
