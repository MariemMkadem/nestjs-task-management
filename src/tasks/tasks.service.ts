import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid'
import { CreaTeTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { filter } from 'rxjs';

@Injectable()
export class TasksService {
    private tasks: Task[] = []
    getAllTasks(): Task[] {
        return this.tasks;
    }

    getTaskById(taskId: string): Task {
        const task = this.tasks.find((task) => task.id === taskId)
        return task
    }

    getTaskWithFilters(filterDto: GetTasksFilterDto) {
        const { status, search } = filterDto;
        let tasks = this.getAllTasks();

        if (status) {
            tasks = tasks.filter((task) => task.status === status)
        }
        if (search) {
            tasks = tasks.filter((task) => {
                if (task.title.includes(search) || task.description.includes(search)) {
                    return true
                }
                return false
            });

        }
        return tasks;
    }

    createTask(createTaskDto: CreaTeTaskDto) {

        const { title, description } = createTaskDto
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
