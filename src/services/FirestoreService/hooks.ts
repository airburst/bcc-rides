import { useState, useEffect } from "react";
import FirestoreService from "./index";
import { Ride } from "../../types";

export const useGetRides = (date: string) => {
  const [data, setData] = useState<Ride[] | undefined>([]);
  const [error, setError] = useState<string | undefined>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetch = async () => {
      const { data, error } = await FirestoreService.getRides(date);
      if (error) setError(error);
      setData(data);
      setLoading(false);
    };
    fetch();
  }, []);
  return { error, data, loading };
};

// export const useSeedRides = () => {
//   const [error, setError] = useState<string | undefined>();
//   const [done, setDone] = useState<boolean>(false);

//   useEffect(() => {
//     const fetch = async () => {
//       try {
//         await FirestoreService.seed();
//         setDone(true);
//       } catch (error) {
//         setError(JSON.stringify(error));
//       }
//     };
//     fetch();
//   }, []);
//   return { error, done };
// };
