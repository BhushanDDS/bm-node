import { Module } from '@nestjs/common';
import { DosageController } from './dosage.controller';
import { DosageService } from './dosage.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dosage } from './dosage.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Dosage])],
  controllers: [DosageController],
  providers: [DosageService]
})
export class DosageModule {}
