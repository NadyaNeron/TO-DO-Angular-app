import { Injectable, computed, signal } from "@angular/core";
import { Task } from "./tasks";

@Injectable({
    providedIn:"root"
})
export class TaskService{
    public tasks = signal([
        {
            id: 0,
            name: "Me task example name",
            description: "My task example description"
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
    addTask(name:string, description:string): void {
        const id = this.maxId() + 1
        this.tasks.update(list => [...list, {id:id, name:name, description:description}])
    }
    removeTask(id:number): void {
        this.tasks.update(list => [...list.filter(t => t.id !== id)])
    }
    updateTask(task:Task){
        const newList = this.tasks().map(t => t.id === task.id? {id:t.id, name:task.name, description:task.description} : t)
        this.tasks.set(newList)
    }
}