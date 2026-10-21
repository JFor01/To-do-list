import type {Indexable} from "./Indexable.ts";


export interface Task extends Indexable{
    description : string
    done : boolean
}