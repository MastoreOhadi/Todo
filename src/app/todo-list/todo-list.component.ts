import { Component, OnInit } from '@angular/core';
import { TaskService } from "../task.service";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { TodoItemComponent } from "../todo-item/todo-item.component";
import { Task } from "../app.interface";
import { MatListModule } from "@angular/material/list";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatListModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    TodoItemComponent
  ],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'] // Corrected to styleUrls
})
export class TodoListComponent implements OnInit {

  tasks: Task[] = []; // Specify the generic type
  filteredTasks: Task[] = [];
  newTaskTitle: string = '';
  newTaskDescription:string='';
  currentFilter: string = 'all';

  constructor(private route: ActivatedRoute, private taskService: TaskService) {}

  ngOnInit(): void {
    // const task = new Task(1, 'Finish project', 'Complete all remaining tasks', false);
    // this.tasks.push(task);
    this.refreshTasks();
  }

  refreshTasks(): void {
    this.tasks = this.taskService.getTasks(); // Fetch the tasks again to ensure up-to-date data
    this.applyFilter();
  }

  addTask(): void {
    if (this.newTaskTitle.trim()) {
      this.taskService.addTask(this.newTaskTitle,this.newTaskDescription);
      this.newTaskTitle = '';
      this.newTaskDescription='';
      this.refreshTasks(); // Refresh tasks after adding
    }
  }

  deleteTask(id: number): void {
    this.taskService.deleteTask(id);
    this.refreshTasks(); // Refresh tasks after deletion
  }

  toggleTaskCompletion(id: number): void {
    this.taskService.toggleTaskCompletion(id);
    this.refreshTasks(); // Refresh tasks after toggling completion
  }

  setFilter(filter: string): void {
    this.currentFilter = filter;
    this.applyFilter();
  }

  applyFilter(): void {
    if (this.currentFilter === 'all') {
      this.filteredTasks = this.tasks;
    } else if (this.currentFilter === 'completed') {
      this.filteredTasks = this.tasks.filter(task => task.completed);
    } else if (this.currentFilter === 'pending') {
      this.filteredTasks = this.tasks.filter(task => !task.completed);
    }
  }

  updateTask(updatedTask: Task): void {
    const index = this.tasks.findIndex(task => task.id === updatedTask.id);
    if (index !== -1) {
      this.tasks[index] = updatedTask;
      this.applyFilter(); // Update the filtered list
    }
  }
}
