import { useState } from 'react';
import { resumeApi } from '@/services/api/resume';
import { CreateResumeData, Resume } from '@/types/resume';

interface UseResumeCreate {
  isLoading: boolean;
  error: Error | null;
  createResume: (data: CreateResumeData) => Promise<Resume>;
}

export function useResumeCreate(): UseResumeCreate {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const createResume = async (data: CreateResumeData): Promise<Resume> => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await resumeApi.create(data);
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('An error occurred');
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    createResume,
  };
} 