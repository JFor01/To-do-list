import type {TaskService} from "../services/TaskService.ts";
import type {Task} from "../entities/Task.ts";
import type {Express} from "express";
import type {NextFunction, Response, Request} from "express";

export class TaskController {
    private taskService : TaskService;

    constructor(taskService : TaskService, app : Express) {
        this.taskService = taskService;
    }

    getTasks = async (req : Request, res : Response) =>{
        const tasks =  await this.taskService.getTasks();
        res.status(201).json(tasks);
    }

     saveTask = async  (req : Request, res :Response) =>{
        const task  =  await this.taskService.saveTask(req.body);

        res.status(201).json(task);
    }

}