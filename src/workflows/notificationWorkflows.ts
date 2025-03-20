
export const notificationWorkflows = {
  scheduleReminder: async (task :any) => {
    // Get user preferences
    const userPrefs = await userApi.getUserPreferences();
    
    if (!userPrefs.emailNotifications) {
      return;
    }
    
    // Schedule local notification
    if ("Notification" in window && Notification.permission === "granted") {
      const dueDate = new Date(task.dueDate);
      const now = new Date();
      
      // Calculate time until due (minus 1 hour for reminder)
      const timeUntilDue = dueDate.getTime() - now.getTime() - (60 * 60 * 1000);
      
      if (timeUntilDue > 0) {
        const notificationId = setTimeout(() => {
          new Notification("Task Reminder", {
            body: `Your task "${task.title}" is due in 1 hour!`
          });
        }, timeUntilDue);
        
        // Store notification ID for potential cancellation
        taskStorage.updateTask(task.id, {
          notificationId: notificationId.toString()
        });
      }
    }
    
    // Schedule server-side notification (email)
    await userApi.scheduleReminder({
      taskId: task.id,
      userId: userPrefs.userId,
      reminderTime: new Date(new Date(task.dueDate).getTime() - (60 * 60 * 1000))
    });
  },
  
  cancelReminder: async (taskId : any) => {
    // Cancel local notification
    const task = taskStorage.getTask(taskId);
    if (task && task.notificationId) {
      clearTimeout(parseInt(task.notificationId, 10));
      taskStorage.updateTask(taskId, { notificationId: null });
    }
    
    // Cancel server-side notification
    try {
      await userApi.cancelReminder(taskId);
    } catch (error) {
      console.error("Failed to cancel server reminder:", error);
    }
  },
  
  initializeNotifications: async () => {
    // Request notification permissions
    if ("Notification" in window && Notification.permission !== "granted") {
      await Notification.requestPermission();
    }
    
    // Re-schedule notifications for existing tasks
    const tasks = taskStorage.getAllTasks();
    const incompleteTasks = tasks.filter((task: { completed: any; dueDate: string | number | Date; }) => 
      !task.completed && task.dueDate && new Date(task.dueDate) > new Date()
    );
    
    for (const task of incompleteTasks) {
      await notificationWorkflows.scheduleReminder(task);
    }
  }
};