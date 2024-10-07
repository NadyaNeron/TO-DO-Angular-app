import {Component} from '@angular/core';
import { AddBarComponent } from "./add-bar/add-bar.component";
import { TaskListComponent } from "./task-list/task-list.component";
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AddBarComponent, TaskListComponent],
  template: `
    <main class="body">
      <header class="brand-name">
        MY TO-DO APP
      </header>
      <section class="content">
        <app-add-bar></app-add-bar>
        <app-task-list></app-task-list>
      </section>
    </main>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'TO-DO-APP';
}
