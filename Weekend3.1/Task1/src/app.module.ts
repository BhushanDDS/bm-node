import { Module } from '@nestjs/common';
import { BookModule } from './book/book.module';
import { MemberModule } from './member/member.module';
import { BorrowModule } from './borrow/borrow.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './book/book.entity';
import { Member } from './member/member.entity';
import { Borrow } from './borrow/borrow.entity';

@Module({
  imports: [ TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'NewPassword',
    database: 'week3task1',
    entities: [Book,Member,Borrow], 
    synchronize: true, 
    logging: ['query', 'error'], 
    logger: 'advanced-console', 
  }),BookModule, MemberModule, BorrowModule]
})
export class AppModule {}
