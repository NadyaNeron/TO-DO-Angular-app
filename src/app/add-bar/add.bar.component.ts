import { CommonModule } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { TaskService } from '../task.service';
import { FormGroup, FormsModule } from '@angular/forms';
import { TaskFormComponent } from "../task-form/task.form.component";
import { Task } from '../tasks';

@Component({
  selector: 'app-add-bar',
  standalone: true,
  imports: [CommonModule, FormsModule, TaskFormComponent],
  template: `
    <app-task-form 
      [(ngModel)]="taskInput"
      formGroupName="taskForm"
      [ngModelOptions]="{standalone: true}"
    ></app-task-form>
    <button class="add-button" type="button" (click)="addTask()">Добавить</button>
  `,
  styles: ``,
  styleUrl: "./add.bar.component.scss",
})
export class AddBarComponent {
  public taskService = inject(TaskService)
  public taskInput = signal({name: '', description:''})

  addTask(): void {
    this.taskService.addTask(this.taskInput().name,this.taskInput().description)
    this.taskInput.set({name:'', description:''})
  }
}
