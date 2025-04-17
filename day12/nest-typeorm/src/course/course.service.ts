import { Injectable } from '@nestjs/common';
import { Course } from './entities/course.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CourseService {


    constructor(@InjectRepository(Course) private repo: Repository<Course>) {}

    async create(dto: { name: string; duration: string; price: number }) {
      const course = this.repo.create(dto);
      return this.repo.save(course);
    }
  
    async getCourseStudents(id: number) {
      return this.repo.findOne({
        where: { id },
        relations: ['studentsEnrolled', 'studentsEnrolled.student'],
      });
    }

}
