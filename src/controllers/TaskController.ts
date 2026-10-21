import type {TaskService} from "../services/TaskService.ts";
import type {Task} from "../entities/Task.ts";
import type {Express} from "express";
import type {NextFunction, Response, Request} from "express";

export class TaskController {
    private taskService : TaskService;
    private app : Express;
    private path = "http://localhost:3000/";

    constructor(taskService : TaskService, app : Express) {
        this.taskService = taskService;
        this.app = app;
    }

     public async saveTask (task : Task){
        this.app.post(this.path ,(req :Request, res : Response) =>{
            console.log(req.body);

        })
        return this.taskService.saveTask(task);
    }

}