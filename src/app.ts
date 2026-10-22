import express, {type Express, type NextFunction, type Request, type Response} from 'express';
import {TaskRepository} from "./repositiories/TaskRepository.ts";
import {Pool, type PoolConfig} from "pg";
import {TaskService} from "./services/TaskService.js";
import {TaskController} from "./controllers/TaskController.js";
import {validateBody, validateParams} from "./MiddleWare/validate.ts";
import {createTaskSchema, idParamSchema, setDoneSchema} from "./validations/TaskSchemas.ts";

const app: Express = express();


const globalPool : Pool = new Pool({
        host: 'localhost',
        port: 5432,
        user: 'postgres',
        password : 'secret',
        database : 'todo'
    }
);


app.use(express.json());
app.use(express.static('public'));

const globalRepository : TaskRepository = new TaskRepository(globalPool);
const globalService : TaskService = new TaskService(globalRepository);
const globalTaskController : TaskController = new TaskController(globalService,app);


app.post("/tasks", validateBody(createTaskSchema), globalTaskController.saveTask);
app.get("/tasks", globalTaskController.getTasks);
app.delete("/tasks/:id", validateParams(idParamSchema),  globalTaskController.deleteTask);
app.patch("/tasks/:id" , validateParams(idParamSchema),
    validateBody(setDoneSchema),globalTaskController.patchTaskDone)

app.use((err :any, req :Request, res :Response, next : NextFunction) => {
    console.error(err);
})



app.listen(3000, () => {
    console.log(`Example app listening on port 3000`)
})