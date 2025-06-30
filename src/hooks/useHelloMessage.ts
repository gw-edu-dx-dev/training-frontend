import { useEffect, useState } from 'react';
import { fetchHelloMessage } from '../services/api';

export const useHelloMessage = () => {
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    fetchHelloMessage()
      .then(setMessage)
      .catch(() => setError(true));
  }, []);

  return { message, error };
};
