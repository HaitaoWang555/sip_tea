import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OperatelogService } from './operateLog.service';
import { OperatelogController } from './operateLog.controller';
import { Operatelog } from './entities/operateLog.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Operatelog])],
  controllers: [OperatelogController],
  providers: [OperatelogService],
  exports: [OperatelogService, TypeOrmModule],
})
export class OperatelogModule {}
