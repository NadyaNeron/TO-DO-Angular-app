import { Component, inject, input } from '@angular/core';
import { Task } from '../tasks';
import { TaskService } from '../task.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [RouterModule],
  template: `
    <div class="task-card" (click)="goToTaskPage()" [routerLink]='["/task",task().id]'>
      <p class="description-container">{{task().description}}</p>
      <button class="delete-task-btn" (click)="removeTask()">X</button>
    </div>
  `,
  styles: ``,
  styleUrl:"./task.card.component.scss"
})
export class TaskCardComponent{
  public task = input.required<Task>()
  public taskService: TaskService = inject(TaskService)
  public removeTask(): void {
    this.taskService.removeTask(this.task().id)
  }
  constructor(private router:Router){}
  public goToTaskPage(){
    this.router.navigate(['/task', this.task().id])
  }
}
