import { PartialType } from '@nestjs/swagger';
import { CreateGenTableDto } from './create-gen_table.dto';

export class UpdateGenTableDto extends PartialType(CreateGenTableDto) {}
