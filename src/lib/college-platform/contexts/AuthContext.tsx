'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { AuthContextType, User } from '@/lib/college-platform/types';
import { validateAuthForm } from '@/lib/college-platform/utils';

const AuthContext = createContext<AuthContextType | null>(null);

const STORAGE_KEY = 'college_platform_user';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const { valid, errors } = validateAuthForm(email, password);
    if (!valid) {
      return { success: false, error: Object.values(errors)[0] };
    }

    // Simulate network delay
    await new Promise(r => setTimeout(r, 800));

    // Demo mode: any valid email + password ≥ 6 chars logs in
    const mockUser: User = {
      id: `user_${email.split('@')[0]}`,
      name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
      email,
    };

    setUser(mockUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mockUser));
    return { success: true };
  }, []);

  const register = useCallback(async (name: string, email: string, password: string) => {
    const { valid, errors } = validateAuthForm(email, password, name);
    if (!valid) {
      return { success: false, error: Object.values(errors)[0] };
    }

    // Simulate network delay
    await new Promise(r => setTimeout(r, 1000));

    const mockUser: User = {
      id: `user_${Date.now()}`,
      name,
      email,
    };

    setUser(mockUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mockUser));
    return { success: true };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
    // Also clear saved colleges on logout
    localStorage.removeItem(`saved_colleges_${user?.id}`);
  }, [user?.id]);

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
