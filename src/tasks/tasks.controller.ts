import { Controller, Get, Post, Body } from '@nestjs/common';
import { create } from 'domain';
import { title } from 'process';
import { Task } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {
    }

    @Get()
    getTasks(): Task[] {
        return this.tasksService.getAllTasks();
    }

    @Post()
    createTask(
        @Body('title') title: string,
        @Body('description') description: string
    )  {

        return this.tasksService.createTask(title, description)

    }
}
