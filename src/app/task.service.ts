import { Injectable, WritableSignal, signal } from "@angular/core";
import { Task } from "./tasks";

@Injectable({
    providedIn:"root"
})
export class TaskService{
    public tasks:  WritableSignal<Task[]> = signal([
        {
            id: 0,
            description: "My task example"
        }
    ])

    constructor(){}

    getTaskList() {
        return this.tasks()
    }
    getTaskById(id:number){
        return this.tasks().find(t => t.id === id)
    }
    addTask(description:string): void {
        const id = this.tasks().length? Math.max(...this.tasks().map(t => t.id)) + 1 : 0
        this.tasks.update(list => [...list, {id:id, description:description}])
    }
    removeTask(id:number): void {
        this.tasks.update(list => [...list.filter(t => t.id !== id)])
    }
}