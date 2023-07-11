import { PickType } from '@nestjs/swagger';
import { Operatelog } from '../entities/operateLog.entity';

export class CreateOperatelogDto extends PickType(Operatelog, [
  'path',
  'method',
  'ip',
  'query',
  'params',
  'body',
  'result',
  'error',
  'time',
  'createdBy',
  'status',
  'createdAt',
]) {}
