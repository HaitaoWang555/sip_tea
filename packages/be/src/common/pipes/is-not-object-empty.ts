import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class IsNotObjectEmpty implements PipeTransform {
  transform(value: any): any {
    if (!Object.keys(value).length) {
      throw new BadRequestException('Payload should not be empty Object');
    }
    return value;
  }
}
