import { IsArray, IsNumber, IsOptional, IsPositive, IsString, Min, min, MinLength } from "class-validator";

export class CreateProductDto{

    @IsString()
    @MinLength(3)
    name:string;

    @IsNumber()
    @IsPositive()
    @Min(1)
    price:number;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    @MinLength(2, { each: true })
    tags:String[];
    
}