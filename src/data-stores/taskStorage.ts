//taskStorage.ts
import { Task } from '../types';

const STORAGE_KEY = 'todo_app_tasks';

export function saveTasksToLocalStorage(tasks: Task[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error('Failed to save tasks to local storage:', error);
  }
}

export function getTasksFromLocalStorage(): Task[] {
  try {
    const tasksJson = localStorage.getItem(STORAGE_KEY);
    if (!tasksJson) return [];
    
    const parsedTasks = JSON.parse(tasksJson);
    
    // Convert date strings back to Date objects
    return parsedTasks.map((task: any) => ({
      ...task,
      dueDate: task.dueDate ? new Date(task.dueDate) : undefined,
      createdAt: new Date(task.createdAt),
      updatedAt: new Date(task.updatedAt)
    }));
  } catch (error) {
    console.error('Failed to load tasks from local storage:', error);
    return [];
  }
}
