import { IsNotEmpty } from 'class-validator';

export class UpdatePassword {
  /**
   * 原密码
   */
  @IsNotEmpty()
  oldPassword: string;

  /**
   * 新密码
   */
  @IsNotEmpty()
  newPassword: string;
}
