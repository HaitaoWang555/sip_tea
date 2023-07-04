import { IntersectionType, PartialType, PickType } from '@nestjs/swagger';
import { User } from '../entities/user.entity';
import { PageParams } from '@/common/api/common-page';

export class SearchUserDtoWithNotPage extends PartialType(
  PickType(User, ['username', 'email', 'nickName', 'status', 'positionIds', 'departmentIds', 'roleIds']),
) {}

export class SearchUserDto extends IntersectionType(PageParams, SearchUserDtoWithNotPage) {}
