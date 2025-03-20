import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Task, TaskState, FilterOptions, TaskStatus } from '../types';
import * as taskApi from '../integrations/taskApi';

const initialFilterOptions: FilterOptions = {
  sortBy: 'dueDate',
  sortDirection: 'asc'
};

const initialState: TaskState = {
  tasks: [],
  isLoading: false,
  error: null,
  filterOptions: initialFilterOptions
};

export const fetchTasks = createAsyncThunk(
  'tasks/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await taskApi.fetchTasks();
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Failed to fetch tasks');
    }
  }
);

export const createTask = createAsyncThunk(
    'tasks/create',
    async (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>, { rejectWithValue }) => {
      try {
        return await taskApi.createTask(task);
      } catch (error) {
        if (error instanceof Error) {
          return rejectWithValue(error.message);
        }
        return rejectWithValue('Failed to create task');
      }
    }
  );
  
  export const updateTask = createAsyncThunk(
    'tasks/update',
    async ({ taskId, updates }: { taskId: string; updates: Partial<Task> }, { rejectWithValue }) => {
      try {
        return await taskApi.updateTask(taskId, updates);
      } catch (error) {
        if (error instanceof Error) {
          return rejectWithValue(error.message);
        }
        return rejectWithValue('Failed to update task');
      }
    }
  );
  
  export const deleteTask = createAsyncThunk(
    'tasks/delete',
    async (taskId: string, { rejectWithValue }) => {
      try {
        await taskApi.deleteTask(taskId);
        return taskId;
      } catch (error) {
        if (error instanceof Error) {
          return rejectWithValue(error.message);
        }
        return rejectWithValue('Failed to delete task');
      }
    }
  );
  
  export const toggleTaskStatus = createAsyncThunk(
    'tasks/toggleStatus',
    async (taskId: string, { getState, dispatch, rejectWithValue }) => {
      try {
        const state = getState() as { tasks: TaskState };
        const task = state.tasks.tasks.find(t => t.id === taskId);
        
        if (!task) {
          return rejectWithValue('Task not found');
        }
        
        const newStatus = task.status === TaskStatus.PENDING 
          ? TaskStatus.COMPLETED 
          : TaskStatus.PENDING;
        
        const result = await dispatch(updateTask({
          taskId,
          updates: { status: newStatus }
        }));
        
        return result.payload as Task;
      } catch (error) {
        if (error instanceof Error) {
          return rejectWithValue(error.message);
        }
        return rejectWithValue('Failed to toggle task status');
      }
    }
  );
  
  const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
      setFilterOptions: (state, action: PayloadAction<Partial<FilterOptions>>) => {
        state.filterOptions = { ...state.filterOptions, ...action.payload };
      },
      clearTaskErrors: (state) => {
        state.error = null;
      }
    },
    extraReducers: (builder) => {
      builder
        // Fetch tasks cases
        .addCase(fetchTasks.pending, (state) => {
          state.isLoading = true;
          state.error = null;
        })
        .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
          state.isLoading = false;
          state.tasks = action.payload;
        })
        .addCase(fetchTasks.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.payload as string;
        })
        
        // Create task cases
        .addCase(createTask.fulfilled, (state, action: PayloadAction<Task>) => {
          state.tasks.push(action.payload);
        })
        .addCase(createTask.rejected, (state, action) => {
          state.error = action.payload as string;
        })
        
        // Update task cases
        .addCase(updateTask.fulfilled, (state, action: PayloadAction<Task>) => {
          const index = state.tasks.findIndex(task => task.id === action.payload.id);
          if (index !== -1) {
            state.tasks[index] = action.payload;
          }
        })
        .addCase(updateTask.rejected, (state, action) => {
          state.error = action.payload as string;
        })
        
        // Delete task cases
        .addCase(deleteTask.fulfilled, (state, action: PayloadAction<string>) => {
          state.tasks = state.tasks.filter(task => task.id !== action.payload);
        })
        .addCase(deleteTask.rejected, (state, action) => {
          state.error = action.payload as string;
        });
    }
  });
  
  export const { setFilterOptions, clearTaskErrors } = taskSlice.actions;
  export default taskSlice.reducer;