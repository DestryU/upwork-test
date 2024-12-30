'use client';

import { useEffect } from 'react';
import { useResumes } from '@/hooks/useResumes';
import ResumeCard from '@/components/Card/ResumeCard';
import { Loader2 } from 'lucide-react';

export default function ResumesPage() {
  const { resumes, isLoading, error, fetchResumes } = useResumes();

  useEffect(() => {
    fetchResumes();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 py-8">
        Failed to load resumes. Please try again later.
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Byte-sized Resumes</h1>
      
      {resumes.length === 0 ? (
        <p className="text-center text-gray-500 py-8">
          No resumes found. Create your first resume!
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resumes.map((resume) => (
            <ResumeCard key={resume.id} resume={resume} />
          ))}
        </div>
      )}
    </div>
  );
} 