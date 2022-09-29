import DbService from "./PlanetScaleService";
// Create database schema and seed

const dropUsersSql = `DROP TABLE IF EXISTS users`;

const createUsersSql = `CREATE TABLE users (
  id SERIAL NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT user_pkey PRIMARY KEY (id)
)`;

const seedUsers = [
  {
    firstName: "Mark",
    lastName: "Fairhurst",
    email: "mark@fairhursts.net",
    password: "password",
  },
  {
    firstName: "David",
    lastName: "Stoyle",
    email: "d@test.com",
    password: "password",
  },
];

const seedUsersSql = seedUsers.map(
  ({ firstName, lastName, email, password }) => `INSERT INTO users
(first_name, last_name, email, password)
VALUES ('${firstName}','${lastName}','${email}','${password}')`
);

export const createUsers = async () => {
  await DbService.runSql(dropUsersSql);
  await DbService.runSql(createUsersSql);
  await seedUsersSql.map((seedUser) => DbService.runSql(seedUser));
};
