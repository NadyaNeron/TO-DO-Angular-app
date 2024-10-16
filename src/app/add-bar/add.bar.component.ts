import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { TaskService } from '../task.service';
import { FormGroup, FormsModule } from '@angular/forms';
import { TaskFormComponent } from "../task-form/task.form.component";

@Component({
  selector: 'app-add-bar',
  standalone: true,
  imports: [CommonModule, FormsModule, TaskFormComponent],
  template: `
    <app-task-form (save)="addTask($event)" [type]="'add'" formGroupName="taskForm" #taskForm></app-task-form>
  `,
  styles: ``,
  styleUrl: "./add.bar.component.scss",
})
export class AddBarComponent {
  public taskService = inject(TaskService)
  public description = signal("") 

  addTask(e:FormGroup): void {
    console.log(e.value)
    this.taskService.addTask(e.value)
    e.setValue({name:'', description:''})
  }
}
