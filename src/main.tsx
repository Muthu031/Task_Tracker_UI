import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './assets/styles/global.css';

// Initialize any global services or state
import { initializeFromStorage } from './integrations/authApi';

// Initialize authentication from stored credentials
initializeFromStorage();

const rootElement = document.getElementById('root');

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error("Failed to find the root element.");
}
