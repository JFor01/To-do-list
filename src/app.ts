import express, { type Express, type Request, type Response } from 'express';
import {TaskRepository} from "./repositiories/TaskRepository.ts";
import {Pool} from "pg";
import {TaskService} from "./services/TaskService.js";
import {TaskController} from "./controllers/TaskController.js";

const app: Express = express();

const globalPool : Pool = new Pool();

app.listen(3000, () => {
    console.log(`Example app listening on port 3000`)
})

const globalRepository : TaskRepository = new TaskRepository(globalPool);
const globalService : TaskService = new TaskService(globalRepository);
const globalTaskController : TaskController = new TaskController(globalService,app);


