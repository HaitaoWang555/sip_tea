import { SetMetadata } from '@nestjs/common';

export const LOGGER_TYPE = 'LOGGER_TYPE';
export const Log = (type?: string) => SetMetadata(LOGGER_TYPE, type || 'operate');
