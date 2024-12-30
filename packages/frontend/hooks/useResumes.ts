import { useState } from 'react';
import { Resume } from '@/types/resume';
import { resumeApi } from '@/services/api/resume';

export function useResumes() {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchResumes = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await resumeApi.getAll();
      setResumes(data);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to fetch resumes');
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    resumes,
    isLoading,
    error,
    fetchResumes,
  };
} 