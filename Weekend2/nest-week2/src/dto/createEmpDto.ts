import {
    IsEnum,
    ValidateNested,
    IsOptional,
    IsObject,
    IsDate,
    IsString,
    IsArray,
    ArrayNotEmpty,
    IsNumber,
    MaxLength,
    Validate,
    registerDecorator,
    ValidationOptions,
    ValidationArguments,
  } from 'class-validator';
  import { Type } from 'class-transformer';
import { IsFutureDate } from 'src/commons/validator/task8/is-future-date';
import { IsContractRateValid } from 'src/commons/validator/task8/is-contract-rate-valid';
import { IsMetadataValid } from 'src/commons/validator/task8/is-metadata-valid';
import { CrossEmploymentValidation } from 'src/commons/validator/task8/cross-employment-validatio';
 
  
  export class FullTimeDetails {
    @IsArray()
    @ArrayNotEmpty()
    @IsString({ each: true })
    benefits: string[];
  
    @IsDate()
    @Validate(IsFutureDate)
    @Type(()=>Date)
    joiningDate: Date;
  }
  
  export class ContractorDetails {
    @IsDate()
    @Type(() => Date) 
    contractStart: Date;

    @IsDate()
    @Type(() => Date) 
    contractEnd: Date;

 
    @IsNumber()
    @Validate(IsContractRateValid, {
        message: 'Invalid hourly rate',
      })
  hourlyRate: number;

  @IsOptional()
  headers?: Record<string, string>;

  }
  
  export class CreateEmploymentDto {
    @IsEnum(['full-time', 'contractor'])
    employmentType: 'full-time' | 'contractor';
  
    @IsOptional()
    @ValidateNested()
    @Type(() => FullTimeDetails)
    fullTimeDetails?: FullTimeDetails;
  
    @IsOptional()
    @ValidateNested()
    @Type(() => ContractorDetails)
    contractorDetails?: ContractorDetails;
  
    @IsObject()
    @Validate(IsMetadataValid)
    metadata: Record<string, string>;
  
    @Validate(CrossEmploymentValidation)
    dummy?: any; 
  }
  