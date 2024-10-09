import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-add-bar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="task-input-section">
      <form class="task-input-container">
        <input type="text" class="task-input" placeholder="Введите задачу..." (keydown.enter)="addTask(add, $event)" #add/>
        <button class="add-button" type="button" (click)="addTask(add, $event)">Добавить</button>
      </form>
    </section>
  `,
  styles: ``,
  styleUrl: "./add.bar.component.scss",
})
export class AddBarComponent {
  public taskService = inject(TaskService) 
  public addTask(add:HTMLInputElement, e:Event): void {
    e.preventDefault()
    if(add.value === "") return
    this.taskService.addTask(add.value)
    add.value = ""
  }
}
