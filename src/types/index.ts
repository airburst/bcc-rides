export type DbResponse<T> = {
  data?: T[];
  error?: string;
  loading?: boolean;
};

export type Ride = {
  id?: string;
  title: string; // Enum sunday | paceline | event
  rideGroup: string;
  date: string;
  destination?: string;
  distance?: number;
  route?: string;
  leader?: string;
  speed?: string;
};

// export type Group = {
//   title?: string;
//   rides?: Ride[];
// };

export type Group = {
  [date: string]: {
    [title: string]: Ride[];
  };
};

// export type GroupedData = {
//   date?: string;
//   types?: Group[];
//   // [date: string]: Group;
// }[];
