import { IsArray, IsEmail, isString, IsString, Matches } from "class-validator";

export class CreateMemnerDto{

       @IsString()
        name:string;
    
        @IsEmail()
        email:string;
    
        @IsString()
       
        password:string;
    
        @IsString()
        @Matches(/^[6-9]\d{9}$/, {
          message: 'Phone number must be valid Indian format',
        })
        phone:string;
    
        @IsArray()
        @IsString({each:true})
        role:string[];
    
}