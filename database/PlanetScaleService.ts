import 'dotenv/config';
import { connect } from '@planetscale/database';

/**
 * This is a slim version of the larger class in src/services
 * Node requires process.env instead of vite variables and
 * only needs to run raw SQL.
 */
const config = {
  host: process.env.VITE_DATABASE_HOST,
  username: process.env.VITE_DATABASE_USERNAME,
  password: process.env.VITE_DATABASE_PASSWORD,
};
console.log('🚀 ~ file: PlanetScaleService.ts ~ line 14 ~ config', config);

class PlanetScaleService {
  conn;

  constructor() {
    this.conn = connect(config);
  }

  async runSql(rawSql: string, params?: any) {
    const results = await this.conn.execute(rawSql, [params]);
    return results;
  }
}

export default new PlanetScaleService();
