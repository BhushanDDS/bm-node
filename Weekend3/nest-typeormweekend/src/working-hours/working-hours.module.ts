import { Module } from '@nestjs/common';
import { WorkingHoursController } from './working-hours.controller';
import { WorkingHoursService } from './working-hours.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkingHours } from './workinghours.entity';

@Module({
  imports:[TypeOrmModule.forFeature([WorkingHours])],
  controllers: [WorkingHoursController],
  providers: [WorkingHoursService]
})
export class WorkingHoursModule {}
