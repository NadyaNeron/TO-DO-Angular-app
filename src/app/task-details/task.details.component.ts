import { Component, WritableSignal, inject, input, signal } from '@angular/core';
import { Task } from '../tasks';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../task.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-details',
  standalone: true,
  imports: [FormsModule],
  template: `
      <div class="container">
        <div class="content">
          <form class="description">
            <textarea type="textarea" class="description-input" as="textarea" [(ngModel)]="this.task().description" [ngModelOptions]="{standalone: true}" ngDefaultControl></textarea>
          </form>
          <div class="delete-btn-container">
          <button class="delete-btn" (click)="removeTask()">X</button>  
          </div>
        </div>
      </div>
  `,
  styleUrl: `./task.details.component.scss`
})
export class TaskDetailsComponent {
  public task: WritableSignal<Task> = signal(
    {
        id: 0,
        description: "My task example"
    }
  )
  public taskService:TaskService = inject(TaskService)

  constructor(private route: ActivatedRoute, private router:Router) {
    const taskId = Number(this.route.snapshot.paramMap.get('id'))
    const task = this.taskService.getTaskById(taskId)
    if (!task){
      this.router.navigate(["/add-tasks"])
    }
    else{
      this.task.set(task)
    }
  }

  public removeTask(){
    const taskId = Number(this.route.snapshot.paramMap.get('id'))
    this.taskService.removeTask(taskId)
    this.router.navigate(["/add-tasks"])
  }
}
