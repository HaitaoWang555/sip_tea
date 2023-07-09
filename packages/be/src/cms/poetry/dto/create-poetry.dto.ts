import { PickType } from '@nestjs/swagger';
import { Poetry } from '../entities/poetry.entity';

export class CreatePoetryDto extends PickType(Poetry, ['title', 'dynasty', 'author', 'content']) {}
