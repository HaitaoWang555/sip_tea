import { IntersectionType, PartialType, PickType } from '@nestjs/swagger';
import { Menu } from '../entities/menu.entity';
import { PageParams } from '@/common/api/common-page';

export class SearchMenuDtoWithNotPage extends PartialType(PickType(Menu, ['title', 'code', 'url'])) {}

export class SearchMenuDto extends IntersectionType(PageParams, SearchMenuDtoWithNotPage) {}
