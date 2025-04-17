import { Injectable } from '@nestjs/common';
import { CourseStudent } from './entities/course-student.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CourseStudentService {


    constructor(
        @InjectRepository(CourseStudent)
        private readonly repo: Repository<CourseStudent>,
      ) {}
    
      async enroll(dto: { studentId: number; courseId: number }) {
        const enrollment = this.repo.create(dto);
        return this.repo.save(enrollment);
      }
}
