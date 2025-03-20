import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../state/uiStore';
import { TaskPriority } from '../types';

export function useFilterTasks() {
  const { tasks, filterOptions } = useSelector((state: RootState) => state.tasks);

  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      // Filter by status
      if (filterOptions.status && task.status !== filterOptions.status) {
        return false;
      }

      // Filter by priority
      if (filterOptions.priority && task.priority !== filterOptions.priority) {
        return false;
      }

      // Filter by category
      if (filterOptions.categoryId && task.categoryId !== filterOptions.categoryId) {
        return false;
      }

      // Filter by date range
      if (filterOptions.dateFrom && task.dueDate && task.dueDate < filterOptions.dateFrom) {
        return false;
      }

      if (filterOptions.dateTo && task.dueDate && task.dueDate > filterOptions.dateTo) {
        return false;
      }

      // Filter by search term
      if (filterOptions.searchTerm && !task.title.toLowerCase().includes(filterOptions.searchTerm.toLowerCase())) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      const { sortBy, sortDirection } = filterOptions;
      const multiplier = sortDirection === 'asc' ? 1 : -1;

      if (sortBy === 'dueDate') {
        if (!a.dueDate && !b.dueDate) return 0;
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return multiplier * (a.dueDate.getTime() - b.dueDate.getTime());
      }

      if (sortBy === 'priority') {
        const priorityValues = { 
          [TaskPriority.HIGH]: 3, 
          [TaskPriority.MEDIUM]: 2, 
          [TaskPriority.LOW]: 1 
        };
        return multiplier * (priorityValues[b.priority] - priorityValues[a.priority]);
      }

      // Sort by createdAt
      return multiplier * (a.createdAt.getTime() - b.createdAt.getTime());
    });
  }, [tasks, filterOptions]);

  return filteredTasks;
}