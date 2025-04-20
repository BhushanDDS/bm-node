import { Module } from '@nestjs/common';
import { MedicalHistoryController } from './medical-history.controller';
import { MedicalHistoryService } from './medical-history.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicalHistory } from './medicalhistory.entity';

@Module({
  imports:[TypeOrmModule.forFeature([MedicalHistory])],
  controllers: [MedicalHistoryController],
  providers: [MedicalHistoryService]
})
export class MedicalHistoryModule {}
