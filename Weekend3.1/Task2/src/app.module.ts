import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { TaskModule } from './task/task.module';
import { User } from './user/user.entity';
import { Task } from './task/task.entity';
import { LoggerMiddleware } from './commons/middleware/logger.middleware';

@Module({
    imports: [ TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'NewPassword',
      database: 'week3task2',
      entities: [User,Task], 
      synchronize: true, 
      logging: ['query', 'error'], 
      logger: 'advanced-console', 
    }), UserModule, TaskModule]
  })
export class AppModule implements  NestModule {
  configure(consumer: MiddlewareConsumer) {

    consumer.apply(LoggerMiddleware).forRoutes('*')
  }
}
