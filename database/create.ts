import { createRides } from './rides';

// Create database schema and seed
(async () => {
  try {
    await createRides();
  } catch (err) {
    console.error(err);
  }
})();
