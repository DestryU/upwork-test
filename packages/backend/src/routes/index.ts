import { Router } from 'express';
import resumeRoutes from './resume.routes';

const router = Router();

router.use('/resumes', resumeRoutes);

// Health check route
router.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

export default router; 