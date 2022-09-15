import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid'
import { CreaTeTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = []
    getAllTasks(): Task[] {
        return this.tasks;
    }

    getTaskById(taskId : string): Task {
        const task = this.tasks.find((task)=> task.id=== taskId)
        return task

    }

    createTask(createTaskDto: CreaTeTaskDto) {

        const {title, description} = createTaskDto
        const task: Task = {
            id: uuid(),
            title,
            description,
            status: TaskStatus.OPEN
        }

        this.tasks.push(task)
        return task;

    }

    deleteTask(taskId: string) {
      this.tasks = this.tasks.filter((task) => task.id !== taskId)
    }

    updateTaskStatus(taskId: string, status: TaskStatus) {
        const task = this.getTaskById(taskId)
        task.status = status;

        return task 
     
    }
}
