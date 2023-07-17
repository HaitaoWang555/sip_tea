import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategy';
import { AppInterceptor } from './app.interceptor';
import { join } from 'path';
import * as modules from './modules';
import { AuthModule } from './auth/auth.module';
import { RedisModule } from './redis/redis.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { UPLOAD_FILE } from './utils/consts';

const envFilePath = process.env.NODE_ENV === 'production' ? '.env' : `.env.${process.env.NODE_ENV}`;

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DB,
      entities: [join(__dirname, '**', '/entities/*.entity.{ts,js}')],
      logging: process.env.NODE_ENV === 'production' ? ['error', 'warn', 'schema'] : true,
      synchronize: process.env.SYNCHRONIZE && process.env.SYNCHRONIZE === '1',
      namingStrategy: new SnakeNamingStrategy(),
    }),
    RedisModule.forRoot({
      config: {
        host: process.env.REDIS_HOST,
        username: 'default',
        port: Number(process.env.REDIS_PORT),
        password: process.env.REDIS_PASSWORD,
      },
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', UPLOAD_FILE),
      renderPath: join(__dirname, '..', UPLOAD_FILE),
    }),
    AuthModule,
    ...Object.values(modules),
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
