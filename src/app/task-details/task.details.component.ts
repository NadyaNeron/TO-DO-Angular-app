import { Component, DestroyRef, OnInit, inject, signal} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../task.service';
import { FormGroup, FormsModule } from '@angular/forms';
import { takeUntilDestroyed, toObservable} from '@angular/core/rxjs-interop';
import { debounceTime, skip } from 'rxjs';
import { TaskFormComponent } from "../task-form/task.form.component";

@Component({
  selector: 'app-task-details',
  standalone: true,
  imports: [FormsModule, TaskFormComponent],
  template: `
    <!-- <div class="content">
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
    </div> -->
    <app-task-form [type]="'edit'" (remove)="removeTask()" (save)="setDescription($event)"></app-task-form>
  `,
  styleUrl: `./task.details.component.scss`
})
export class TaskDetailsComponent implements OnInit{
  public taskService:TaskService = inject(TaskService)
  public description = signal("")
  public taskId!:number
  private destroyRef = inject(DestroyRef)


  constructor(private route: ActivatedRoute, private router:Router) {
    // toObservable(this.description)
    // .pipe(
    //   takeUntilDestroyed(this.destroyRef),
    //   skip(1),
    //   debounceTime(500)
    // )
    // .subscribe((description) =>  this.setDescription(description))

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
  public setDescription(e: FormGroup){
    this.taskService.updateTask({id:this.taskId, name:e.value.name, description:e.value.description})
    this.router.navigate(["/tasks"])
  }
}
