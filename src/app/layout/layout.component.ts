import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterModule],
  template: `
    <div>
      <div class="header">
        <header class="brand-name">
          MY TO-DO APP
        </header>
        <nav>
          <a routerLink="/add-tasks" routerLinkActive="active" ariaCurrentWhenActive="page">Добавить задачу</a>
          <a routerLink="/tasks" routerLinkActive="active" ariaCurrentWhenActive="page">Задачи</a>
        </nav>
      <div>
      <section class="content">
        <router-outlet></router-outlet>
      </section>
    </div>
  `,
  styleUrl: `./layout.component.scss`
})
export class LayoutComponent {

}
