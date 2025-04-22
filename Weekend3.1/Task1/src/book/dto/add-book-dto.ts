import { IsNumber, IsString } from "class-validator";



export class AddBookDto {
    
        @IsString()
        title:string;
        
        @IsString()
        isbn:string;
    
        @IsNumber()
        quantity:number;
}