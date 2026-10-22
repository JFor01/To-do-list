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

    deleteTask = async (req : Request, res : Response)=>{
        let id = Number(req.params.id);
        console.log(id);
        if(!Number.isInteger(id) || id <= 0 ){
            res.status(400).json({error : "Id must be a positive integer"});
        }
        const tasks = await this.taskService.deleteTask(id);
        res.status(200).json(tasks);
    }

    patchTaskDone = async (req : Request, res : Response)=>{
        const id = Number(req.params.id);
        if(!Number.isInteger(id) || id <= 0){
            res.status(400).json({error : "Id must be a positive integer"});
        }
        if(typeof req.body.done !== "boolean"){
            res.status(400).json({error : "Done must be boolean"});
        }
        const task = await  this.taskService.patchTaskDone(id,req.body.done );
        res.status(200).json(task);
    }



}