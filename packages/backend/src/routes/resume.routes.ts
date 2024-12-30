import { Router } from 'express';
import * as resumeController from '../controllers/resume.controller';

const router = Router();

// Routes will be added here later
router.get('/', resumeController.getAllResumes);
router.post('/', resumeController.createResume);
router.get('/search', resumeController.searchResumes.bind(resumeController));

export default router; 