import { Appointment } from 'src/appointment/appointment.entity';
import { MedicalHistory } from 'src/medical-history/medicalhistory.entity';
import { WorkingHours } from 'src/working-hours/workinghours.entity';
import{Column, PrimaryGeneratedColumn,  Entity, OneToMany} from 'typeorm'



@Entity()
export class User{
@PrimaryGeneratedColumn()    
userid:number;


@Column({type:'varchar', length:44})
firstname:string;

@Column({type:'varchar', length:44})
lastname:string;

@Column({type:'varchar',length:44,unique:true})
email:string;

@Column({type:'varchar' , length:44})
password:string;

@Column('simple-array')
roles:string[];

@Column({type:'varchar', length:100})
address:string;

@Column({type:'varchar',length:22})
department:string;

@Column()
fee:number;

@OneToMany(() => Appointment, (appointment) => appointment.patient)
  appointments: Appointment[];


@OneToMany(()=>Appointment,(appointment)=>appointment.doctor)
appointmntDoctor :Appointment[];

@OneToMany(()=>MedicalHistory,(med)=>med.patient)
medicalHistory:MedicalHistory[];

@OneToMany(()=>WorkingHours,(wh)=>wh.user)
WorkingHours:WorkingHours[]








}

