import { User } from '@/system/user/type';
import { encrypt } from '@/utils/crypto';

export const user = [
  {
    id: Math.floor(Math.random() * 100) + 900,
    username: process.env.ADMIN_NAME,
    password: encrypt(process.env.ADMIN_PASSWORD),
    email: 'admin@admin.com',
    nickName: 'admin',
    status: 1,
  },
] as User[];
