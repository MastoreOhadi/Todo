import { Task } from "./app.interface";
import {Injectable} from "@angular/core";

export class BaseTaskService {
  public tasks: Task[] = [];
  public nextId!: number | string;
  public localStorageKey: string = 'tasks';
  public initialId!: number | string;

  constructor(initialId: number | string) {
    this.initialId = initialId;
    this.nextId = this.initialId;
    this.loadTasksFromLocalStorage();
  }

  protected loadTasksFromLocalStorage(): void {
    const storedTasks = localStorage.getItem(this.localStorageKey);
    if (storedTasks) {
      this.tasks = JSON.parse(storedTasks);
      if (typeof this.nextId === 'number') {
        this.nextId = this.tasks.length
          ? Math.max(...this.tasks.map(task => task.id as number)) + 1
          : 1;
      }
    }
  }

  protected saveTasksToLocalStorage(): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.tasks));
  }

  getTasks(filter: string = 'all'): Task[] {
    switch (filter) {
      case 'completed':
        return this.tasks.filter(task => task.completed);
      case 'pending':
        return this.tasks.filter(task => !task.completed);
      default:
        return this.tasks;
    }
  }

  addTask(title: string, description: string = ''): void {
    const task: { description: string; id: number | string; completed: boolean; title: string } = {
      id: this.nextId,
      title: title,
      description: description,
      completed: false
    };
    if (task instanceof Task) {
      this.tasks.push(task);
    }
    this.updateNextId();
    this.saveTasksToLocalStorage();
  }

  deleteTask(id: number | string): void {
    this.tasks = this.tasks.filter(task => task.id !== id);
    this.saveTasksToLocalStorage();
  }

  toggleTaskCompletion(id: number | string): void {
    const task = this.tasks.find(task => task.id === id);
    if (task) {
      task.completed = !task.completed;
      this.saveTasksToLocalStorage();
    }
  }

  updateTask(id: number | string, title: string): void {
    const task = this.tasks.find(task => task.id === id);
    if (task) {
      task.title = title;
      this.saveTasksToLocalStorage();
    }
  }

  private updateNextId(): void {
    if (typeof this.nextId === 'number') {
      this.nextId += 1;
    } else {
      this.nextId = (parseInt(this.nextId, 10) + 1).toString();
    }
  }
}
