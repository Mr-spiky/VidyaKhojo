'use client';

import React from 'react';
import { College } from '@/lib/college-platform/types';
import { CollegeCard } from './CollegeCard';
import { SearchX } from 'lucide-react';

interface CollegeGridProps {
  colleges: College[];
  isLoading: boolean;
  onAuthRequired?: () => void;
}

function SkeletonCard() {
  return (
    <div style={{
      background: 'rgba(15, 15, 35, 0.8)',
      border: '1px solid rgba(99, 102, 241, 0.1)',
      borderRadius: '16px', overflow: 'hidden',
    }}>
      <div style={{ height: '3px', background: 'rgba(99, 102, 241, 0.1)' }} />
      <div style={{ padding: '1.25rem' }}>
        <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(99,102,241,0.1)', animation: 'pulse 1.5s infinite' }} />
          <div style={{ flex: 1 }}>
            <div style={{ height: '14px', borderRadius: '6px', background: 'rgba(99,102,241,0.1)', marginBottom: '8px', animation: 'pulse 1.5s infinite' }} />
            <div style={{ height: '10px', borderRadius: '6px', background: 'rgba(99,102,241,0.07)', width: '60%', animation: 'pulse 1.5s infinite' }} />
          </div>
        </div>
        <div style={{ display: 'flex', gap: '6px', marginBottom: '14px' }}>
          {[60, 80, 90].map(w => (
            <div key={w} style={{ height: '20px', width: `${w}px`, borderRadius: '5px', background: 'rgba(99,102,241,0.08)', animation: 'pulse 1.5s infinite' }} />
          ))}
        </div>
        <div style={{ height: '64px', borderRadius: '10px', background: 'rgba(99,102,241,0.06)', marginBottom: '16px', animation: 'pulse 1.5s infinite' }} />
        <div style={{ display: 'flex', gap: '8px' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(99,102,241,0.08)', animation: 'pulse 1.5s infinite' }} />
          <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(99,102,241,0.08)', animation: 'pulse 1.5s infinite' }} />
          <div style={{ flex: 1, height: '36px', borderRadius: '8px', background: 'rgba(99,102,241,0.08)', animation: 'pulse 1.5s infinite' }} />
        </div>
      </div>
      <style>{`@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }`}</style>
    </div>
  );
}

export function CollegeGrid({ colleges, isLoading, onAuthRequired }: CollegeGridProps) {
  if (isLoading) {
    return (
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '1.25rem',
      }}>
        {Array.from({ length: 9 }).map((_, i) => <SkeletonCard key={i} />)}
      </div>
    );
  }

  if (colleges.length === 0) {
    return (
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        padding: '5rem 2rem', textAlign: 'center',
      }}>
        <div style={{
          width: '80px', height: '80px', borderRadius: '20px',
          background: 'rgba(99, 102, 241, 0.1)', border: '1px solid rgba(99, 102, 241, 0.2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: '1.5rem',
        }}>
          <SearchX size={36} color="#6366f1" />
        </div>
        <h3 style={{ color: '#e2e8f0', fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>
          No colleges found
        </h3>
        <p style={{ color: '#64748b', fontSize: '0.95rem', maxWidth: '400px' }}>
          Try adjusting your filters or search term to find more colleges.
        </p>
      </div>
    );
  }

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
      gap: '1.25rem',
    }}>
      {colleges.map((college, i) => (
        <div
          key={college.id}
          style={{
            animation: `fadeInUp 0.4s ease ${i * 0.05}s both`,
          }}
        >
          <CollegeCard college={college} onAuthRequired={onAuthRequired} />
        </div>
      ))}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
