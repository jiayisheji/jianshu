import { registerAs } from '@nestjs/config';

export default registerAs('database', () => {
  const host = 'localhost';
  const port = 27017;
  const user = process.env.MONGO_USERNAME;
  const pass = process.env.MONGO_PASSWORD;
  const dbs = process.env.MONGO_DATABASE;

  return {
    host,
    port,
    user,
    pass,
    dbs,
    uri: `mongodb://${user}:${pass}@${host}:${port}/${dbs}`,
  };
});
