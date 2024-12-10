// import { Injectable } from '@angular/core';
// import { Task } from "./app.interface";
// import { BaseTaskService } from "./base-task.service";
// import { AuthService } from "./auth.service";
//
// @Injectable({
//   providedIn: 'root'
// })
// export class TaskService <T> extends BaseTaskService<any>{
//   public tasks: Task[]=[];
//   public nextId: T;
//   public localStorageKey: string;
//   public initialId: T;
//   constructor(private authService: AuthService ,initialId: T, localStorageKey: string = 'tasks') {
//     super();
//     // super();
//     this.checkAuthentication();
//     this.loadTasksFromLocalStorage();
//     this.tasks = [];
//     this.nextId = initialId;
//     this.localStorageKey = localStorageKey;
//     this.initialId = initialId;
//   }
//
//   private checkAuthentication(): void {
//     if (!this.authService.isAuthenticated()) {
//       throw new Error('User is not authenticated');
//     }
//   }
//
//   protected loadTasksFromLocalStorage(): void {
//     const storedTasks = localStorage.getItem(this.localStorageKey);
//     if (storedTasks) {
//       this.tasks = JSON.parse(storedTasks);
//       this.nextId = this.tasks.length ? this.getNextId() : this.getInitialId();
//     }
//   }
//
//   private saveTasksToLocalStorage(): void {
//     localStorage.setItem(this.localStorageKey, JSON.stringify(this.tasks));
//   }
//
//   getTasks(filter: string = 'all'): Task[] {
//     switch (filter) {
//       case 'completed':
//         return this.tasks.filter(task => task.completed);
//       case 'pending':
//         return this.tasks.filter(task => !task.completed);
//       default:
//         return this.tasks;
//     }
//   }
//
//   addTask(title: string, description: string = ''): void {
//     const task: { description: string; id: T; completed: boolean; title: string } = {
//       id: this.nextId,
//       title: title,
//       description: description,
//       completed: false
//     };
//     if (task instanceof Task) {
//       this.tasks.push(task);
//     }
//     this.nextId = this.getNextId();
//     this.saveTasksToLocalStorage();
//   }
//
//   deleteTask(id: T): void {
//     this.tasks = this.tasks.filter(task => task.id !== id);
//     this.saveTasksToLocalStorage();
//   }
//
//   toggleTaskCompletion(id: T): void {
//     const task = this.tasks.find(task => task.id === id);
//     if (task) {
//       task.completed = !task.completed;
//       this.saveTasksToLocalStorage();
//     }
//   }
//
//   updateTask(id: T, title: string): void {
//     const task = this.tasks.find(task => task.id === id);
//     if (task) {
//       task.title = title;
//       this.saveTasksToLocalStorage();
//     }
//   }
//
//   // Utility methods
//   private getNextId(): T {
//     if (typeof this.nextId === 'number') {
//       return (this.nextId + 1) as T;
//     }
//     // Assuming a string ID scenario for simplicity
//     return (parseInt(this.nextId as unknown as string, 10) + 1).toString() as T;
//   }
//
//   private getInitialId(): T {
//     return typeof this.nextId === 'number' ? 1 as T : '1' as T;
//   }
// }
import {Inject, Injectable} from '@angular/core';
import { Task } from "./app.interface";
import { BaseTaskService } from "./base-task.service";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class TaskService extends BaseTaskService {

  constructor(private authService: AuthService,
              @Inject('initialId') initialId: number | string,
             @Inject('localStorageKey') localStorageKey: string = 'tasks',
              ) {
    super(initialId);
    this.localStorageKey = localStorageKey;
    this.checkAuthentication();
    this.loadTasksFromLocalStorage();
  }

  private checkAuthentication(): void {
    // if (!this.authService.isAuthenticated()) {
    //   throw new Error('User is not authenticated');
    // }
  }

  private getNextId(): number | string {
    if (typeof this.nextId === 'number') {
      return this.nextId + 1;
    } else {
      return (parseInt(this.nextId, 10) + 1).toString();
    }
  }

  private getInitialId(): number | string {
    return typeof this.initialId === 'number' ? 1 : '1';
  }
}
