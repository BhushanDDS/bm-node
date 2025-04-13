// cross-employment-validation.ts
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'CrossEmploymentValidation', async: false })
export class CrossEmploymentValidation implements ValidatorConstraintInterface {
  validate(_: any, args: ValidationArguments) {
    const { employmentType, fullTimeDetails } = args.object as any;
    if (employmentType === 'full-time' && !fullTimeDetails) return false;
    return true;
  }

  defaultMessage() {
    return 'fullTimeDetails is required when employmentType is full-time';
  }
}
