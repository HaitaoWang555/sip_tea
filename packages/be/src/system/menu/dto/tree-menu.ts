import { ApiProperty } from '@nestjs/swagger';
import { Menu } from '../entities/menu.entity';

export class TreeMenu extends Menu {
  @ApiProperty({ type: [Menu] })
  children: TreeMenu[];
}
