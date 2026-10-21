import {Pool} from "pg";
import type {Task} from "../entities/Task.ts";

export class TaskRepository {

     private pool :Pool;
     private insertQuery :string = "INSERT into task(description, done) values ($1,$2) returning id";
     private getByIdQuery : string = "SELECT * from task where id= $1";
     private getQuery : string = "SELECT * from task";
     private deleteQuery : string = "DELETE from task where id = $1"
    constructor(pool : Pool) {
        this.pool = pool;
    }

    private async getTasksById(id : number){
        const result = await this.pool.query<Task>(this.getByIdQuery, [id]);
        return result.rows[0];
    }

     public async saveTask(task : Task){
       const queryResult = await this.pool.query<Task>(this.insertQuery,[
           task.description, task.done
       ]);
         return await this.getTasksById(queryResult.rows[0].id);
    }

    public async getAllTasks(){
        const queryResult = await this.pool.query<Task>(this.getQuery)
        return queryResult.rows;

    }

    public async deleteTask(id : number){
         const queryResult = await this.pool.query(this.deleteQuery,[id]);
         console.log(queryResult);
    }




}


