import React, { useEffect } from 'react';
import { TaskList } from '../components/modules/TaskList';
import { TodoForm } from '../components/modules/TodoForm';
import { FilterBar } from '../components/composites/FilterBar';
import { useTaskOperations } from '../hooks/useTaskOperations';
import { useAuthCheck } from '../hooks/useAuthCheck';

export const Dashboard: React.FC = () => {
  const { fetchTasks } = useTaskOperations();
  const { isAuthenticated, redirectToLogin } = useAuthCheck();
  
  useEffect(() => {
    if (!isAuthenticated) {
      redirectToLogin();
      return;
    }
    
    fetchTasks();
  }, [isAuthenticated, fetchTasks, redirectToLogin]);
  
  return (
    <div className="dashboard-container">
      <h1>My Tasks</h1>
      <TodoForm />
      <FilterBar />
      <TaskList />
    </div>
  );
};