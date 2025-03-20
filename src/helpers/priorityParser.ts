import { TaskPriority } from '../types';

export function getPriorityColor(priority: TaskPriority): string {
  switch (priority) {
    case TaskPriority.HIGH:
      return 'bg-red-500';
    case TaskPriority.MEDIUM:
      return 'bg-amber-500';
    case TaskPriority.LOW:
      return 'bg-green-500';
    default:
      return 'bg-gray-500';
  }
}

export function getPriorityIcon(priority: TaskPriority): string {
  switch (priority) {
    case TaskPriority.HIGH:
      return '⚠️';
    case TaskPriority.MEDIUM:
      return '⚡';
    case TaskPriority.LOW:
      return '✓';
    default:
      return '•';
  }
}

export function getPriorityLabel(priority: TaskPriority): string {
  return priority.charAt(0) + priority.slice(1).toLowerCase();
}