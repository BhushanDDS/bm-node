import { Prescription } from "src/prescription/prescription.entity";
import { Collection, Column, Entity, JoinColumn, ManyToOne, NumericType, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Dosage{

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @Column()
    dose:string;

    @ManyToOne(()=>Prescription,(pr)=>pr.dosage)
    @JoinColumn({ name: 'prescriptionId' })
    prescription:Prescription;

}