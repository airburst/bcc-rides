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
  error?: string;
  data?: T[];
};
