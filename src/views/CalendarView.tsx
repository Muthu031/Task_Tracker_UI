import React, { useState, useEffect } from 'react';
import { TaskItem } from '../components/composites/TaskItem';
import { DatePicker } from '../components/elements/DatePicker';
import { useFilterTasks } from '../hooks/useFilterTasks';
import { useTaskOperations } from '../hooks/useTaskOperations';

export const CalendarView: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { fetchTasks } = useTaskOperations();
  const { filterTasksByDate } = useFilterTasks();
  const [filteredTasks, setFilteredTasks] = useState([]);
  
  useEffect(() => {
    fetchTasks().then(tasks => {
      const tasksForDate = filterTasksByDate(tasks, selectedDate);
      setFilteredTasks(tasksForDate);
    });
  }, [selectedDate, fetchTasks, filterTasksByDate]);
  
  return (
    <div className="calendar-view">
      <h1>Task Calendar</h1>
      <DatePicker 
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
      />
      <div className="tasks-for-day">
        <h2>Tasks for {selectedDate.toLocaleDateString()}</h2>
        {filteredTasks.length === 0 ? (
          <p>No tasks scheduled for this day</p>
        ) : (
          filteredTasks.map(task => (
            <TaskItem key={task.id} task={task} />
          ))
        )}
      </div>
    </div>
  );
};
