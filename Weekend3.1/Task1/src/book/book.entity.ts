import { Borrow } from "src/borrow/borrow.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";



@Entity()
export class Book {

    @PrimaryGeneratedColumn()
    bookid:number ;

    @Column({type:"varchar", length:100})
    title:string;
    
    @Column({type:"varchar", length:100})
    isbn:string;

    @Column()
    quantity:number;

    @OneToMany(()=>Borrow, (br)=>br.book)
    borrow:Borrow[];

}