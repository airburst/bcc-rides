import DbService from '../PlanetScaleService';

const TABLE_NAME = 'riders_to_rides';

const createTableSql = `CREATE TABLE ${TABLE_NAME} (
  id SERIAL PRIMARY KEY NOT NULL,
  rideId BIGINT UNSIGNED NOT NULL,
  riderId BIGINT UNSIGNED NOT NULL,
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT rr_rides_fkey FOREIGN KEY (rideId) REFERENCES rides(id),
  CONSTRAINT rr_riders_fkey FOREIGN KEY (riderId) REFERENCES riders(id)
)`;

// We can't guarantee ids for rides or riders
const seedRidersSql = [
  `insert into ${TABLE_NAME} (rideId, riderId) values ((select id from rides where rideGroup = 'DE'), (select id from riders where name = 'David Stoyle'))`,
  `insert into ${TABLE_NAME} (rideId, riderId) values ((select id from rides where rideGroup = 'DE'), (select id from riders where name = 'Mark Fairhurst'))`,
  `insert into ${TABLE_NAME} (rideId, riderId) values ((select id from rides where rideGroup = 'DE'), (select id from riders where name = 'Pete Philips'))`,
  `insert into ${TABLE_NAME} (rideId, riderId) values ((select id from rides where rideGroup = 'E'), (select id from riders where name = 'Random Person'))`,
  `insert into ${TABLE_NAME} (rideId, riderId) values ((select id from rides where rideGroup = 'E'), (select id from riders where name = 'David Oliver'))`,
];

export const createRidersToRides = async () => {
  await DbService.runSql(createTableSql);
  await seedRidersSql.map((seedRider) => DbService.runSql(seedRider));
};
