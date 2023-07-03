import { PickType } from '@nestjs/swagger';
import { Department } from '../entities/department.entity';

export class CreateDepartmentDto extends PickType(Department, ['title', 'parentId', 'status', 'code']) {}
