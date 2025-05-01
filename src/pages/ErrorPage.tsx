import React from 'react';
import { useRouteError, Link } from 'react-router-dom';

export const ErrorPage: React.FC = () => {
  const error = useRouteError();
  
  // Extract error message
  const errorMessage = 
    error instanceof Error ? error.message : 
    typeof error === 'object' && error && 'statusText' in error ? String(error.statusText) : 
    'An unknown error occurred';

  return (
    <div className="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p className="error-message">
        <i>{errorMessage}</i>
      </p>
      <Link to="/" className="back-home-link">
        Back to Home
      </Link>
    </div>
  );
};