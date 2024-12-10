import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {CommonModule} from "@angular/common";
import {TodoListComponent} from "./todo-list/todo-list.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule, TodoListComponent,FormsModule,ReactiveFormsModule,
    ],
  // template: '<app-todo-list></app-todo-list>',
  templateUrl:'app.component.html',
  styleUrl: './app.component.css',

})
export class AppComponent {
  title = 'todo-app';
}
