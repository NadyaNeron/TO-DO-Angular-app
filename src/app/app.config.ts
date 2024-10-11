import {ApplicationConfig} from '@angular/core';
import { provideRouter } from '@angular/router';
import { Routes } from '@angular/router';
import { AddBarComponent } from './add-bar/add.bar.component';
import { TaskListComponent } from './task-list/task.list.component';
import { provideProtractorTestingSupport } from '@angular/platform-browser';
import { LayoutComponent } from './layout/layout.component';
import { TaskDetailsComponent } from './task-details/task.details.component';

const routes: Routes = [
  { path: '',   redirectTo: 'tasks', pathMatch: 'full' },
  { 
    path: 'tasks', 
    component: LayoutComponent, 
    children:[
      {
        path: '', 
        component: TaskListComponent 
      },
      {
        path: 'add-tasks',
        component: AddBarComponent
      },
      {
        path: ":id",
        component: TaskDetailsComponent
      }
    ] }
];

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideProtractorTestingSupport()]
};
