import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

// Pages
import HomePage from './pages/HomePage';
import MovieDetailPage from './pages/MovieDetailPage';
import SearchPage from './pages/SearchPage';
import NotFoundPage from './pages/NotFoundPage';

// Auth Components
import AuthProvider from './components/auth/AuthProvider';
import ProtectedRoute from './components/auth/ProtectedRoute';

/**
 * App component - Main application component with routing setup
 */
function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}

/**
 * AppRoutes component - Contains all application routes
 */
const AppRoutes = () => {
  const { isLoading } = useAuth0();

  // Show loading spinner while Auth0 is initializing
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-netflix-black">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/movie/:id" element={<MovieDetailPage />} />
      <Route path="/search" element={<SearchPage />} />
      
      {/* Protected Routes - Require authentication */}
      <Route element={<ProtectedRoute />}>
        {/* Add protected routes here if needed */}
        {/* For example: <Route path="/favorites" element={<FavoritesPage />} /> */}
      </Route>
      
      {/* 404 Route */}
      <Route path="/404" element={<NotFoundPage />} />
      
      {/* Redirect any unknown routes to 404 */}
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
};

export default App;
