import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import { runMigrations } from './config/migrations';
import routes from './routes';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', routes);

// Connect to Database and Start Server
const startServer = async () => {
  try {
    await connectDB();
    await runMigrations();
    app.listen(port, () => {
      console.log(`🌟 Server is running on port ${port}`);
    });
  } catch (error) {
    console.error('💥 Failed to start server:', error);
    process.exit(1);
  }
};

startServer(); 