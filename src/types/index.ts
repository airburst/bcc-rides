export type Ride = {
  id?: string;
  type: string; // Enum sunday | paceline | event
  group: string;
  destination: string;
  date: string;
  distance?: number;
  route?: string;
  leader?: string;
  speed?: string;
};

export type DbResponse<T> = {
  data?: T[];
  error?: string;
  loading?: boolean;
};
