import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { CourseStudent } from '../../course-student/entities/course-student.entity';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => CourseStudent, cs => cs.student)
  courseConnections: CourseStudent[];
}
