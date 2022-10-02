import { connect } from '@planetscale/database';

const config = {
  host: import.meta.env.VITE_DATABASE_HOST,
  username: import.meta.env.VITE_DATABASE_USERNAME,
  password: import.meta.env.VITE_DATABASE_PASSWORD,
};

const getNextRidesSql = `select r.*,
(select count(*) from riders_to_rides rr WHERE rr.rideId = r.id) AS riderCount
from rides r
where date <= ?
order by date, distance desc, rideGroup`;

const getRidersForRideSql = `select r.name, r.mobile
from riders r inner join riders_to_rides rr on r.id = rr.riderId
where rr.rideId = ?
order by r.createdAt`;

class PlanetScaleService {
  conn;

  constructor() {
    this.conn = connect(config);
  }

  async fetch(rawSql: string, ...params: any[]) {
    try {
      const results = await this.conn.execute(rawSql, params);
      return { data: results?.rows };
    } catch (e: any) {
      console.error(e);
      return { error: e.message as string };
    }
  }

  // Queries
  getNextRides(date: string) {
    return this.fetch(getNextRidesSql, date);
  }

  getRidersForRide(rideId: string) {
    return this.fetch(getRidersForRideSql, rideId);
  }

  getRiderId(name: string) {
    return this.fetch('select id from riders where name = ?', name);
  }

  addRiderToRide(rideId: string, name: string, mobile?: string) {
    return this.fetch('insert into riders (name, mobile) values (?,?,?)', [rideId, name, mobile]);
  }
}

export default new PlanetScaleService();
