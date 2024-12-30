import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import { runMigrations } from './config/migrations';
import routes from './routes';

dotenv.config();

// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', routes);

// Initialize database connection
connectDB()
  .then(() => runMigrations())
  .then(() => {
    console.log('🎉 Database connected and migrations completed');
  })
  .catch((error) => {
    console.error('💥 Database initialization failed:', error);
  });

// Export app for Vercel
export default app; 