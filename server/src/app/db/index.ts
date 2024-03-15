import { Pool } from 'pg';

export const initPool = () => new Pool({
  connectionString: process.env.DATABASE_URL,
});
