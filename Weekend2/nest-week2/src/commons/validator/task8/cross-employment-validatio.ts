import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

@ValidatorConstraint({ name: 'CrossEmploymentValidation', async: false })
export class CrossEmploymentValidation implements ValidatorConstraintInterface {
  validate(_: any, args: ValidationArguments) {
    const obj = args.object as any;

    const { employmentType, fullTimeDetails, contractorDetails } = obj;

    if (employmentType === 'full-time' && !fullTimeDetails) {
      return false;
    }

    if (employmentType === 'contractor' && !contractorDetails) {
      return false;
    }

    return true;
  }

  defaultMessage(args: ValidationArguments) {
    const obj = args.object as any;

    if (obj.employmentType === 'full-time') {
      return 'fullTimeDetails is required when employmentType is full-time';
    }

    if (obj.employmentType === 'contractor') {
      return 'contractorDetails is required when employmentType is contractor';
    }

    return 'Invalid employment details';
  }
}
