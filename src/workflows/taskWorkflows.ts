// import { taskApi } from "../integrations/taskApi";
// import { saveTasksToLocalStorage} from "../data-stores/taskStorage";
// import { notificationWorkflows } from './notificationWorkflows';

// export const taskWorkflows = {
//   createTask: async (taskData: any) => {
//     try {
//       // Validate the task data
//       if (!taskData.title) {
//         throw new Error('Task title is required');
//       }
      
//       // Create the task online
//       const createdTask = await taskApi.createTask(taskData);
      
//       // Store locally for offline access
//       saveTasksToLocalStorage(createdTask);
      
//       // Schedule notifications if needed
//       if (createdTask.dueDate) {
//         notificationWorkflows.scheduleReminder(createdTask);
//       }
      
//       return createdTask;
//     } catch (error) {
//       // Store task locally for later sync
//       if (navigator.onLine === false) {
//         const tempId = `temp-${Date.now()}`;
//         const tempTask = { ...taskData, id: tempId, pendingSync: true };
//         saveTasksToLocalStorage(tempTask);
//         return tempTask;
//       }
//       throw error;
//     }
//   },
  
//   completeTask: async (taskId: any) => {
//     try {
//       // Update on server
//       const updatedTask = await taskApi.updateTask(taskId, { completed: true });
      
//       // Update locally
//       taskStorage.updateTask(taskId, { completed: true });
      
//       // Cancel any scheduled notifications
//       notificationWorkflows.cancelReminder(taskId);
      
//       return updatedTask;
//     } catch (error) {
//       // Mark for sync later if offline
//       if (navigator.onLine === false) {
//         taskStorage.updateTask(taskId, { 
//           completed: true,
//           pendingSync: true 
//         });
//         return { id: taskId, completed: true };
//       }
//       throw error;
//     }
//   },

//   deleteTask: async (taskId: any) => {
//     try {
//       // Delete from server
//       await taskApi.deleteTask(taskId);
      
//       // Delete locally
//       taskStorage.removeTask(taskId);
      
//       // Cancel any notifications
//       notificationWorkflows.cancelReminder(taskId);
      
//       return { success: true };
//     } catch (error) {
//       // Mark for deletion later if offline
//       if (navigator.onLine === false) {
//         taskStorage.updateTask(taskId, { 
//           pendingDelete: true,
//           pendingSync: true 
//         });
//         return { success: true };
//       }
//       throw error;
//     }
//   },
  
//   syncPendingTasks: async () => {
//     // Get all tasks pending sync
//     const pendingTasks = taskStorage.getPendingTasks();
    
//     for (const task of pendingTasks) {
//       try {
//         if (task.pendingDelete) {
//           await taskApi.deleteTask(task.id);
//           taskStorage.removeTask(task.id);
//         } else if (task.id.startsWith('temp-')) {
//           // New task created while offline
//           const { pendingSync, ...taskData } = task;
//           const createdTask = await taskApi.createTask(taskData);
//           taskStorage.removeTask(task.id);
//           taskStorage.addTask(createdTask);
//         } else {
//           // Update existing task
//           const { pendingSync, ...taskData } = task;
//           const updatedTask = await taskApi.updateTask(task.id, taskData);
//           taskStorage.updateTask(task.id, { ...updatedTask, pendingSync: false });
//         }
//       } catch (error) {
//         console.error(`Failed to sync task ${task.id}:`, error);
//       }
//     }
//   }
// };

import { Task } from '../types';
import * as TaskApi from "../integrations/taskApi"; // Fixed import
import * as taskStorage from "../data-stores/taskStorage"; // Fixed import
import { notificationWorkflows } from './notificationWorkflows';

