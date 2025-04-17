import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentDto } from './dto/create-student-dto';

@Controller('student')
export class StudentController {

    constructor(private readonly studentService: StudentService) {}

    @Post()
    create(@Body() studentdto:StudentDto) {
      return this.studentService.create(studentdto);
    }
  
    @Get(':id/courses')
    getCourses(@Param('id') studentId: number) {
      return this.studentService.getStudentCourses(studentId);
    }
}
