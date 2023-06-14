import { OmitType } from '@nestjs/swagger';
import { GenTable } from '../entities/gen_table.entity';

export class CreateGenTableDto extends OmitType(GenTable, ['id']) {}
