import React from 'react';
import { Auth0Provider } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

/**
 * Auth0 provider component that wraps the application
 * Handles authentication and redirects after login
 */
const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  // Callback to handle authentication completion
  const onRedirectCallback = (appState) => {
    // Redirect to the route the user was attempting to access before login
    // or to the home page if no prior route exists
    navigate(appState?.returnTo || '/');
  };

  // Get Auth0 configuration from environment variables
  const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
  const audience = import.meta.env.VITE_AUTH0_AUDIENCE;

  // If Auth0 configuration is missing, show a warning
  if (!domain || !clientId) {
    console.warn('Auth0 domain or client ID is missing. Authentication will not work properly.');
    return null;
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};

export default AuthProvider;
