import { IntersectionType, PartialType, PickType } from '@nestjs/swagger';
import { Role } from '../entities/role.entity';
import { PageParams } from '@/common/api/common-page';

export class SearchRoleDtoWithNotPage extends PartialType(PickType(Role, ['title', 'code', 'status'])) {}

export class SearchRoleDto extends IntersectionType(PageParams, SearchRoleDtoWithNotPage) {}
