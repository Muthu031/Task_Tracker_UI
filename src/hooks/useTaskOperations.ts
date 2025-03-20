import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { createTask, updateTask, deleteTask, toggleTaskStatus } from '../state/taskStore';
import { Task, TaskPriority, TaskStatus } from '../types';
import { AppDispatch } from '../state/uiStore';

export function useTaskOperations() {
  const dispatch = useDispatch<AppDispatch>();

  const addTask = useCallback((taskData: {
    title: string;
    description?: string;
    dueDate?: Date;
    priority: TaskPriority;
    categoryId?: string;
  }) => {
    return dispatch(createTask({
      ...taskData,
      status: TaskStatus.PENDING
    }));
  }, [dispatch]);

  const editTask = useCallback((taskId: string, updates: Partial<Task>) => {
    return dispatch(updateTask({ taskId, updates }));
  }, [dispatch]);

  const removeTask = useCallback((taskId: string) => {
    return dispatch(deleteTask(taskId));
  }, [dispatch]);

  const completeTask = useCallback((taskId: string) => {
    return dispatch(toggleTaskStatus(taskId));
  }, [dispatch]);

  return {
    addTask,
    editTask,
    removeTask,
    completeTask
  };
}
