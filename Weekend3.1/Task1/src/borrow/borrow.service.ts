import { Injectable, NotFoundException } from '@nestjs/common';
import { BorrowDto } from './dto/borrow-book-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Borrow } from './borrow.entity';
import { Repository } from 'typeorm';
import { BookService } from 'src/book/book.service';
import { MemberService } from 'src/member/member.service';
import { BookNotAvailableException } from 'src/commons/exceptions/booknotavailinle';

@Injectable()
export class BorrowService {
   

    constructor(@InjectRepository(Borrow)
    private borrowrepo: Repository<Borrow>,
    private bookservice: BookService,
    private memberservice: MemberService, 
    ){}


  async returnBook(borrowid: number) {

        const borrowRecord = await this.borrowrepo.findOne({ where: { borrowid } as any });

        if (!borrowRecord) {
            throw new Error('Borrow record not found');
        }
        borrowRecord.isReturned = true;
        borrowRecord.returnDate = JSON.stringify(new Date().toISOString());
        return  await this.borrowrepo.save(borrowRecord);
    }

   async borrowBook(borrowDto: BorrowDto) 
    {
        const { bookId, memberId } = borrowDto;
        const book = await this.bookservice.getBookById(bookId);
        if (!book) {
          throw new NotFoundException('Book not found');
        }
    
        if (book.quantity <= 0) {
          throw new BookNotAvailableException();
        }
    
        const member = await this.memberservice.getMemberById(memberId);
        if (!member) {
          throw new NotFoundException('Member not found');
        }
        book.quantity -= 1;
        await this.bookservice.updateBook(bookId, { quantity: book.quantity });

                const newbookrecord = await this.borrowrepo.create({
                    borrowingDate:JSON.stringify(new Date().toISOString()),
                    returnDate:borrowDto.returnDate,
                    isReturned: false,
                    book: book,
                    member: member,
                });

                return await this.borrowrepo.save(newbookrecord);

    }
}
