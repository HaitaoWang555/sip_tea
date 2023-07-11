import { User } from '@/system/user/entities/user.entity';
import { PickType } from '@nestjs/swagger';

export class UpdateProfileDto extends PickType(User, ['email', 'nickName', 'icon']) {}
