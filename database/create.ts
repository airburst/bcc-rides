import { createUsers } from "./users";

// Create database schema and seed
(async () => {
  try {
    await createUsers();
  } catch (err) {
    console.error(err);
  }
})();
