import { Injectable, WritableSignal, computed, signal } from "@angular/core";
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
    public maxId = computed(() => {
        if (!this.tasks().length)
            return -1
        return Math.max(...this.tasks().map(t => t.id))
    })

    constructor(){}

    getTaskList() {
        return this.tasks()
    }
    getTaskById(id:number){
        return this.tasks().find(t => t.id === id)
    }
    addTask(description:string): void {
        const id = this.maxId() + 1
        this.tasks.update(list => [...list, {id:id, description:description}])
    }
    removeTask(id:number): void {
        this.tasks.update(list => [...list.filter(t => t.id !== id)])
    }
}