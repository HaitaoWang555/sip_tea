import { PickType } from '@nestjs/swagger';
import { User } from '../entities/user.entity';

export class CreateUserDto extends PickType(User, [
  'username',
  'password',
  'email',
  'nickName',
  'status',
  'positionIds',
  'departmentIds',
  'roleIds',
  'loginTime',
  'icon',
]) {}
