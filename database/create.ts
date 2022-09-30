import { createRides } from './rides';
import { createRiders } from './riders';

// Create database schema and seed
(async () => {
  try {
    await createRides();
    await createRiders();
  } catch (err) {
    console.error(err);
  }
})();
