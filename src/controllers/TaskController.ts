import type {TaskService} from "../services/TaskService.ts";
import type {Task} from "../entities/Task.ts";
import type {Express} from "express";
import type {NextFunction, Response, Request} from "express";

export class TaskController {
    private taskService : TaskService;

    constructor(taskService : TaskService, app : Express) {
        this.taskService = taskService;
    }

     saveTask = async  (req : Request, res :Response) =>{
        const task  =  await this.taskService.saveTask(req.body);
        res.status(201).json(task);
    }

}