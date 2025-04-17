import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseDTO } from './dti/create-course-dto';

@Controller('course')
export class CourseController {



    constructor(private readonly courseService: CourseService) {}

    @Post()
    create(@Body() createCourse: CourseDTO) {
      return this.courseService.create(createCourse);
    }
  
    @Get(':id/students')
    getStudents(@Param('id') courseId: number) {
      return this.courseService.getCourseStudents(courseId);
    }
}
