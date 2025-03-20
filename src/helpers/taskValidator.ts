import { TaskPriority } from '../types';

interface ValidationResult {
  isValid: boolean;
  errors: {
    title?: string;
    dueDate?: string;
    priority?: string;
  };
}


export function validateTask(
    title: string,
    dueDate?: Date | null,
    priority: TaskPriority = TaskPriority.MEDIUM
  ): ValidationResult {
    const errors: ValidationResult['errors'] = {};
    
    // Validate title
    if (!title.trim()) {
      errors.title = 'Title is required';
    } else if (title.length > 100) {
      errors.title = 'Title cannot exceed 100 characters';
    }
    
    // Validate due date
    if (dueDate && isNaN(dueDate.getTime())) {
      errors.dueDate = 'Invalid date format';
    }
    
    // Validate priority
    if (!Object.values(TaskPriority).includes(priority)) {
      errors.priority = 'Invalid priority value';
    }
    
    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }
  