import { Component, input, output } from '@angular/core';
import { Task } from '../tasks';
import {  RouterModule } from '@angular/router';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [RouterModule],
  template: `
    <div class="task-card">
      <p class="description-container">{{task().description}}</p>
      <button class="delete-task-btn" (click)="onDeleteButtonClick()">X</button>
    </div>
  `,
  styles: ``,
  styleUrl:"./task.card.component.scss"
})
export class TaskCardComponent{
  public task = input.required<Task>()
  public removeEvent = output<number>()
  onDeleteButtonClick() {
    this.removeEvent.emit(this.task().id)
  }

}
