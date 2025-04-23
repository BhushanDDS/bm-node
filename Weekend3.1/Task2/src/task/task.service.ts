import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task-dto';
import { UpdateTaskDto } from './dto/update-task-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task, TaskStatus } from './task.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';

@Injectable()
export class TaskService {
    constructor (@InjectRepository(Task)
    private taskRepository:Repository<Task>,
    private userRepository:UserService,
    ){}

  async deleteTask(taskId: number) {
      const task = await this.taskRepository.findOne({ where: { taskId: taskId } });
      if (!task) {
        throw new Error('Task not found');
      }
      const status= await this.taskRepository.remove(task);
      return {message:"Task deleted successfully", status:status};
  }

 
  async updateTask(taskId: number, currentUserId: number, updateTaskDto: UpdateTaskDto){
      const task = await this.taskRepository.findOne({
        where: { taskId: taskId },
        relations: ['createdBy'],
      });
      if (!task) {
        throw new NotFoundException('Task not found');
      }
      console.log(`Task createdBy ID: ${task.createdBy.id}, Requesting User ID: ${currentUserId}`);

      if (task.createdBy.id !== currentUserId) {
        throw new ForbiddenException('You are not authorized to edit this task');
      }
      Object.assign(task, updateTaskDto);
      return { message: "Task updated successfully", task: await this.taskRepository.save(task) };
  }
  


  async getTasksByUser(userId: number) {
      const user = await this.userRepository.findUserById(userId);
      if (!user) {
        throw new NotFoundException('User not found');
      }
    
      return this.taskRepository.find({ where: { createdBy: user } }); 
 }



   async createTask(CreateTaskDto: CreateTaskDto) {
        const user = await this.userRepository.findUserById(CreateTaskDto.createdBy);
        if (!user) {
            throw new Error('User not found');
        }
        const task = this.taskRepository.create({ ...CreateTaskDto, createdBy: user });
        return this.taskRepository.save(task);
    }

    async changeStatus(taskId: number, userId: number, status: TaskStatus) {
      const task = await this.taskRepository.findOne({
        where: { taskId },
        relations: ['createdBy'],
      });
    
      if (!task) {
        throw new NotFoundException('Task not found');
      }
    
      if (task.createdBy.id !== userId) {
        throw new Error('You are not authorized to change the status of this task');
      }
    
      task.status = status;
      return this.taskRepository.save(task);
    }
    

}
