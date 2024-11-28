module.exports = {
  development: {
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "postgres",
    database: process.env.DB_NAME || "postgres",
    host: process.env.DB_HOST || "database",
    dialect: "postgres",
  },
  test: {
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "postgres",
    database: process.env.DB_NAME || "postgres",
    host: process.env.DB_HOST || "database",
    dialect: "postgres",
  },
  production: {
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "postgres",
    database: process.env.DB_NAME || "postgres",
    host: process.env.DB_HOST || "database",
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        ca: process.env.DB_SSL_CA || "path/to/ca-certificate.crt"
      }
    }
  }
};
