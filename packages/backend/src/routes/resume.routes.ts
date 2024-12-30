import { Router } from 'express';
import * as resumeController from '../controllers/resume.controller';

const router = Router();

// Routes will be added here later
router.get('/', resumeController.getAllResumes);
router.post('/', resumeController.createResume);

export default router; 