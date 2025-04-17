import { Body, Controller, Post } from '@nestjs/common';
import { CourseStudentService } from './course-student.service';

@Controller('course-student')
export class CourseStudentController {

    constructor(private readonly courseStudentService: CourseStudentService) {}

    @Post()
    enroll(@Body() dto: { studentId: number; courseId: number }) {
      return this.courseStudentService.enroll(dto);
    }
}
