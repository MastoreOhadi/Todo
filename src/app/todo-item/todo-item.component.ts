import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from "@angular/common";
import { Task } from "../app.interface";
import { FormsModule } from "@angular/forms";
import { MatListModule } from "@angular/material/list";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import {TodoListComponent} from "../todo-list/todo-list.component";

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [CommonModule, FormsModule, MatListModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule,TodoListComponent],
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent {

  @Input() task!: Task; // علامت ! اضافه شده

  @Output() delete = new EventEmitter<number | string>();
  @Output() toggleCompletion = new EventEmitter<number | string>();
  @Output() updateTask = new EventEmitter<Task>();

  isEditing: boolean = false;
  editedTaskTitle: string = '';

  onEdit(): void {
    if (this.isEditing) {
      this.updateTask.emit(this.task);
    } else {
      this.editedTaskTitle = this.task.title;
    }
    this.isEditing = !this.isEditing;
  }

  onSaveEdit(): void {
    if (this.editedTaskTitle.trim()) {
      this.updateTask.emit(this.task);
      this.isEditing = false;
    }
  }

  onDelete(): void {
    this.delete.emit(this.task.id);
  }


  onToggleCompletion(): void {
    this.toggleCompletion.emit(this.task.id);
  }

  editTaskTitle(newTitle: string): void {
    if (newTitle.trim()) {
      // به‌روزرسانی وظیفه با عنوان جدید و ارسال آن به والد
      const updatedTask: Task = new Task(
        this.task.id,
       newTitle.trim(),
         this.task.description,  // اضافه کردن description
         this.task.completed
      );


      this.updateTask.emit(updatedTask);
    }

  }


}
