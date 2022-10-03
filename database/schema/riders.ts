import DbService from '../PlanetScaleService';
import ridersData from '../seed/riders.json' assert { type: 'json' };

const TABLE_NAME = 'riders';

const createTableSql = `CREATE TABLE ${TABLE_NAME} (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  mobile VARCHAR(32),
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
)`;

const seedRidersSql = ridersData.map((ride) => {
  const fields = Object.keys(ride).join(',');
  // Wrap strings in quotes
  const values = Object.values(ride)
    .map((field) => (typeof field === 'string' ? `'${field}'` : field))
    .join(',');

  return `INSERT INTO riders (${fields}) VALUES (${values})`;
});

export const createRiders = async () => {
  await DbService.runSql(createTableSql);
  await seedRidersSql.map((seedRider) => DbService.runSql(seedRider));
};
