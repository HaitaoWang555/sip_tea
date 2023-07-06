import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { UserModule } from '@/system/user/user.module';
import { RoleModule } from '@/modules';

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      useFactory: () => {
        return {
          global: true,
          secret: process.env.SECRET,
          signOptions: { expiresIn: process.env.EXPIRESIN },
        };
      },
    }),
    RoleModule,
  ],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
