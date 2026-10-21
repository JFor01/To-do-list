import {Pool} from "pg";
import type {Task} from "../entities/Task.ts";

export class TaskRepository {

     private pool :Pool;
     private insertQuery :string = "INSERT into task(description, done) values ($1,$2) returning id";

    constructor(pool : Pool) {
        this.pool = pool;
    }

     public async saveTask(task : Task){
       const queryResult = await this.pool.query<Task>(this.insertQuery,[
           task.description, task.done
       ]);
       return queryResult.rows[0];
    }




}


