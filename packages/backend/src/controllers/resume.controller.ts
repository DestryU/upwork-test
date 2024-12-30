import { Request, Response } from 'express';
import * as resumeService from '../services/resume.service';

export const getAllResumes = async (req: Request, res: Response) => {
  try {
    const resumes = await resumeService.getAllResumes();
    res.json(resumes);
  } catch (error) {
    console.error('Error fetching resumes:', error);
    res.status(500).json({ error: 'Failed to fetch resumes' });
  }
};

export const createResume = async (req: Request, res: Response) => {
  try {
    const newResume = await resumeService.createResume(req.body);
    res.status(201).json(newResume);
  } catch (error) {
    console.error('Error creating resume:', error);
    res.status(500).json({ error: 'Failed to create resume' });
  }
};

export const searchResumes = async (req: Request, res: Response) => {
  try {
    const { query } = req.query;
    if (!query || typeof query !== 'string') {
      return res.status(400).json({ message: 'Search query is required' });
    }

    const resumes = await resumeService.searchResumes(query);
    res.json(resumes);
  } catch (error) {
    res.status(500).json({ message: 'Failed to search resumes' });
  }
}; 