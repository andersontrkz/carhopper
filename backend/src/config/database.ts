import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  dialect: 'postgres',
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: 5432,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  logging: console.log,
});

export default sequelize;
