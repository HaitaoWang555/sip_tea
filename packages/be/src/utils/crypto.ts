import { createHmac } from 'node:crypto';

export function encrypt(str: string) {
  if (!str) return '';
  return createHmac('sha256', process.env.PASSWORD_SECRET).update(str).digest('hex');
}
