import React from 'react';
import { Task } from '../../types';
import { formatRelativeDate, isOverdue, getDueDateColor } from '../../helpers/dateHelpers';
import PriorityBadge from '../elements/PriorityBadge';
import ActionButton from '../elements/ActionButton';

interface TaskItemProps {
  task: Task;
  onComplete: (taskId: string) => void;
  onEdit: (taskId: string) => void;
  onDelete: (taskId: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onComplete,
  onEdit,
  onDelete
}) => {
  const isCompleted = task.status === 'COMPLETED';
  
  return (
    <div 
      className={`border rounded-lg shadow-sm p-4 mb-3 ${
        isCompleted ? 'bg-gray-50' : 'bg-white'
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          <button
            onClick={() => onComplete(task.id)}
            className={`mt-0.5 h-5 w-5 rounded-full border flex items-center justify-center ${
              isCompleted 
                ? 'bg-green-500 border-green-600 text-white' 
                : 'border-gray-300 hover:border-gray-400'
            }`}
            aria-label={isCompleted ? 'Mark as incomplete' : 'Mark as complete'}
          >
            {isCompleted && (
              <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.5 6L5.5 8L8.5 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </button>
          
          <div>
            <h3 className={`text-base font-medium ${
              isCompleted ? 'text-gray-500 line-through' : 'text-gray-900'
            }`}>
              {task.title}
            </h3>
            
            {task.description && (
              <p className={`mt-1 text-sm ${
                isCompleted ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {task.description}
              </p>
            )}
            
            <div className="mt-2 flex items-center space-x-4">
              <PriorityBadge priority={task.priority} size="sm" />
              
              {task.dueDate && (
                <span className={`text-xs ${getDueDateColor(task.dueDate)}`}>
                  {formatRelativeDate(task.dueDate)}
                  {isOverdue(task.dueDate) && !isCompleted && ' (Overdue)'}
                </span>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <ActionButton
            onClick={() => onEdit(task.id)}
            icon={
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            }
            label="Edit"
            variant="secondary"
          />
          
          <ActionButton
            onClick={() => onDelete(task.id)}
            icon={
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            }
            label="Delete"
            variant="danger"
          />
        </div>
      </div>
    </div>
  );
};

export default TaskItem;