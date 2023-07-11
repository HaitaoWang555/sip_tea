import { IntersectionType, PartialType, PickType } from '@nestjs/swagger';
import { Operatelog } from '../entities/operateLog.entity';
import { PageParams } from '@/common/api/common-page';

export class SearchOperatelogDtoWithNotPage extends PartialType(
  PickType(Operatelog, ['path', 'method', 'ip', 'createdBy', 'status']),
) {}

export class SearchOperatelogDto extends IntersectionType(PageParams, SearchOperatelogDtoWithNotPage) {}
