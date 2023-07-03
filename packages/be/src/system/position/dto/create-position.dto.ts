import { PickType } from '@nestjs/swagger';
import { Position } from '../entities/position.entity';

export class CreatePositionDto extends PickType(Position, ['title', 'code', 'postRank', 'status']) {}
