import { Transform, Type } from "class-transformer";
import {
  IsArray,
  IsIn,
  IsInt,
  IsString,
  Length,
  Max,
  Min,
  ValidateNested,
} from "class-validator";
import { IsPostalCodeByCountry } from "src/commons/validator/postvalidator";

class Education {
  @IsString()
  @IsIn(["BSC", "MSC", "PHD"], { message: "enter valid input" })
  degree: string;

  @IsInt()
  @Min(1990)
  @Max(new Date().getFullYear())
  year: number;
}

class Address {
  @IsString({ message: "String expected" })
  @Length(5, 200, { message: "min5 max 200" })
  street: string;

  @IsPostalCodeByCountry("IN", {
    message: "INVALID_POSTAL_CODE",
  })
  postalCode: string;
}

export class CustomValidatorDto {
  @IsString()
  id: string;

  @ValidateNested()
  @Type(() => Address)
  address: Address;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Education)
  education: Education[];
}
