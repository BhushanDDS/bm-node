import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { MakeAppointmentDto } from './dto/make.appointment';
import { Appointment } from './appointment.entity';

@Controller('appointment')
export class AppointmentController {


constructor (private appointmentService:AppointmentService){}


@Post('makeappointment')
makeappotintment(@Body()MakeAppointmentDto:MakeAppointmentDto){
return this.appointmentService.makeAppointment(MakeAppointmentDto);
}

  @Get('canceled')
  getCanceledAppointments() {
    return this.appointmentService.getCanceledAppointments();
  }


  @Get('sort/date')
  singleSortAppointmentsByDate() {
    return this.appointmentService.singleSortAppointmentsByDate();
  }


  @Get('sort/relational')
  relationalSortAppointments() {
    return this.appointmentService.relationalSortAppointments();
  }


@Get('paginated')
getPaginatedAppointments(
  @Query('page') page: number,
  @Query('limit') limit: number,
  @Query('sortBy') sortBy: keyof Appointment,
  @Query('sortOrder') sortOrder: 'ASC' | 'DESC',
) {
  return this.appointmentService.getPaginatedAppointments(
    Number(page) || 1,
    Number(limit) || 10,
    sortBy,
    sortOrder
  );
}



}
