import { useState } from 'react';

export const useLoading = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleLoading = (state) => {
    setIsLoading(state);
  };
  const resetError = () => {
    setError(false);
  };
  const handleError = (error) => {
    if (error) setError(error);
    else setError('An error has happened, restart the page and try again');
  };
  return [isLoading, handleLoading, error, handleError, resetError];
};
