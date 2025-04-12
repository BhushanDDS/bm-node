import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class IsEven implements PipeTransform {
  transform(value: number) {
    if (typeof value !== 'number') {
      throw new BadRequestException('Validation failed: Expected a number');
    }
    if(value%2==0){
        return value;
    }else{
        throw new BadRequestException('its odd')
    }
  }
}
