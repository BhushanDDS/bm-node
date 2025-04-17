import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { CourseStudent } from '../../course-student/entities/course-student.entity';

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  duration: string;

  @Column()
  price: number;

  @OneToMany(() => CourseStudent, cs => cs.course)
  studentsEnrolled: CourseStudent[];
}
