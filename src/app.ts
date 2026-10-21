import express, {type Express, type NextFunction, type Request, type Response} from 'express';
import {TaskRepository} from "./repositiories/TaskRepository.ts";
import {Pool, type PoolConfig} from "pg";
import {TaskService} from "./services/TaskService.js";
import {TaskController} from "./controllers/TaskController.js";

const app: Express = express();


const globalPool : Pool = new Pool({
        host: 'localhost',
        port: 5432,
        user: 'postgres',
        password : 'secret',
        database : 'todo'
    }
);

app.listen(3000, () => {
    console.log(`Example app listening on port 3000`)
})

app.use(express.json());

const globalRepository : TaskRepository = new TaskRepository(globalPool);
const globalService : TaskService = new TaskService(globalRepository);
const globalTaskController : TaskController = new TaskController(globalService,app);

app.post("/tasks", globalTaskController.saveTask);
app.get("/tasks", globalTaskController.getTasks);

app.use((err :any, req :Request, res :Response, next : NextFunction) => {
    console.error(err);
})
