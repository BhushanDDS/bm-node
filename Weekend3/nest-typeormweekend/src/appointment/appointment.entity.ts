import { Bill } from 'src/bill/bill.entity';
import { Prescription } from 'src/prescription/prescription.entity';
import { User } from 'src/user/user.entity';
import {Column,Entity,JoinColumn,ManyToOne,OneToMany,OneToOne,PrimaryGeneratedColumn   } from 'typeorm'


@Entity()
export class Appointment{
@PrimaryGeneratedColumn()
aptId:number;

@Column({type:'varchar', length:44})
date:string;

@Column('simple-array')
status:string[];

@ManyToOne(() => User, (user) => user.appointments)
@JoinColumn({ name: 'patientId' })
patient: User;

@ManyToOne(() => User, (user) => user.appointmntDoctor)
@JoinColumn({ name: 'doctorId' })
doctor: User;

@OneToOne(()=>Prescription,(pr)=>pr.appointment)
prescription:Prescription;


@OneToMany(()=>Bill,(bl)=>bl.billId)
bills:Bill[];

}
