import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports:[UserModule, TypeOrmModule.forFeature([Task])],
  controllers: [TaskController],
  providers: [TaskService]
})
export class TaskModule {}
