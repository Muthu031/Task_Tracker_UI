import React, { useState, useEffect } from 'react';
import { Task, TaskPriority } from '../../types';
import { validateTask } from '../../helpers/taskValidator';
import DatePicker from '../elements/DatePicker';
import PriorityBadge from '../elements/PriorityBadge';

interface TodoFormProps {
  initialTask?: Task;
  onSubmit: (taskData: {
    title: string;
    description?: string;
    dueDate?: Date | null;
    priority: TaskPriority;
    categoryId?: string;
  }) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

const TodoForm: React.FC<TodoFormProps> = ({
  initialTask,
  onSubmit,
  onCancel,
  isSubmitting = false
}) => {
  const [title, setTitle] = useState(initialTask?.title || '');
  const [description, setDescription] = useState(initialTask?.description || '');
  const [dueDate, setDueDate] = useState<Date | null>(initialTask?.dueDate || null);
  const [priority, setPriority] = useState<TaskPriority>(initialTask?.priority || TaskPriority.MEDIUM);
  const [categoryId, setCategoryId] = useState<string | undefined>(initialTask?.categoryId);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const validation = validateTask(title, dueDate, priority);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }
    
    onSubmit({
      title,
      description: description || undefined,
      dueDate,
      priority,
      categoryId
    });
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={`block w-full rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
            errors.title ? 'border-red-300' : 'border-gray-300'
          }`}
          placeholder="What needs to be done?"
          required
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title}</p>
        )}
      </div>
      
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Add details about this task (optional)"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <DatePicker
          selectedDate={dueDate}
          onChange={setDueDate}
          error={errors.dueDate}
        />
        
        <div>
          <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
            Priority
          </label>
          <div className="mt-1 space-y-2">
            {Object.values(TaskPriority).map((p) => (
              <label key={p} className="inline-flex items-center mr-4 cursor-pointer">
                <input
                  type="radio"
                  name="priority"
                  value={p}
                  checked={priority === p}
                  onChange={() => setPriority(p)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                />
                <span className="ml-2">
                  <PriorityBadge priority={p} />
                </span>
              </label>
            ))}
          </div>
          {errors.priority && (
            <p className="mt-1 text-sm text-red-600">{errors.priority}</p>
          )}
        </div>
      </div>
      
      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          disabled={isSubmitting}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Saving...' : initialTask ? 'Update Task' : 'Add Task'}
        </button>
      </div>
    </form>
  );
};

export default TodoForm;