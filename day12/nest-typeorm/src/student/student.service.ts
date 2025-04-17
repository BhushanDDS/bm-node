import { Injectable } from '@nestjs/common';
import { Student } from './entity/student.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class StudentService {


    constructor(@InjectRepository(Student) private repo: Repository<Student>) {}

  async create(dto: { name: string }) {
    const student = this.repo.create(dto);
    return this.repo.save(student);
  }

  async getStudentCourses(id: number) {
    return this.repo.findOne({
      where: { id },
      relations: ['courseConnections', 'courseConnections.course'],
    });
  }
}
