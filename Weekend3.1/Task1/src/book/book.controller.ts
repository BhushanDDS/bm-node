import { Body, Controller, Post,Get } from '@nestjs/common';
import { AddBookDto } from './dto/add-book-dto';
import { QuantityValidationPipe } from 'src/commons/pipe/quantity.pipe';
import { BookService } from './book.service';

@Controller('book')
export class BookController {
    constructor(private bookservice:BookService){}

@Post('book')
postbok(@Body(new QuantityValidationPipe()) AddBookDto:AddBookDto){
    return this.bookservice.addbook(AddBookDto);
}

@Get('get-books')
getBooks(){
    return this.bookservice.getAvilibleBooks();
}



}
