import { IntersectionType, PartialType, PickType } from '@nestjs/swagger';
import { GenTable } from '../entities/gen_table.entity';
import { PageParams } from '@/common/api/common-page';

export class SearchGenTableDtoWithNotPage extends PartialType(PickType(GenTable, ['tableName', 'tableComment'])) {}

export class SearchGenTableDto extends IntersectionType(PageParams, SearchGenTableDtoWithNotPage) {}
