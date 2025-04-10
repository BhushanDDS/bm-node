import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class jsonParse implements PipeTransform {
  transform(value: string) {
    try {
      return JSON.parse(value);
    } catch (error) {
      throw new BadRequestException('Invalid JSON string in query parameter');
    }
  }
}
