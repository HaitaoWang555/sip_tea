import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResourceService } from './resource.service';
import { ResourceController } from './resource.controller';
import { Resource } from './entities/resource.entity';
import { RoleModule } from '../role/role.module';

@Module({
  imports: [TypeOrmModule.forFeature([Resource]), RoleModule],
  controllers: [ResourceController],
  providers: [ResourceService],
})
export class ResourceModule {}
