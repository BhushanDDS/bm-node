import { Appointment } from "src/appointment/appointment.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Bill{
    @PrimaryGeneratedColumn()
    billId: number;
  
    @ManyToOne(() => Appointment, (appointment) => appointment.bills)
    @JoinColumn({ name: 'aptId' })
    appointment: Appointment;
  
    @Column()
    method: string; 
  
    @Column()
    status: string; 


}