import { IsArray, IsEmail, IsInt,IsString, Length, Max, Min, min, MinLength } from "class-validator";
export class CreateUserDto{

@IsString()
@Length(2,50,{message:"length should be more that 2 and less than 50"})
firstName: string; 

@IsString()
@Length(2,50,{message:"length should be more that 2 and less than 50"})
lastName: string; 

@IsEmail({},{message:"Enter valid email"})
email: string; 


@IsInt({message:"age must be an int"})
@Min(18,{message:"Min 18"})
@Max(65,{message:"max 65"})
age: number; // 18-65

}