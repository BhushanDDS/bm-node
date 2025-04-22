import { SrvRecord } from "node:dns";
import { Borrow } from "src/borrow/borrow.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";



@Entity()
export class Member{

    @PrimaryGeneratedColumn()
    memberid:number;

    @Column({type:"varchar", length:100})
    name:string;

    @Column({type:"varchar", length:100 , unique:true})
    email:string;

    @Column({type:"varchar", length:100})
    password:string;

    @Column({type:"varchar", length:15})
    phone:string

    @Column('simple-array')
    role:string[];

    @OneToMany(()=>Borrow ,(br)=>br.member)
    borrow:Borrow[];
    
}