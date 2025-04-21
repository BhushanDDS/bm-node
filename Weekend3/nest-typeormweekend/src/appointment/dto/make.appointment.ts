export class MakeAppointmentDto {
    date: string;
    status: string[];
    patientId: number;
    doctorId: number;
    prescriptionId?: number;
    billIds?: number[];
  }
  