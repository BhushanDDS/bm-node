import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class upperCase implements PipeTransform {
  transform(value: any) {
    if (typeof value !== 'string') {
      throw new BadRequestException('Validation failed: Expected a string');
    }
    return value.toUpperCase();
  }
}
