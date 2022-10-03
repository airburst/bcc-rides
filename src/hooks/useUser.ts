import { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import PlanetScaleService from '../services/PlanetScaleService';
import { User } from '../types';

export const useUser = () => {
  const [userData, setUserData] = useState<User | null>(null);
  const [error, setError] = useState<string | undefined>();
  const { user: authUser } = useAuth0();

  useEffect(() => {
    const fetch = async () => {
      if (!authUser?.email) return;
      try {
        const { data, error } = await PlanetScaleService.getRiderId(authUser.email);
        if (error) setError(error);
        const { id, name } = data![0] || null;
        setUserData({ id, name, email: authUser.email } as User);
      } catch (err) {
        console.error(err);
        setError('Unable to fetch rider details');
      }
    };
    fetch();
  }, [authUser]);

  return { user: userData, error };
};
