
import {
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
  } from 'class-validator';
  
  const RANGES = {
    US: [20, 100],
    EU: [15, 80],
  };
  
  @ValidatorConstraint({ name: 'IsContractRateValid', async: false })
  export class IsContractRateValid implements ValidatorConstraintInterface {
    validate(rate: number, args: ValidationArguments) {

      const contractorDetails = args.object as any;
      const headers = contractorDetails?.headers || {};
      const country = headers['x-country-code']?.toUpperCase() || 'US';
  
      // Get the appropriate range based on country code
      const [min, max] = RANGES[country] || RANGES.US;
  
      // Validate the hourly rate
      if (rate < min || rate > max) {
        (args as any).customError = {
          code: 'RATE_OUT_OF_RANGE',
          allowedRanges: { [country]: [min, max] },
        };
        return false;
      }
  
      return true;
    }
  
    defaultMessage(args: ValidationArguments) {
      const err = (args as any).customError;
      return JSON.stringify(err);
    }
  }