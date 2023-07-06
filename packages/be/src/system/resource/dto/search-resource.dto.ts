import { IntersectionType, PartialType, PickType } from '@nestjs/swagger';
import { Resource } from '../entities/resource.entity';
import { PageParams } from '@/common/api/common-page';

export class SearchResourceDtoWithNotPage extends PartialType(PickType(Resource, ['title', 'url'])) {}

export class SearchResourceDto extends IntersectionType(PageParams, SearchResourceDtoWithNotPage) {}
