import {TaskRepository} from "../repositiories/TaskRepository.ts";
import type {Task} from "../entities/Task.ts";

export class TaskService{

    private taskRepository : TaskRepository;

    constructor(taskRepository : TaskRepository) {
        this.taskRepository = taskRepository;
    }

    public async getTasks(){
         return await this.taskRepository.getAllTasks();

    }

    public async saveTask (task :Task){
        return await this.taskRepository.saveTask(task);
    }

    public async deleteTask(id : number){
        return await this.taskRepository.deleteTask(id);
    }

    public async patchTaskDone(id : number, done : boolean){
        return await this.taskRepository.patchTaskDone(id, done);
    }



}