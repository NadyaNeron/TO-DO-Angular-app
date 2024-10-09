import {Component} from '@angular/core';
import { AddBarComponent } from "./add-bar/add.bar.component";
import { TaskListComponent } from "./task-list/task.list.component";
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AddBarComponent, TaskListComponent, RouterModule],
  template: `
    <main class="body">
      <router-outlet></router-outlet>
    </main>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'TO-DO-APP';
}
