'use client';

import React from 'react';
import { AuthProvider } from '@/lib/college-platform/contexts/AuthContext';
import { CompareProvider } from '@/lib/college-platform/contexts/CompareContext';
import { SavedProvider } from '@/lib/college-platform/contexts/SavedContext';

export function CollegePlatformProviders({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <CompareProvider>
        <SavedProvider>
          {children}
        </SavedProvider>
      </CompareProvider>
    </AuthProvider>
  );
}
