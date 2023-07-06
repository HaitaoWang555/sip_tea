import { Menu } from '@/system/menu/type';
import { User } from '@/system/user/entities/user.entity';

export class ProfileDto extends User {
  /**
   * 用户拥有的菜单
   */
  menus?: Menu[];
}
