import { apiClient } from './index';
import { Resume } from '@/types/resume';

export type CreateResumeData = Omit<Resume, 'id' | 'createdAt' | 'updatedAt'>;

export const resumeApi = {
  create: (data: CreateResumeData) => 
    apiClient<Resume>('/resumes', {
      method: 'POST',
      data,
    }),
}; 