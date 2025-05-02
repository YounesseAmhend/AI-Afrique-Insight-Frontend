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
    <div className="">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p className="">
        <i>{errorMessage}</i>
      </p>
      <Link to="/" className="">
        Back to Home
      </Link>
    </div>
  );
};