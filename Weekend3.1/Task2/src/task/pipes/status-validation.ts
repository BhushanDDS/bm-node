import { PipeTransform, BadRequestException } from '@nestjs/common';
import { TaskStatus } from '../task.entity';

export class StatusValidationPipe implements PipeTransform {
  readonly allowedStatuses = [TaskStatus.OPEN, TaskStatus.DONE];

  transform(value: any): TaskStatus {
    if (typeof value !== 'string') {
      throw new BadRequestException('Status must be a string');
    }

    const upperCaseValue = value.toUpperCase();

    if (!this.allowedStatuses.includes(upperCaseValue as TaskStatus)) {
      throw new BadRequestException(`Invalid status: ${value}`);
    }

    return upperCaseValue as TaskStatus;
  }
}
