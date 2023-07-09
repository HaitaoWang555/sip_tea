import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PoetryService } from './poetry.service';
import { PoetryController } from './poetry.controller';
import { Poetry } from './entities/poetry.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Poetry])],
  controllers: [PoetryController],
  providers: [PoetryService],
})
export class PoetryModule {}
