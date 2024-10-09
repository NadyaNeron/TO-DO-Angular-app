import { Component, inject } from '@angular/core';
import { TaskCardComponent } from "../task-card/task.card.component";
import { CommonModule } from '@angular/common';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, TaskCardComponent],
  template: `
    <section class="task-list-container">
      <div class="task-list">
        <div *ngIf="taskService.getTaskList().length; else noDataText">
          <app-task-card 
            *ngFor="let task of taskService.getTaskList()" 
            [task]="task"
          ></app-task-card>
        </div>

        <ng-template #noDataText>
          Тут пока пусто
        </ng-template>
      </div>
    </section>
  `,
  styleUrl: "./task.list.component.scss",
})

export class TaskListComponent {
  public taskService: TaskService = inject(TaskService);
}
