import { useState, useEffect } from 'react';
import PlanetScaleService from './index';
import { Ride } from '../../types';

const changeKeyCase = (data: Record<string, any>[]): Ride[] => {
  return data.map((item) => {
    const cleaned: { [index: string]: any } = {};
    for (const key of Object.keys(item)) {
      if (key === 'ride_group') {
        cleaned['rideGroup'] = item['ride_group'];
      } else {
        cleaned[key] = item[key];
      }
    }
    return cleaned as Ride;
  });
};

export const useGetRides = (date: string) => {
  const [data, setData] = useState<Ride[] | undefined>([]);
  const [error, setError] = useState<string | undefined>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetch = async () => {
      const { data, error } = await PlanetScaleService.getNextRides(date);
      if (error) setError(error);
      // Transform ride_group to rideGroup
      const cleanData = changeKeyCase(data!);
      setData(cleanData as Ride[]);
      setLoading(false);
    };
    fetch();
  }, []);
  return { error, data, loading };
};
