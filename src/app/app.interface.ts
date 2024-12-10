export class Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;


  constructor(id: number, title: string, description: string, completed: boolean = false) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.completed = completed;
  }

  // مثال: یک متد برای تغییر وضعیت کامل شدن تسک
  toggleCompletion(): void {
    this.completed = !this.completed;
  }
}
