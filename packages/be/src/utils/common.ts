import { Request } from 'express';

export function extractTokenFromHeader(request: Request): string | undefined {
  const [type, token] = request.headers.authorization?.split(' ') ?? [];
  return type === 'Bearer' ? token : undefined;
}

export function generateRandomString(length: number) {
  let result = '';
  const charsArray = ['abcdefghijklmnopqrstuvwxyz', 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', '0123456789', '!$@#%*()'];
  for (let i = 0; i < length; i++) {
    let charsIndex: number = 0;
    if (i < 4) {
      charsIndex = i;
    } else {
      charsIndex = Math.floor(Math.random() * 3);
    }
    const chars = charsArray[charsIndex];
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}
