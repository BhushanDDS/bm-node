import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { TaskStatus } from "../task.entity";

export class CreateTaskDto {
    @IsString()
    @IsNotEmpty()
    title: string;
  
    @IsString()
    @IsNotEmpty()
    description: string;
  
    @IsEnum(TaskStatus, {
      message: 'Status must be either OPEN or DONE',
    })
    status: TaskStatus;
  
    @IsNotEmpty()
    createdBy: number;
  }