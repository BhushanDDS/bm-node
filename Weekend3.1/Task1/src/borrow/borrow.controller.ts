import { Body, Controller, Param, ParseIntPipe, Post } from '@nestjs/common';
import { BorrowService } from './borrow.service';
import { BorrowDto } from './dto/borrow-book-dto';

@Controller('borrow')
export class BorrowController {


    constructor(private borrowservice:BorrowService){}


    @Post('borrow')
    borrowBook(@Body() borrowDto: BorrowDto) {
        return this.borrowservice.borrowBook(borrowDto);
    }


    @Post('return/:bookid')
    returnBook(@Param('bookid',ParseIntPipe) id: number) {
        return this.borrowservice.returnBook(id);
    }
}
