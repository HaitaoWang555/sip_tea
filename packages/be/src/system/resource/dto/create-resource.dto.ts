import { PickType } from '@nestjs/swagger';
import { Resource } from '../entities/resource.entity';

export class CreateResourceDto extends PickType(Resource, ['title', 'url']) {}
