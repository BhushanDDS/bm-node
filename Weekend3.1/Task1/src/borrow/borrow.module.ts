import { Module } from '@nestjs/common';
import { BorrowController } from './borrow.controller';
import { BorrowService } from './borrow.service';
import { Borrow } from './borrow.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookModule } from 'src/book/book.module';
import { MemberModule } from 'src/member/member.module';

@Module({
    imports:[TypeOrmModule.forFeature([Borrow]), BookModule,MemberModule],
  controllers: [BorrowController],
  providers: [BorrowService]
})
export class BorrowModule {}
