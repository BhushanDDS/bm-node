import { Module } from '@nestjs/common';
import { CourseStudentController } from './course-student.controller';
import { CourseStudentService } from './course-student.service';
import { CourseStudent } from './entities/course-student.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([CourseStudent])],
  controllers: [CourseStudentController],
  providers: [CourseStudentService]
})
export class CourseStudentModule {}
