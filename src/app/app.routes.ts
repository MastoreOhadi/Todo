import { Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {TodoListComponent} from "./todo-list/todo-list.component";
import {AuthGuard} from "./auth.guard";
import {AdminComponent} from "./admin/admin.component";
import {RoleGuard} from "./role.guard";
import {DashboardComponent} from "./dashboard/dashboard.component";

export const routes: Routes = [

  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'todos', component: TodoListComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'todos' },
  { path: 'admin', component: AdminComponent, canActivate: [RoleGuard] }

];
