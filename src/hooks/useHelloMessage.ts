import { useState } from 'react';
import { fetchHelloMessage } from '../services/api';

export const useHelloMessage = () => {
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const getGreeting = async (name: string) => {
    try {
      setLoading(true);
      setError(false);

      // API 呼び出し
      const result = await fetchHelloMessage(name);
      
      //messageをstateにセット
      setMessage(result);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return { message, error, loading, getGreeting };
};