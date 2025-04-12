import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
  } from 'class-validator';
  
  @ValidatorConstraint({ name: 'IsPostalCodeByCountry', async: false })
  export class PostalCodeValidator implements ValidatorConstraintInterface {
    validate(value: string, args: ValidationArguments) {
      const country = args.constraints[0];
  
      const patterns = {
        US: /^\d{5}(-\d{4})?$/, // 12345 or 12345-6789
        UK: /^[A-Z]{1,2}\d[A-Z\d]? \d[ABD-HJLNP-UW-Z]{2}$/, // e.g., SW1A 1AA
        IN: /^\d{6}$/, // Indian PIN Code
      };
  
      const regex = patterns[country];
      return regex ? regex.test(value) : false;
    }
  
    defaultMessage(args: ValidationArguments) {
      return `Invalid postal code for country ${args.constraints[0]}`;
    }
  }
  
  export function IsPostalCodeByCountry(
    country: 'US' | 'UK' | 'IN',
    validationOptions?: ValidationOptions,
  ) {
    return function (object: Object, propertyName: string) {
      registerDecorator({
        name: 'IsPostalCodeByCountry',
        target: object.constructor,
        propertyName: propertyName,
        constraints: [country],
        options: validationOptions,
        validator: PostalCodeValidator,
      });
    };
  }
  