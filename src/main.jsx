import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

// Import global styles (includes Tailwind CSS directives)
import './index.css';

/**
 * Main entry point for the PlaywrongIA application
 * A Netflix-style movie catalog built with React, Vite, and modern web technologies
 */
const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
