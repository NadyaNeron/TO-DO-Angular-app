import { Component, DestroyRef, OnInit, inject, signal} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../task.service';
import { FormsModule } from '@angular/forms';
import { takeUntilDestroyed, toObservable, toSignal} from '@angular/core/rxjs-interop';
import { debounceTime, skip } from 'rxjs';

@Component({
  selector: 'app-task-details',
  standalone: true,
  imports: [FormsModule],
  template: `
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
  `,
  styleUrl: `./task.details.component.scss`
})
export class TaskDetailsComponent implements OnInit{
  public taskService:TaskService = inject(TaskService)
  public description = signal("")
  public taskId!:number
  private destroyRef = inject(DestroyRef)


  constructor(private route: ActivatedRoute, private router:Router) {
    toObservable(this.description)
    .pipe(
      takeUntilDestroyed(this.destroyRef),
      skip(1),
      debounceTime(500)
    )
    .subscribe((description) =>  this.setDescription(description))

  }

  ngOnInit(): void {
    this.route.params
    .pipe(
      takeUntilDestroyed(this.destroyRef)
    )
    .subscribe((params)=> {
      this.taskId = Number(params['id'])
      const task = this.taskService.getTaskById(this.taskId)
      if (!task){
        this.router.navigate(["/tasks"])
      }
      else{
        this.description.set(task.description)
      }
    })
  }


  public removeTask(){
    this.taskService.removeTask(this.taskId)
    this.router.navigate(["/tasks"])
  }
  public setDescription(description: string | undefined){
    if(!description) return;
    this.taskService.updateTask(this.taskId, description)
  }
}
