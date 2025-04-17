import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { Auth } from './auth/entities/auth.entity';
import { StudentModule } from './student/student.module';
import { CourseModule } from './course/course.module';
import { CourseStudentModule } from './course-student/course-student.module';
import { Student } from './student/entity/student.entity';
import { Course } from './course/entities/course.entity';
import { CourseStudent } from './course-student/entities/course-student.entity';
@Module({
  imports: [ TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'NewPassword',
    database: 'nestapi',
    entities: [User,Auth, Student,Course,CourseStudent], 
    synchronize: true, 
    logging: ['query', 'error'], 
    logger: 'advanced-console', 
  }),UserModule, AuthModule, StudentModule, CourseModule, CourseStudentModule]
})
export class AppModule {}
