import { User } from "src/user/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";






@Entity()
export class MedicalHistory{

@PrimaryGeneratedColumn()
historyid:number;

@Column()
diagnosis:string;


@Column()
allergies:string;

@Column({ type: 'text', nullable: true })
  chronicConditions: string;


  @ManyToOne(()=>User,(user)=>user.medicalHistory)
  @JoinColumn({ name: 'patientId' })
  patient:User;

}