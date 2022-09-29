import { connect } from "@planetscale/database";

const config = {
  host: import.meta.env.VITE_DATABASE_HOST,
  username: import.meta.env.VITE_DATABASE_USERNAME,
  password: import.meta.env.VITE_DATABASE_PASSWORD,
};

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
    return this.fetch(
      "SELECT * FROM rides WHERE date <= ? ORDER BY date, distance desc",
      date
    );
  }
}

export default new PlanetScaleService();
