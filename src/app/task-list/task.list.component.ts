import { Component, WritableSignal, inject } from '@angular/core';
import { TaskCardComponent } from "../task-card/task.card.component";
import { CommonModule } from '@angular/common';
import { TaskService } from '../task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from '../tasks';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, TaskCardComponent],
  template: `
    <section class="task-list-container">
      <div class="task-list">
        <div *ngIf="taskService.getTaskList().length; else noDataText">
          <app-task-card 
            (removeEvent)="handleEvent($event)"
            *ngFor="let task of taskService.getTaskList()" 
            [task]="task"
            (click)="handleClick(task.id)"
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
  // public removeTask(): void {
  //   this.taskService.removeTask(this.task().id)
  // }
  constructor(private router:Router, private route: ActivatedRoute){}
  public handleClick(id: number){
    this.router.navigate(['./', id], {relativeTo:this.route})
  }
  public handleEvent(id: number){
    this.taskService.removeTask(id)
  }
}
