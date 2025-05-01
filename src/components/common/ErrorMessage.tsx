import React from 'react';

interface ErrorMessageProps {
  message: string;
  retry?: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, retry }) => {
  return (
    <div className="error-container">
      <p className="error-message">{message}</p>
      {retry && (
        <button onClick={retry} className="retry-button">
          Retry
        </button>
      )}
    </div>
  );
};