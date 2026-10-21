import {TaskRepository} from "../repositiories/TaskRepository.ts";
import type {Task} from "../entities/Task.ts";

export class TaskService{

    private taskRepository : TaskRepository;

    constructor(taskRepository : TaskRepository) {
        this.taskRepository = taskRepository;
    }

    public async saveTask (task :Task){
        return await this.taskRepository.saveTask(task);
    }

}