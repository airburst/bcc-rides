import "dotenv/config";
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

  async test() {
    const results = await this.conn.execute("select 1 from dual where 1=?", [
      1,
    ]);
    return results;
  }
}

export default new PlanetScaleService();
