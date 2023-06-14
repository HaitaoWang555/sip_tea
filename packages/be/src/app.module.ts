import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategy';
import { AppInterceptor } from './app.interceptor';
import { UserModule } from './user/user.module';
import { join } from 'path';
import { GenTableModule } from './gen_table/gen_table.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DB,
      entities: [join(__dirname, '**', '/entities/*.entity.{ts,js}')],
      logging: process.env.LOGGING && process.env.LOGGING === '1',
      synchronize: process.env.SYNCHRONIZE && process.env.SYNCHRONIZE === '1',
      namingStrategy: new SnakeNamingStrategy(),
    }),
    UserModule,
    GenTableModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: AppInterceptor,
    },
  ],
})
export class AppModule {}
