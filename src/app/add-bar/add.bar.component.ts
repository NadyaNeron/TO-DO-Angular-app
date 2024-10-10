import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { TaskService } from '../task.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section class="task-input-section">
      <form class="task-input-container" (ngSubmit)="addTask($event)">
        <input 
          type="text" 
          class="task-input" 
          placeholder="Введите задачу..." 
          [(ngModel)]="description" 
          [ngModelOptions]="{standalone: true}" 
        />
        <button class="add-button" type="button" (click)="addTask($event)">Добавить</button>
      </form>
    </section>
  `,
  styles: ``,
  styleUrl: "./add.bar.component.scss",
})
export class AddBarComponent {
  public taskService = inject(TaskService)
  public description = signal("") 
  public addTask(e:Event): void {
    e.preventDefault()
    if(this.description() === "") return
    this.taskService.addTask(this.description())
    this.description.set("")
  }
}
