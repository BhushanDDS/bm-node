import { User } from "src/user/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class WorkingHours{
    
    @PrimaryGeneratedColumn()
    id:number;


    @Column()
    day:string;

    @Column()
    time:string;


    @ManyToOne(()=>User,(user)=>user.WorkingHours)
    @JoinColumn({ name: 'userId' })
    user:User;



}
