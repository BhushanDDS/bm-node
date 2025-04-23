import { IsEmail, IsEnum, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Role } from '../user.entity';
import { Exclude } from 'class-transformer';


export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email:string;

  @IsString()
  @MinLength(6)
  password:string;

  @IsEnum(Role)
  role: Role; 
}
