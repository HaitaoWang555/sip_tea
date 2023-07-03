import { IntersectionType, PartialType, PickType } from '@nestjs/swagger';
import { Position } from '../entities/position.entity';
import { PageParams } from '@/common/api/common-page';

export class SearchPositionDtoWithNotPage extends PartialType(
  PickType(Position, ['title', 'code', 'postRank', 'status']),
) {}

export class SearchPositionDto extends IntersectionType(PageParams, SearchPositionDtoWithNotPage) {}
