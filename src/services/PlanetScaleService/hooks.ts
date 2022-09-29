import { useState, useEffect } from "react";
import PlanetScaleService from "./index";
import { Ride } from "../../types";

export const useGetRides = (date: string) => {
  const [data, setData] = useState<Ride[] | undefined>([]);
  const [error, setError] = useState<string | undefined>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetch = async () => {
      const { data, error } = await PlanetScaleService.getNextRides(date);
      if (error) setError(error);
      setData(data as Ride[]);
      setLoading(false);
    };
    fetch();
  }, []);
  return { error, data, loading };
};
