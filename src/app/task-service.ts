import { Injectable } from "@angular/core";
import { Task } from "./tasks";

export let tasks: Task[] = [
    {
        id: 0,
        description: "My task example"
    }
]


@Injectable({
    providedIn:"root"
})
export class TaskService{
    protected taskCnt:number = 1

    constructor(){}

    getTaskList(): Task[] {
        return tasks
    }
    addTask(description:string):void{
        tasks.push({id:this.taskCnt++, description:description})
    }
    removeTask(id:number):void{
        const index =  tasks.map(t => t.id).indexOf(id);
        tasks.splice(index, 1)
        console.log(tasks)
    }
}