import DbService from './PlanetScaleService';
import ridersData from './seedRiders.json' assert { type: 'json' };

const dropRidersSql = `DROP TABLE IF EXISTS riders`;

const createRidersSql = `CREATE TABLE riders (
  id SERIAL NOT NULL,
  ride_id BIGINT UNSIGNED NOT NULL,
  name VARCHAR(255) NOT NULL,
  mobile VARCHAR(32),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT riders_pkey PRIMARY KEY (id),
  CONSTRAINT riders_rides_fkey FOREIGN KEY (ride_id) REFERENCES rides(id)
)`;

const seedRidersSql = ridersData.map((ride) => {
  const fields = Object.keys(ride).join(',').replace('rideId', 'ride_id');
  // Wrap strings in quotes
  const values = Object.values(ride)
    .map((field) => (typeof field === 'string' ? `'${field}'` : field))
    .join(',');

  return `INSERT INTO riders (${fields}) VALUES (${values})`;
});

export const createRiders = async () => {
  await DbService.runSql(dropRidersSql);
  await DbService.runSql(createRidersSql);
  await seedRidersSql.map((seedRider) => DbService.runSql(seedRider));
};
