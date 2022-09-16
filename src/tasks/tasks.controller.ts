import { Controller, Get, Post, Body, Param, Delete, Patch, Query } from '@nestjs/common';
import { CreaTeTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { Task, TaskStatus } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {
    }

    @Get()
    getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
        if (Object.keys(filterDto).length) {
          return  this.tasksService.getTaskWithFilters(filterDto);
        }
        else { 
            return this.tasksService.getAllTasks();
         }
    }

    @Get('/:id')
    getTaskById(@Param('id') id: string) {
        return this.tasksService.getTaskById(id)

    }

    @Post()
    createTask(@Body() createTaskDto: CreaTeTaskDto): Task {
        return this.tasksService.createTask(createTaskDto)

    }

    @Delete('/:id')
    deleteTask(@Param('id') id: string) {
        return this.tasksService.deleteTask(id)
    }

    @Patch('/:id/status')
    updateTaskStatus(@Param('id') id: string, @Body('status') status: TaskStatus) {
        return this.tasksService.updateTaskStatus(id, status);

    }
}
