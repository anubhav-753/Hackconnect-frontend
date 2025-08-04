// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Global styles
import App from './App';
import { AuthProvider } from './contexts/AuthContext'; // NEW: Import AuthProvider

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider> {/* NEW: Wrap App with AuthProvider */}
      <App />
    </AuthProvider>
  </React.StrictMode>
);