import { Injectable } from '@nestjs/common';
import { AddBookDto } from './dto/add-book-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './book.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BookService {
    
constructor (@InjectRepository(Book)
private bookrepo :Repository<Book>,
) {}

async updateBook(bookId: number, arg1: { quantity: number; }) {
    const book = await this.bookrepo.findOne({ where: {bookid: bookId  } as any });
    if (!book) {
        throw new Error('Book not found');
    }
    book.quantity = arg1.quantity;
    await this.bookrepo.save(book);
}

    async addbook(AddBookDto: AddBookDto) {
        const book = await this.bookrepo.findOne({ where: { title: AddBookDto.title } });
        if (book) { 
            book.quantity += AddBookDto.quantity;
            return await this.bookrepo.save(book);
        }
        const newBook = await this.bookrepo.create(AddBookDto);
        return await this.bookrepo.save(newBook);
    }

    async getAvilibleBooks(){
        const books = await this.bookrepo.find();
        return await books.filter((book) => book.quantity > 0);

    }

    async getBookById(bookid: number) {
        const book = await this.bookrepo.findOne({ where: { bookid } as any });
        if (!book) {
            throw new Error('Book not found');
        }
        return book;
    }



}
