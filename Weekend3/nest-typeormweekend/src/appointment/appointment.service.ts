import { Injectable } from '@nestjs/common';
import { MakeAppointmentDto } from './dto/make.appointment';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from './appointment.entity';
import { Like, Repository } from 'typeorm';
import { User } from 'src/user/user.entity';
import { Bill } from 'src/bill/bill.entity';
import { Prescription } from 'src/prescription/prescription.entity';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentRepo: Repository<Appointment>,

    @InjectRepository(User)
    private userRepo: Repository<User>,

    @InjectRepository(Bill)
    private billRepo: Repository<Bill>,

    @InjectRepository(Prescription)
    private prescriptionRepo: Repository<Prescription>,
  ) {}

  async makeAppointment(dto: MakeAppointmentDto) {
    const { date, status, patientId, doctorId, prescriptionId, billIds } = dto;

    const patient = await this.userRepo.findOneBy({ userid: patientId });
    const doctor = await this.userRepo.findOneBy({ userid: doctorId });

    if (!patient || !doctor) {
      throw new Error('Invalid patient or doctor ID');
    }

    const appointment = this.appointmentRepo.create({
      date,
      status,
      patient,
      doctor,
    });

    // Optional: Link existing prescription
    if (prescriptionId) {
      const prescription = await this.prescriptionRepo.findOneBy({ prid: prescriptionId });
      if (!prescription) {
        throw new Error('Prescription not found');
      }
      appointment.prescription = prescription;
    }

    // Optional: Attach bills
    if (billIds && billIds.length > 0) {
      const bills = await this.billRepo.findByIds(billIds);
      appointment.bills = bills;
    }

    return this.appointmentRepo.save(appointment);
  }


  async getCanceledAppointments(){
    const canceledAppointments = await this.appointmentRepo.find({
        where: {
          status: Like('%canceled%'),
        },
        relations: ['patient', 'doctor'],
      });
      
    return canceledAppointments;
  }


  async singleSortAppointmentsByDate(){
    const sortedAppointments = await this.appointmentRepo.find({
        order: {
          date: 'DESC',
        },
        relations: ['patient.firstname', 'doctor.firstname'],
      });
      
    return sortedAppointments;

  }

  async relationalSortAppointments(){
    const sortedRelational = await this.appointmentRepo
    .createQueryBuilder('appointment')
    .leftJoinAndSelect('appointment.patient', 'patient')
    .leftJoinAndSelect('appointment.doctor', 'doctor')
    .select(['appointment.date', 'doctor.firstname', 'doctor.lastname']) 
    .orderBy('patient.firstname', 'DESC') 
    .getMany();
  
  
    return sortedRelational;
  }

  async getPaginatedAppointments(
    page = 1,
    limit = 3,
    sortBy: keyof Appointment = 'date',
    sortOrder: 'ASC' | 'DESC' = 'DESC'
  ) {
    const offset = (page - 1) * limit;
  
    const [data, total] = await this.appointmentRepo
      .createQueryBuilder('appointment')
      .leftJoinAndSelect('appointment.patient', 'patient')
      .leftJoinAndSelect('appointment.doctor', 'doctor')
      .orderBy(`appointment.${sortBy}`, sortOrder)
      .limit(limit)
      .offset(offset)
      .getManyAndCount();
  
    return {
      data,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    };
  }

}
