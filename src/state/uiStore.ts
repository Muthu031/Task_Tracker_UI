import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UIState } from '../types';

const initialState: UIState = {
  theme: 'system',
  sidebarOpen: true,
  currentModal: null,
  currentTaskId: null
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<'light' | 'dark' | 'system'>) => {
      state.theme = action.payload;
      localStorage.setItem('theme', action.payload);
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    openModal: (state, action: PayloadAction<{ type: 'newTask' | 'editTask' | 'settings', taskId?: string }>) => {
      state.currentModal = action.payload.type;
      state.currentTaskId = action.payload.taskId || null;
    },
    closeModal: (state) => {
      state.currentModal = null;
      state.currentTaskId = null;
    }
  }
});

export const { setTheme, toggleSidebar, openModal, closeModal } = uiSlice.actions;
export default uiSlice.reducer;

// src/state/index.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authStore';
import taskReducer from './taskStore';
import uiReducer from './uiStore';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: taskReducer,
    ui: uiReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;