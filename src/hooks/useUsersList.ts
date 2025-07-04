import { useEffect, useState } from 'react';
import { fetchUsersList } from '../services/api';

type user = {
  id: number;
  name: string;
  email: string;
};

export const useUsersList = () => {
   const [users, setUsers] = useState<user[]>([]);
   const [error, setError] = useState<boolean>(false);

   useEffect(() => {
    fetchUsersList()
      .then(setUsers)
      .catch(() => setError(true));
   }, []);

  return { users, error };
};
