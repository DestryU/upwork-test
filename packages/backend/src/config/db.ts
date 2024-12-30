import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
});

export const connectDB = async () => {
  try {
    await pool.connect();
    console.log('🚀 PostgreSQL Connected Successfully!');
  } catch (error) {
    console.error('Error connecting to PostgreSQL:', error);
    process.exit(1);
  }
};

export default pool; 