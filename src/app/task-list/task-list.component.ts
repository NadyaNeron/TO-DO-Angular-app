import { Component, inject } from '@angular/core';
import { TaskCardComponent } from "../task-card/task-card.component";
import { Task } from '../tasks';
import { CommonModule } from '@angular/common';
import { TaskService, tasks } from '../task-service';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, TaskCardComponent],
  template: `
    <section class="task-list-container">
      <div class="task-list">
        <div *ngIf="taskList.length; else noDataText">
          <app-task-card *ngFor = "let task of taskList" 
          [task] = "task"></app-task-card>
        </div>

        <ng-template #noDataText>
          Тут пока пусто
        </ng-template>
      </div>
    </section>
  `,
  styleUrl: "./task-list.component.css",
  providers: [TaskService]
})

export class TaskListComponent {
  taskService: TaskService = inject (TaskService);
  taskList: Task[] = tasks

  // constructor(){
  //   this.taskList = this.taskService.getTaskList()
  // }
}
