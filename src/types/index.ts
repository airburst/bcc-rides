export type Ride = {
  group: string;
  destination: string;
  date: string;
  distance?: number;
  route?: string;
  leader?: string;
};

export type RidePartial = { id: string } & Ride;

export type DbResponse<T> = {
  data?: T[];
  error?: string;
  loading?: boolean;
};