import { Book } from "src/book/book.entity";
import { Member } from "src/member/member.entity";
import { Collection, Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Borrow{


    @PrimaryGeneratedColumn()
    borrowid:number;

    @Column()
    borrowingDate:string;

    @Column({ nullable: true })
    returnDate:string;

    @Column({ default: false })
    isReturned: boolean;

    @ManyToOne(()=>Book , (bk)=>bk.borrow)
    @JoinColumn({ name: 'bookId' })
    book:Book;

    @ManyToOne(()=>Member, (mb)=>mb.borrow)
    @JoinColumn({ name: 'memberId' })
    member:Member;


}