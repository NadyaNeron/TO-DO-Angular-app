import { Component, WritableSignal, inject } from '@angular/core';
import { TaskCardComponent } from "../task-card/task.card.component";
import { CommonModule } from '@angular/common';
import { TaskService } from '../task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskFormComponent } from "../task-form/task.form.component";

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, TaskCardComponent, TaskFormComponent],
  template: `
    <section class="task-list-container">
      <div class="task-list">
        @for(task of taskService.getTaskList(); track task.id) {
          <app-task-card 
          (removeEvent)="handleEvent($event)"
          [task]="task"
          (click)="handleClick(task.id)"
        ></app-task-card> 
        <!-- <app-task-form [type]="'view'"></app-task-form> -->
        }@empty {
          Тут пока пусто
        }
      </div>
    </section>
  `,
  styleUrl: "./task.list.component.scss",
})

export class TaskListComponent {
  public taskService: TaskService = inject(TaskService);

  constructor(private router:Router, private route: ActivatedRoute){}
  public handleClick(id: number){
    this.router.navigate(['./', id], {relativeTo:this.route})
  }
  public handleEvent(id: number){
    this.taskService.removeTask(id)
  }
}
