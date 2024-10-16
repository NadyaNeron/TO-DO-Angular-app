import { Component, DestroyRef, OnInit, computed, inject, signal} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../task.service';
import { FormGroup, FormsModule } from '@angular/forms';
import { takeUntilDestroyed, toObservable} from '@angular/core/rxjs-interop';
import { debounceTime, skip } from 'rxjs';
import { TaskFormComponent, TaskWithoutId } from "../task-form/task.form.component";
import { Task } from '../tasks';

@Component({
  selector: 'app-task-details',
  standalone: true,
  imports: [FormsModule, TaskFormComponent],
  template: `
    <app-task-form [ngModel]="taskInput()" (ngModelChange)="onChangeTask($event)"></app-task-form>
    <div class="button-container">
      <button class="add-button" type="button" (click)="updateTask()">Добавить</button>
      <button class="remove-button" type="button"  (click)="removeTask()">Удалить</button>
    </div>
  `,
  styleUrl: `./task.details.component.scss`
})
export class TaskDetailsComponent implements OnInit{
  public taskService:TaskService = inject(TaskService)

  public task = signal<Task>({ id: -1, name: '', description: '' });

  public taskInput = computed(() => {
    const task = this.task();
    return {
      name: task.name,
      description: task.description
    }
  });

  private destroyRef = inject(DestroyRef)

  constructor(private route: ActivatedRoute, private router:Router) {}

  ngOnInit(): void {
    this.route.params
    .pipe(
      takeUntilDestroyed(this.destroyRef)
    )
    .subscribe((params)=> {
      const taskId = Number(params['id'])
      const task = this.taskService.getTaskById(taskId)
      if (!task){
        this.router.navigate(["/tasks"])
      }
      else{
        this.task.set(task);
      }
    })
  }

  public onChangeTask(e: TaskWithoutId){
    this.task.update((task) => ({
      ...task,
      description: e.description ?? '',
      name: e.name ?? '',
    }))
  }
  public removeTask(){
    this.taskService.removeTask(this.task().id)
    this.router.navigate(["/tasks"])
  }
  public updateTask(){
    const task = this.task();
    this.taskService.updateTask(task)
    this.router.navigate(["/tasks"])
  }
}
