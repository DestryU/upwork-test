import { useState, useCallback } from 'react';
import { debounce } from 'lodash';
import { Resume } from '@/types/resume';
import { resumeApi } from '@/services/api/resume';

export function useSearchResumes(delay = 300) {
  const [searchResults, setSearchResults] = useState<Resume[] | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const debouncedSearch = useCallback(
    debounce(async (query: string) => {
      try {
        setIsSearching(true);
        setError(null);
        const results = await resumeApi.search(query);
        setSearchResults(results);
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Search failed');
        setError(error);
      } finally {
        setIsSearching(false);
      }
    }, delay),
    []
  );

  const handleSearch = useCallback((query: string) => {
    if (!query.trim()) {
      setSearchResults(null);
      return;
    }
    debouncedSearch(query);
  }, [debouncedSearch]);

  return {
    searchResults,
    isSearching,
    error,
    handleSearch,
  };
} 