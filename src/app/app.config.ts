import {ApplicationConfig} from '@angular/core';
import { provideRouter } from '@angular/router';
import { Routes } from '@angular/router';
import { AddBarComponent } from './add-bar/add.bar.component';
import { TaskListComponent } from './task-list/task.list.component';
import { provideProtractorTestingSupport } from '@angular/platform-browser';
import { LayoutComponent } from './layout/layout.component';
import { TaskDetailsComponent } from './task-details/task.details.component';

const routes: Routes = [
  { path: 'add-tasks', component: LayoutComponent, children:[{path: '', component: AddBarComponent }], },
  { path: 'tasks', component: LayoutComponent, children:[{path: '', component: TaskListComponent }] },
  { path: 'task/:id', component: LayoutComponent, children:[{path: '', component: TaskDetailsComponent}]},
  { path: '',   redirectTo: '/add-tasks', pathMatch: 'full' },
];

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideProtractorTestingSupport()]
};
