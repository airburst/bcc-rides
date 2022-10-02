import DbService from '../PlanetScaleService';
import ridesData from '../seed/rides.json' assert { type: 'json' };

const TABLE_NAME = 'rides';

const createTableSql = `CREATE TABLE ${TABLE_NAME} (
  id SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR(255) NOT NULL,
  rideGroup VARCHAR(255) NOT NULL,
  date DATETIME NOT NULL,
  destination VARCHAR(255),
  distance INT,
  route VARCHAR(255),
  speed INT,
  leader VARCHAR(255),
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
)`;

const seedRidesSql = ridesData.map((ride) => {
  const fields = Object.keys(ride).join(',');
  // Wrap strings in quotes
  const values = Object.values(ride)
    .map((field) => (typeof field === 'string' ? `'${field}'` : field))
    .join(',');

  return `INSERT INTO ${TABLE_NAME} (${fields}) VALUES (${values})`;
});

export const createRides = async () => {
  await DbService.runSql(createTableSql);
  await seedRidesSql.map((seedUser) => DbService.runSql(seedUser));
};
