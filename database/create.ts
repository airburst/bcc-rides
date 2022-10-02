import { dropTables, createRides, createRiders, createRidersToRides } from './schema';

// Create database schema and seed
(async () => {
  try {
    await dropTables();
    await createRides();
    await createRiders();
    await createRidersToRides();
  } catch (err) {
    console.error(err);
  }
})();
