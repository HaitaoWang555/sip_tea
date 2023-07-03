import { IntersectionType, PartialType, PickType } from '@nestjs/swagger';
import { Department } from '../entities/department.entity';
import { PageParams } from '@/common/api/common-page';

export class SearchDepartmentDtoWithNotPage extends PartialType(PickType(Department, ['title', 'status', 'code'])) {}

export class SearchDepartmentDto extends IntersectionType(PageParams, SearchDepartmentDtoWithNotPage) {}
