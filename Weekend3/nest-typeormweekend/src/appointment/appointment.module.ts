import { Module } from '@nestjs/common';
import { AppointmentController } from './appointment.controller';
import { AppointmentService } from './appointment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from './appointment.entity';
import { Bill } from 'src/bill/bill.entity';
import { User } from 'src/user/user.entity';
import { Prescription } from 'src/prescription/prescription.entity';

@Module({
  imports :[TypeOrmModule.forFeature([Appointment, User,
    Bill,
    Prescription])],
  controllers: [AppointmentController],
  providers: [AppointmentService]
})
export class AppointmentModule {}
