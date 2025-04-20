import { Appointment } from "src/appointment/appointment.entity";
import { Dosage } from "src/dosage/dosage.entity";
import { Column,Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Prescription{
@PrimaryGeneratedColumn()
prid:number

@Column({type:"varchar",length:100})
specialmention:string;

@Column({type:"varchar",length:10})
nextappointment:string;

@OneToOne(() => Appointment, (ap) => ap.prescription)
appointment: Appointment;


@OneToMany(()=>Dosage,(ds)=>ds.prescription)
dosage:Dosage[];


}