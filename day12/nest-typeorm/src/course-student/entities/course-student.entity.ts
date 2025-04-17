import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Student } from '../../student/entity/student.entity';
import { Course } from '../../course/entities/course.entity';

@Entity()
export class CourseStudent {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Student, student => student.courseConnections)
  @JoinColumn({ name: 'studentId' })
  student: Student;

  @Column()
  studentId: number;


  @ManyToOne(() => Course, course => course.studentsEnrolled)
  @JoinColumn({ name: 'courseId' })
  course: Course;

  @Column()
  courseId: number;


  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  enrolledAt: Date;
}
