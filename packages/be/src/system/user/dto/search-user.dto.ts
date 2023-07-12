import { IntersectionType, PartialType, PickType } from '@nestjs/swagger';
import { User } from '../entities/user.entity';
import { PageParams } from '@/common/api/common-page';
import { Allow } from 'class-validator';

export class SearchUserDtoWithNotPage extends PartialType(
  PickType(User, ['username', 'nickName', 'status', 'positionIds', 'departmentIds', 'roleIds']),
) {
  /**
   * 邮箱
   */
  @Allow()
  email?: string;
}

export class SearchUserDto extends IntersectionType(PageParams, SearchUserDtoWithNotPage) {}
