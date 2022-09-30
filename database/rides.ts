import DbService from './PlanetScaleService';
import ridesData from './seedRides.json' assert { type: 'json' };

const dropRidesSql = `DROP TABLE IF EXISTS rides`;

const createRidesSql = `CREATE TABLE rides (
  id SERIAL NOT NULL,
  title VARCHAR(255) NOT NULL,
  ride_group VARCHAR(255) NOT NULL,
  date DATETIME NOT NULL,
  destination VARCHAR(255),
  distance INT,
  route VARCHAR(255),
  speed INT,
  leader VARCHAR(255),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT rides_pkey PRIMARY KEY (id)
)`;

const seedRidesSql = ridesData.map((ride) => {
  const fields = Object.keys(ride).join(',').replace('rideGroup', 'ride_group');
  // Wrap strings in quotes
  const values = Object.values(ride)
    .map((field) => (typeof field === 'string' ? `'${field}'` : field))
    .join(',');

  return `INSERT INTO rides (${fields}) VALUES (${values})`;
});

export const createRides = async () => {
  await DbService.runSql(dropRidesSql);
  await DbService.runSql(createRidesSql);
  await seedRidesSql.map((seedUser) => DbService.runSql(seedUser));
};
