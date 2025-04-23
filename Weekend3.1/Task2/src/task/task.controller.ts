import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task-dto';
import { UpdateTaskDto } from './dto/update-task-dto';
import { RolesGuard } from './decorators/role-guard';
import { Roles } from './decorators/role-decoarator';
import { StatusValidationPipe } from './pipes/status-validation';
import { TaskStatus } from './task.entity';

@Controller('task')
export class TaskController {

constructor(private taskService: TaskService) {}


@Post('create')
@UseInterceptors(ClassSerializerInterceptor)
createTask(@Body() CreateTaskDto:CreateTaskDto){
    return this.taskService.createTask(CreateTaskDto);
}

@Delete(':taskId/user/:userId')
@Roles('ADMIN') 
@UseGuards(RolesGuard) 
async deleteTask(
  @Param('taskId') taskId: number,
  @Param('userId') userId: number
) {
  return this.taskService.deleteTask(taskId);
}


@Put('update/:taskid/user/:userid')
updateTask(
  @Param('taskid', ParseIntPipe) taskid: number,
  @Param('userid',ParseIntPipe) userid: number,
  @Body() updateTaskDto: UpdateTaskDto,  
) {
  return this.taskService.updateTask(taskid, userid, updateTaskDto);
}


@Patch('status/:taskId/user/:userId')
changeTaskStatus(
  @Param('taskId',ParseIntPipe) taskId: number,
  @Param('userId',ParseIntPipe) userId: number,
  @Body('status', new StatusValidationPipe()) status: TaskStatus
) {
  return this.taskService.changeStatus(taskId, userId, status);
}

@Get('mine/:userId')
@UseInterceptors(ClassSerializerInterceptor)
async getMyTasks(@Param('userId') userId: number) {
    return this.taskService.getTasksByUser(userId);
}
 


}

