import { ApiProperty } from '@nestjs/swagger';
import { Department } from '../entities/department.entity';

export class TreeDepartment extends Department {
  @ApiProperty({ type: [Department] })
  children: TreeDepartment[];
}
