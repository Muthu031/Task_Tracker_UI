import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../state/uiStore';
import { fetchTasks } from '../../state/taskStore';
import { openModal } from '../../state/uiStore';
import { useFilterTasks } from '../../hooks/useFilterTasks';
import { useTaskOperations } from '../../hooks/useTaskOperations';
import TaskItem from '../composites/TaskItem';
import FilterBar from '../composites/FilterBar';
import ActionButton from '../elements/ActionButton';

const TaskList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, error } = useSelector((state: RootState) => state.tasks);
  const filteredTasks = useFilterTasks();
  const { completeTask, removeTask } = useTaskOperations();
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  
  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);
  
  const handleEdit = (taskId: string) => {
    dispatch(openModal({ type: 'editTask', taskId }));
  };
  
  const handleDelete = (taskId: string) => {
    setDeleteConfirmId(taskId);
  };
  
  const confirmDelete = () => {
    if (deleteConfirmId) {
      removeTask(deleteConfirmId);
      setDeleteConfirmId(null);
    }
  };
  
  const cancelDelete = () => {
    setDeleteConfirmId(null);
  };
  
  if (isLoading && filteredTasks.length === 0) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-500">Loading tasks...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-md">
        <p className="text-red-700">Error: {error}</p>
        <button
          className="mt-2 text-sm text-red-600 underline"
          onClick={() => dispatch(fetchTasks())}
        >
          Try again
        </button>
      </div>
    );
  }
  
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900">
          Tasks ({filteredTasks.length})
        </h2>
        <ActionButton
          onClick={() => dispatch(openModal({ type: 'newTask' }))}
          icon={
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          }
          label="Add Task"
          variant="primary"
        />
      </div>
      
      <FilterBar />
      
      {filteredTasks.length === 0 ? (
        <div className="text-center py-12">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No tasks found</h3>
          <p className="mt-1 text-sm text-gray-500">
            Get started by creating a new task.
          </p>
          <div className="mt-6">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={() => dispatch(openModal({ type: 'newTask' }))}
            >
              <svg
                className="-ml-1 mr-2 h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              New Task
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          {filteredTasks.map((task : any) => (
            <TaskItem
              key={task.id}
              task={task}
              onComplete={completeTask}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
      
      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm mx-auto">
            <h3 className="text-lg font-medium text-gray-900 mb-3">Delete Task</h3>
            <p className="text-gray-500">
              Are you sure you want to delete this task? This action cannot be undone.
            </p>
            <div className="mt-4 flex justify-end space-x-3">
              <button
                type="button"
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={cancelDelete}
              >
                Cancel
              </button>
              <button
                type="button"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                onClick={confirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;