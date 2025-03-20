import React, { useEffect } from 'react';
import { AppRouter } from './routes/AppRouter';
import { useAuthCheck } from './hooks/useAuthCheck';
import { notificationWorkflows } from './workflows/notificationWorkflows';
import { taskWorkflows } from './workflows/taskWorkflows';

const App: React.FC = () => {
  const { isAuthenticated } = useAuthCheck();
  
  useEffect(() => {
    // Initialize app
    if (isAuthenticated) {
      // Initialize notifications
      notificationWorkflows.initializeNotifications();
      
      // Sync any pending tasks from offline mode
      if (navigator.onLine) {
        taskWorkflows.syncPendingTasks();
      }
      
      // Listen for online status to sync when connection returns
      const handleOnline = () => {
        taskWorkflows.syncPendingTasks();
      };
      
      window.addEventListener('online', handleOnline);
      
      return () => {
        window.removeEventListener('online', handleOnline);
      };
    }
  }, [isAuthenticated]);
  
  return <AppRouter />;
};

export default App;