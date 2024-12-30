import { apiClient } from './index';
import { CreateResumeData, Resume } from '@/types/resume';

export const resumeApi = {
  create: (data: CreateResumeData) => 
    apiClient<Resume>('/resumes', {
      method: 'POST',
      data,
    }),
  getAll: () =>
    apiClient<Resume[]>('/resumes', {
      method: 'GET',
    }),
  search: (query: string) =>
    apiClient<Resume[]>('/resumes/search', {
      method: 'GET',
      params: { query },
    }),
}; 