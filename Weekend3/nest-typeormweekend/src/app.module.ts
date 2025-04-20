import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AppointmentModule } from './appointment/appointment.module';
import { PrescriptionModule } from './prescription/prescription.module';
import { WorkingHoursModule } from './working-hours/working-hours.module';
import { MedicalHistoryModule } from './medical-history/medical-history.module';
import { BillModule } from './bill/bill.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DosageModule } from './dosage/dosage.module';
import { User } from './user/user.entity';
import { Appointment } from './appointment/appointment.entity';
import { Bill } from './bill/bill.entity';
import { Dosage } from './dosage/dosage.entity';
import { WorkingHours } from './working-hours/workinghours.entity';
import { Prescription } from './prescription/prescription.entity';
import { MedicalHistory } from './medical-history/medicalhistory.entity';

@Module({
  imports: [ TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'NewPassword',
      database: 'medcare',
      entities: [User,Appointment,Bill,Dosage,WorkingHours,Prescription,MedicalHistory], 
      synchronize: true, 
      logging: ['query', 'error'], 
      logger: 'advanced-console', 
    }),UserModule, AppointmentModule, PrescriptionModule, WorkingHoursModule, MedicalHistoryModule, BillModule, DosageModule]
})
export class AppModule {}
