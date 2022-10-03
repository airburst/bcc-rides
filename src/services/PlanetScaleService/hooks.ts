import { useState, useEffect } from 'react';
import PlanetScaleService from './index';
import { Ride, Riders } from '../../types';

export const useGetRides = (userId: string | null, date: string) => {
  const [data, setData] = useState<Ride[] | undefined>([]);
  const [error, setError] = useState<string | undefined>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetch = async () => {
      const { data, error } = await PlanetScaleService.getNextRides(userId, date);
      if (error) setError(error);
      // Transform ride_group to rideGroup
      setData(data as Ride[]);
      setLoading(false);
    };
    fetch();
  }, []);
  return { error, data, loading };
};

export const useGetRiders = (rideId: string) => {
  const [data, setData] = useState<Riders[] | undefined>([]);
  const [error, setError] = useState<string | undefined>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetch = async () => {
      const { data, error } = await PlanetScaleService.getRidersForRide(rideId);
      if (error) setError(error);
      setData(data as Riders[]);
      setLoading(false);
    };
    fetch();
  }, []);
  return { error, data, loading };
};
