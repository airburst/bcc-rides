import DbService from '../PlanetScaleService';

// Drop tables in referential order
export const dropTables = async () => {
  await DbService.runSql('DROP TABLE IF EXISTS riders_to_rides');
  await DbService.runSql('DROP TABLE IF EXISTS riders');
  await DbService.runSql('DROP TABLE IF EXISTS rides');
};
