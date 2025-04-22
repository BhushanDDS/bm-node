import { IsBoolean, IsNumber, IsString } from "class-validator";

export class BorrowDto {

    
    @IsString()
    borrowingDate?:string;

    @IsString()
    returnDate:string;

  
    @IsBoolean()
    isReturned: boolean;

  
    @IsNumber()
    bookId:number;

    @IsNumber()
    memberId:number;

}