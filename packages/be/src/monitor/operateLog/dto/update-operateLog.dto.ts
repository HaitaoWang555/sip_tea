import { PartialType } from '@nestjs/swagger';
import { CreateOperatelogDto } from './create-operateLog.dto';

export class UpdateOperatelogDto extends PartialType(CreateOperatelogDto) {}
