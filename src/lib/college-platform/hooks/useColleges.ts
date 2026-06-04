'use client';

import { useState, useEffect, useMemo } from 'react';
import { College, FilterState, CollegeListResult } from '@/lib/college-platform/types';
import { MOCK_COLLEGES } from '@/lib/college-platform/data';
import { filterColleges } from '@/lib/college-platform/utils';
import { ITEMS_PER_PAGE } from '@/lib/college-platform/constants';

export function useColleges(filters: FilterState, page: number = 1) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Apply filters synchronously (derived state)
  const filtered = useMemo(() => filterColleges(MOCK_COLLEGES, filters), [filters]);

  // Paginate
  const total = filtered.length;
  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);
  const start = (page - 1) * ITEMS_PER_PAGE;
  const colleges = filtered.slice(start, start + ITEMS_PER_PAGE);

  // Simulate async loading
  useEffect(() => {
    setIsLoading(true);
    setError(null);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, [filters, page]);

  const result: CollegeListResult = { colleges, total, page, totalPages };

  return { ...result, isLoading, error };
}

export function useCollege(id: string): { college: College | null; isLoading: boolean } {
  const [isLoading, setIsLoading] = useState(true);

  const college = useMemo(() => MOCK_COLLEGES.find(c => c.id === id) ?? null, [id]);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, [id]);

  return { college, isLoading };
}

export function useAllColleges(): College[] {
  return MOCK_COLLEGES;
}
