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
import { dirname, resolve } from 'path';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { EOL } from 'os';
import { diffLines } from 'diff';

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
      skip: (searchGenTableDto.pageNum - 1) * searchGenTableDto.pageSize,
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

  async generate(id: number, templeteFiles?: string[]) {
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
    const beTempletePathStr = process.cwd() + '/src/assets/dot/be';
    const feTempletePathStr = process.cwd() + '/src/assets/dot/fe';
    const generateFilePathPackage = data.package ? data.package + '/' + data.tableName : data.tableName;

    const generateBeFilePathPrefix = process.cwd() + '/src/' + generateFilePathPackage;
    const generateFeFilePathPrefix = resolve(process.cwd() + '/../fe') + '/src/pages/' + generateFilePathPackage;
    const fileSuffix = '.dot';

    const beFilesPath = await glob(beTempletePathStr + '/**/*' + fileSuffix);
    const feFilesPath = await glob(feTempletePathStr + '/**/*' + fileSuffix);

    this.writeFileByTemplete(beFilesPath, generateBeFilePathPrefix, beTempletePathStr, fileSuffix, data, templeteFiles);
    this.writeFileByTemplete(feFilesPath, generateFeFilePathPrefix, beTempletePathStr, fileSuffix, data, templeteFiles);

    // 后端入口文件生成
    this.generateBeInletFile(data, generateFilePathPackage);
    // 前端入口文件生成
    this.generateFeInletFile(data);
  }

  private generateBeInletFile(data: GenTable, generateFilePathPackage: string) {
    const modulesFile = readFileSync(process.cwd() + '/src/modules.ts');
    const str = `export { ${camel(data.tableName, true)}Module } from './${generateFilePathPackage}/${
      data.tableName
    }.module';`;
    if (!modulesFile.includes(str)) {
      // 不重复生成
      writeFileSync(process.cwd() + '/src/modules.ts', modulesFile.toString() + str + EOL);
    }
  }

  private generateFeInletFile(data: GenTable) {
    const baseFeRouterPath = resolve(process.cwd() + '/../fe') + '/src/routes/modules';
    if (!data.package) {
      const routerFileTemplete = readFileSync(process.cwd() + '/src/assets/dot/fe/router.dot');

      // 没有 data.package 情况 直接写入
      writeFileSync(baseFeRouterPath + `/${data.tableName}.ts`, getTemplateString(routerFileTemplete.toString(), data));
    } else {
      // 有 data.package 情况
      const routerFileTemplete = readFileSync(process.cwd() + '/src/assets/dot/fe/package-router.dot');
      const routerFilePath = baseFeRouterPath + `/${data.package}.tsx`;
      const isHave = existsSync(routerFilePath);
      if (isHave) {
        // 已有文件
        const routerFile = readFileSync(routerFilePath, 'utf-8');
        const generateStr = getTemplateString(routerFileTemplete.toString(), data);
        const differences = diffLines(routerFile.toString(), generateStr);

        let finalStr = '';
        differences.forEach((element) => {
          if (element.added && element.count === 3) {
            finalStr = finalStr + '    },\n    {\n' + element.value;
          } else {
            finalStr = finalStr + element.value;
          }
        });

        writeFileSync(routerFilePath, finalStr);
      } else {
        // 未生成过文件
        writeFileSync(
          routerFilePath,
          getTemplateString(routerFileTemplete.toString(), Object.assign(data, { packageName: true })),
        );
      }
    }
  }

  private writeFileByTemplete(
    filesPath: string[],
    generateFilePathPrefix: string,
    beTempletePathStr: string,
    fileSuffix: string,
    data: GenTable,
    templeteFiles?: string[],
  ) {
    for (let index = 0; index < filesPath.length; index++) {
      const str = filesPath[index];
      // /entities/{}.entity.dot
      const templeteFileName = str.slice(beTempletePathStr.length);
      if (templeteFiles && templeteFiles.length > 0) {
        if (!templeteFiles.includes(templeteFileName)) {
          // filePath 有值时 只生成 filePath 里的模版
          continue;
        }
      }
      if (str.endsWith('tree-{}.dot') && !data.isTree) {
        // 非树形结构不生成
        continue;
      }
      if (str.endsWith('router.dot')) {
        // router.dot 不生成 单独处理
        continue;
      }
      const file = readFileSync(str);
      const generateFileSuffix = str.includes('list') ? '.tsx' : '.ts';
      let generateFilePath =
        generateFilePathPrefix + templeteFileName.slice(0, -fileSuffix.length) + generateFileSuffix;
      generateFilePath = generateFilePath.replace('{}', data.tableName);
      const dir = dirname(generateFilePath);

      mkdirSync(dir, { recursive: true });

      writeFileSync(generateFilePath, getTemplateString(file.toString(), data));
    }
  }
}
