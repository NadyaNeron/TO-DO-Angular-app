import { Component, inject, input } from '@angular/core';
import { Task } from '../tasks';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-details',
  standalone: true,
  imports: [],
  template: `
      <div class="container">
        <div class="description">
          {{task?task.description:""}}
        </div>
        <div class="delete-btn"></div>
      </div>
  `,
  styleUrl: `./task.details.component.scss`
})
export class TaskDetailsComponent {
  public task: Task|undefined
  public taskService:TaskService = inject(TaskService)

  constructor(private route: ActivatedRoute) {
    const taskId = Number(this.route.snapshot.paramMap.get('id'))
    this.task = this.taskService.getTaskById(taskId)
  }
}
