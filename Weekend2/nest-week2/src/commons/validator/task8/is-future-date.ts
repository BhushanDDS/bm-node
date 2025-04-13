// is-future-date.ts
import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'IsFutureDate', async: false })
export class IsFutureDate implements ValidatorConstraintInterface {
  validate(date: Date) {
    return date > new Date();
  }

  defaultMessage() {
    return 'Joining date must be a future date';
  }
}
