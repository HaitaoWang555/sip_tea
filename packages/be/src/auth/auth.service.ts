import { ApiException } from '@/common/api/error';
import { ResultCode, ResultMessage } from '@/common/api/result-enum';
import { UserService } from '@/system/user/user.service';
import { encrypt } from '@/utils/crypto';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  async signIn(username: string, pass: string) {
    const user = await this.userService.findOneByUsername(username);
    if (!user || user.password !== encrypt(pass)) {
      throw new ApiException(ResultCode.LOGIN_FAILED, ResultMessage.LOGIN_FAILED);
    }
    const payload = { username: user.username, sub: user.id };
    return {
      token: await this.jwtService.signAsync(payload),
    };
  }
}
