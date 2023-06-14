import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GenTableService } from './gen_table.service';
import { GenTableController } from './gen_table.controller';
import { GenTable } from './entities/gen_table.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GenTable])],
  controllers: [GenTableController],
  providers: [GenTableService],
})
export class GenTableModule {}
