import { PartialType } from '@nestjs/swagger';
import { CreatePoetryDto } from './create-poetry.dto';

export class UpdatePoetryDto extends PartialType(CreatePoetryDto) {}
