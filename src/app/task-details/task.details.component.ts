import { Component, effect, inject, signal, untracked} from '@angular/core';
import { Task } from '../tasks';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../task.service';
import { FormsModule } from '@angular/forms';
import { toObservable, toSignal} from '@angular/core/rxjs-interop';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-task-details',
  standalone: true,
  imports: [FormsModule],
  template: `
      <div class="container">
        <div class="content">
          <div class="description">
            <textarea 
              type="textarea" 
              class="description-input" 
              as="textarea" 
              [(ngModel)]="description" 
              ngDefaultControl>
            </textarea>
          </div>
          <div class="delete-btn-container">
          <button class="delete-btn" (click)="removeTask()">X</button>  
          </div>
        </div>
      </div>
  `,
  styleUrl: `./task.details.component.scss`
})
export class TaskDetailsComponent {
  public taskService:TaskService = inject(TaskService)
  public description = signal("")
  public taskId = -1
  updatedDescription = toSignal(toObservable(this.description).pipe(debounceTime(100)));


  constructor(private route: ActivatedRoute, private router:Router) {
    this.taskId = Number(this.route.snapshot.paramMap.get('id'))
    const task = this.taskService.getTaskById(this.taskId)
    if (!task){
      this.router.navigate(["/add-tasks"])
    }
    else{
      this.description.set(task.description)
    }
    effect(() => {
      console.log("effected")
      const updatedDescription = this.updatedDescription()
      untracked(() => {
        this.setDescription(updatedDescription)
      })
    })
  }


  public removeTask(){
    const taskId = Number(this.route.snapshot.paramMap.get('id'))
    this.taskService.removeTask(taskId)
    this.router.navigate(["/tasks"])
  }
  public setDescription(description: string | undefined){
    if(!description) return;
    this.taskService.updateTask(this.taskId, description)
  }
}
