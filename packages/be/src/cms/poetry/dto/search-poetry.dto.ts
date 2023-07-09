import { IntersectionType, PartialType, PickType } from '@nestjs/swagger';
import { Poetry } from '../entities/poetry.entity';
import { PageParams } from '@/common/api/common-page';

export class SearchPoetryDtoWithNotPage extends PartialType(
  PickType(Poetry, ['title', 'dynasty', 'author', 'content']),
) {}

export class SearchPoetryDto extends IntersectionType(PageParams, SearchPoetryDtoWithNotPage) {}
