import { useState, useEffect } from "react";
import FirestoreService from "./index";
import { Ride } from "../../types";

export const useGetRides = (year: string, type: string = "sunday") => {
  const [data, setData] = useState<Ride[] | undefined>([]);
  const [error, setError] = useState<string | undefined>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetch = async () => {
      const { data, error } = await FirestoreService.getRides(year, type);
      if (error) setError(error);
      setData(data);
      setLoading(false);
    };
    fetch();
  }, []);
  return { error, data, loading };
};
