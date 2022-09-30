import { connect } from '@planetscale/database';

const config = {
  host: import.meta.env.VITE_DATABASE_HOST,
  username: import.meta.env.VITE_DATABASE_USERNAME,
  password: import.meta.env.VITE_DATABASE_PASSWORD,
};

const getNextRidesSql = `SELECT r.*,
(SELECT COUNT(*) FROM riders rs WHERE rs.ride_id = r.id) AS riderCount
FROM rides r
WHERE date <= ?
ORDER BY date, distance desc, ride_group`;

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
    return this.fetch('select name, mobile from riders where ride_id = ?', rideId);
  }
}

export default new PlanetScaleService();
