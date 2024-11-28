import { Sequelize } from "sequelize";
import { exec } from'child_process';

const env = process.env.NODE_ENV || 'development';

const database = new Sequelize({
  dialect: 'postgres',
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  port: 5432,
  database: process.env.DB_NAME || 'postgres',
  host: process.env.DB_HOST || 'database',
  logging: console.log,
});

database.authenticate()
  .then(() => {
    
    exec('npm run migrate', (error, stdout, stderr) => {
      if (error) {
        console.error(`Erro ao executar migrações: ${error}`);
        return;
      }
      console.log(`Migrações executadas com sucesso: ${stdout}`);

      exec('npm run seeder', (seedError, seedStdout, seedStderr) => {
        if (seedError) {
          console.error(`Erro ao executar seeder: ${seedError}`);
          return;
        }
        console.log(`Seeder executado com sucesso: ${seedStdout}`);
      });
    });
  }
  )
  
export default database;
