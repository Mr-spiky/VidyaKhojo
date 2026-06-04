'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { CompareContextType, College } from '@/lib/college-platform/types';

const CompareContext = createContext<CompareContextType | null>(null);

export function CompareProvider({ children }: { children: React.ReactNode }) {
  const [compareList, setCompareList] = useState<College[]>([]);

  const addToCompare = useCallback((college: College): boolean => {
    if (compareList.length >= 3) return false;
    if (compareList.find(c => c.id === college.id)) return true;
    setCompareList(prev => [...prev, college]);
    return true;
  }, [compareList]);

  const removeFromCompare = useCallback((collegeId: string) => {
    setCompareList(prev => prev.filter(c => c.id !== collegeId));
  }, []);

  const clearCompare = useCallback(() => {
    setCompareList([]);
  }, []);

  const isInCompare = useCallback((collegeId: string) => {
    return compareList.some(c => c.id === collegeId);
  }, [compareList]);

  return (
    <CompareContext.Provider value={{ compareList, addToCompare, removeFromCompare, clearCompare, isInCompare }}>
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  const ctx = useContext(CompareContext);
  if (!ctx) throw new Error('useCompare must be used within CompareProvider');
  return ctx;
}