export const taskWorkflows = {
  createTask: async (taskData: Partial<Task>) => {
    try {
      // Validate the task data
      if (!taskData.title) {
        throw new Error('Task title is required');
      }
      
      // Create the task online
      const createdTask = await TaskApi.createTask(taskData);
      
      // Store locally for offline access
      taskStorage.saveTasksToLocalStorage([
        ...taskStorage.getTasksFromLocalStorage(),
        createdTask
      ]);
      
      // Schedule notifications if needed
      if (createdTask.dueDate) {
        notificationWorkflows.scheduleReminder(createdTask);
      }
      
      return createdTask;
    } catch (error) {
      // Store task locally for later sync
      if (navigator.onLine === false) {
        const tempId = `temp-${Date.now()}`;
        const tempTask = { 
          ...taskData, 
          id: tempId, 
          pendingSync: true,
          createdAt: new Date(),
          updatedAt: new Date()
        } as Task;
        
        taskStorage.saveTasksToLocalStorage([
          ...taskStorage.getTasksFromLocalStorage(),
          tempTask
        ]);
        
        return tempTask;
      }
      throw error;
    }
  },
  
  completeTask: async (taskId: string) => {
    try {
      // Update on server
      const updatedTask = await TaskApi.updateTask(taskId, { completed: true });
      
      // Update locally
      const tasks = taskStorage.getTasksFromLocalStorage();
      const updatedTasks = tasks.map(task => 
        task.id === taskId ? { ...task, completed: true, updatedAt: new Date() } : task
      );
      taskStorage.saveTasksToLocalStorage(updatedTasks);
      
      // Cancel any scheduled notifications
      notificationWorkflows.cancelReminder(taskId);
      
      return updatedTask;
    } catch (error) {
      // Mark for sync later if offline
      if (navigator.onLine === false) {
        const tasks = taskStorage.getTasksFromLocalStorage();
        const updatedTasks = tasks.map(task => 
          task.id === taskId ? { 
            ...task, 
            completed: true, 
            pendingSync: true,
            updatedAt: new Date()
          } : task
        );
        taskStorage.saveTasksToLocalStorage(updatedTasks);
        return { id: taskId, completed: true };
      }
      throw error;
    }
  },

  deleteTask: async (taskId: string) => {
    try {
      // Delete from server
      await TaskApi.deleteTask(taskId);
      
      // Delete locally
      const tasks = taskStorage.getTasksFromLocalStorage();
      const filteredTasks = tasks.filter(task => task.id !== taskId);
      taskStorage.saveTasksToLocalStorage(filteredTasks);
      
      // Cancel any notifications
      notificationWorkflows.cancelReminder(taskId);
      
      return { success: true };
    } catch (error) {
      // Mark for deletion later if offline
      if (navigator.onLine === false) {
        const tasks = taskStorage.getTasksFromLocalStorage();
        const updatedTasks = tasks.map(task => 
          task.id === taskId ? { 
            ...task, 
            pendingDelete: true,
            pendingSync: true,
            updatedAt: new Date()
          } : task
        );
        taskStorage.saveTasksToLocalStorage(updatedTasks);
        return { success: true };
      }
      throw error;
    }
  },
  
  syncPendingTasks: async () => {
    // Get all tasks pending sync
    const allTasks = taskStorage.getTasksFromLocalStorage();
    const pendingTasks = allTasks.filter(task => task.pendingSync);
    
    for (const task of pendingTasks) {
      try {
        if (task.pendingDelete) {
          await TaskApi.deleteTask(task.id);
          const updatedTasks = allTasks.filter(t => t.id !== task.id);
          taskStorage.saveTasksToLocalStorage(updatedTasks);
        } else if (task.id.startsWith('temp-')) {
          // New task created while offline
          const { pendingSync, id, ...taskData } = task;
          const createdTask = await TaskApi.createTask(taskData);
          
          const updatedTasks = allTasks.filter(t => t.id !== task.id);
          updatedTasks.push(createdTask);
          taskStorage.saveTasksToLocalStorage(updatedTasks);
        } else {
          // Update existing task
          const { pendingSync, pendingDelete, ...taskData } = task;
          const updatedTask = await TaskApi.updateTask(task.id, taskData);
          
          const updatedTasks = allTasks.map((t: Task) => 
            t.id === task.id ? { ...updatedTask, pendingSync: false } : t
          );
          taskStorage.saveTasksToLocalStorage(updatedTasks);
        }
      } catch (error) {
        console.error(`Failed to sync task ${task.id}:`, error);
      }
    }
  }
};