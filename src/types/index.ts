// src/types/index.ts
export enum TaskPriority {
    HIGH = "HIGH",
    MEDIUM = "MEDIUM",
    LOW = "LOW"
  }
  
  export enum TaskStatus {
    PENDING = "PENDING",
    COMPLETED = "COMPLETED"
  }
  
  export interface Task {
    [x: string]: any;
    pendingSync: unknown;
    id: string;
    title: string;
    description?: string;
    dueDate?: Date;
    priority: TaskPriority;
    status: TaskStatus;
    categoryId?: string;
    createdAt: Date;
    updatedAt: Date;
    completed?:boolean;
  }
  
  export interface Category {
    id: string;
    name: string;
    color: string;
  }
  
  export interface User {
    id: string;
    name: string;
    email: string;
    preferences: UserPreferences;
  }
  
  export interface UserPreferences {
    defaultView: 'list' | 'calendar';
    defaultPriority: TaskPriority;
    defaultSortBy: 'dueDate' | 'priority' | 'createdAt';
    theme: 'light' | 'dark' | 'system';
  }
  
  export interface FilterOptions {
    status?: TaskStatus;
    priority?: TaskPriority;
    categoryId?: string;
    searchTerm?: string;
    dateFrom?: Date;
    dateTo?: Date;
    sortBy: 'dueDate' | 'priority' | 'createdAt';
    sortDirection: 'asc' | 'desc';
  }
  
  export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
  }
  
  export interface TaskState {
    tasks: Task[];
    isLoading: boolean;
    error: string | null;
    filterOptions: FilterOptions;
  }
  
  export interface UIState {
    theme: 'light' | 'dark' | 'system';
    sidebarOpen: boolean;
    currentModal: 'newTask' | 'editTask' | 'settings' | null;
    currentTaskId: string | null;
  }