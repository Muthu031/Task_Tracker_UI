import { API_URL } from '../ApiUrl';
import { Task  } from '../types';



export async function fetchTasks(): Promise<Task[]> {
  const response = await fetch(`${API_URL}/tasks`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });
  
  if (!response.ok) {
    throw new Error(`Error fetching tasks: ${response.statusText}`);
  }
  
  const data = await response.json();
  return data.map((task: any) => ({
    ...task,
    dueDate: task.dueDate ? new Date(task.dueDate) : undefined,
    createdAt: new Date(task.createdAt),
    updatedAt: new Date(task.updatedAt)
  }));
}

export async function createTask(task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Promise<Task> {
  const response = await fetch(`${API_URL}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify(task)
  });
  
  if (!response.ok) {
    throw new Error(`Error creating task: ${response.statusText}`);
  }
  
  const data = await response.json();
  return {
    ...data,
    dueDate: data.dueDate ? new Date(data.dueDate) : undefined,
    createdAt: new Date(data.createdAt),
    updatedAt: new Date(data.updatedAt)
  };
}

export async function updateTask(taskId: string, updates: Partial<Task>): Promise<Task> {
  const response = await fetch(`${API_URL}/tasks/${taskId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify(updates)
  });
  
  if (!response.ok) {
    throw new Error(`Error updating task: ${response.statusText}`);
  }
  
  const data = await response.json();
  return {
    ...data,
    dueDate: data.dueDate ? new Date(data.dueDate) : undefined,
    createdAt: new Date(data.createdAt),
    updatedAt: new Date(data.updatedAt)
  };
}

export async function deleteTask(taskId: string): Promise<void> {
  const response = await fetch(`${API_URL}/tasks/${taskId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });
  
  if (!response.ok) {
    throw new Error(`Error deleting task: ${response.statusText}`);
  }
}
