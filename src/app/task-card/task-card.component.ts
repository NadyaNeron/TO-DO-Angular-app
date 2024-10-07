import { Component, Input, inject } from '@angular/core';
import { Task } from '../tasks';
import { TaskService } from '../task-service';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [],
  template: `
    <div class="task-card">
      <p class = "description-container">{{task.description}}</p>
      <button class="delete-task-btn" (click)="removeTask()">X</button>
    </div>
  `,
  styles: ``,
  styleUrl:"./task-card.component.css"
})
export class TaskCardComponent {
  @Input() task!: Task;
  taskService: TaskService = inject (TaskService)
  removeTask():void{
    this.taskService.removeTask(this.task.id)
  }
}
