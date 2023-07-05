import { IsNotEmpty } from 'class-validator';

/**
 * 登录参数
 */
export class SignInDto {
  /**
   * 用户名
   */
  @IsNotEmpty()
  username: string;
  /**
   * 密码
   */
  @IsNotEmpty()
  password: string;
}

/**
 * 登录成功返回
 */
export class SignInSuccessDto {
  /**
   * jwt token
   */
  token: string;
}
