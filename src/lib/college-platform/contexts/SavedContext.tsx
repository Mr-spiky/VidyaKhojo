'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { SavedContextType } from '@/lib/college-platform/types';
import { useAuth } from './AuthContext';

const SavedContext = createContext<SavedContextType | null>(null);

export function SavedProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [savedColleges, setSavedColleges] = useState<string[]>([]);

  // Load saved colleges for the current user
  useEffect(() => {
    if (user) {
      const key = `saved_colleges_${user.id}`;
      const stored = localStorage.getItem(key);
      if (stored) {
        try {
          setSavedColleges(JSON.parse(stored));
        } catch {
          setSavedColleges([]);
        }
      }
    } else {
      setSavedColleges([]);
    }
  }, [user]);

  // Persist to localStorage whenever savedColleges changes
  useEffect(() => {
    if (user) {
      const key = `saved_colleges_${user.id}`;
      localStorage.setItem(key, JSON.stringify(savedColleges));
    }
  }, [savedColleges, user]);

  const saveCollege = useCallback((collegeId: string) => {
    setSavedColleges(prev => prev.includes(collegeId) ? prev : [...prev, collegeId]);
  }, []);

  const unsaveCollege = useCallback((collegeId: string) => {
    setSavedColleges(prev => prev.filter(id => id !== collegeId));
  }, []);

  const isSaved = useCallback((collegeId: string) => {
    return savedColleges.includes(collegeId);
  }, [savedColleges]);

  return (
    <SavedContext.Provider value={{ savedColleges, saveCollege, unsaveCollege, isSaved }}>
      {children}
    </SavedContext.Provider>
  );
}

export function useSaved() {
  const ctx = useContext(SavedContext);
  if (!ctx) throw new Error('useSaved must be used within SavedProvider');
  return ctx;
}
