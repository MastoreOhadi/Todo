// src/app/app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import {TodoListComponent} from "./todo-list/todo-list.component";
import {TodoItemComponent} from "./todo-item/todo-item.component";
import {LoginComponent} from "./login/login.component";
import {AuthGuard} from "./auth.guard";
import {RoleGuard} from "./role.guard";
import {AdminComponent} from "./admin/admin.component";
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi} from "@angular/common/http";
import {TokenInterceptor} from "./auth.interceptor";

export const appConfig: ApplicationConfig = {
  providers: [provideRouter([
    { path: 'login', component: LoginComponent },
    { path: 'todos', component: TodoListComponent, canActivate: [AuthGuard] },
    { path: '**', redirectTo: 'todos' },
    { path: 'admin', component: AdminComponent, canActivate: [RoleGuard] }

  ]),
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide:HTTP_INTERCEPTORS,
      useClass:TokenInterceptor,
      multi:true
    }]

};
