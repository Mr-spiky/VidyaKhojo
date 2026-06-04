'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useCompare } from '@/lib/college-platform/contexts/CompareContext';
import { PLATFORM_ROUTES } from '@/lib/college-platform/constants';
import { X, BarChart3, ArrowRight } from 'lucide-react';

export function CompareBar() {
  const { compareList, removeFromCompare, clearCompare } = useCompare();
  const router = useRouter();

  if (compareList.length === 0) return null;

  return (
    <div style={{
      position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 150,
      background: '#ffffff',
      borderTop: '1px solid #cbd5e1',
      padding: '12px 1.5rem',
      boxShadow: '0 -8px 25px rgba(0, 0, 0, 0.08)',
      animation: 'slideUp 0.25s ease-out',
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
        {/* Label */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#0b4c8c', flexShrink: 0 }}>
          <BarChart3 size={18} />
          <span style={{ fontSize: '0.9rem', fontWeight: 800 }}>Comparison Pool</span>
          <span style={{
            background: '#e28743', color: 'white',
            fontSize: '0.75rem', fontWeight: 800,
            width: '20px', height: '20px', borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            {compareList.length}
          </span>
        </div>

        {/* College Pills */}
        <div style={{ display: 'flex', gap: '8px', flex: 1, flexWrap: 'wrap' }}>
          {compareList.map(college => (
            <div
              key={college.id}
              style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                background: '#eff6ff',
                border: '1px solid #bfdbfe',
                borderRadius: '20px', padding: '4px 10px 4px 10px',
              }}
            >
              <span style={{ fontSize: '0.8rem', color: '#0b4c8c', fontWeight: 700 }}>
                {college.shortName || college.name.split(' ').slice(0, 3).join(' ')}
              </span>
              <button
                onClick={() => removeFromCompare(college.id)}
                style={{
                  border: 'none', background: 'none', cursor: 'pointer',
                  color: '#64748b', padding: 0, display: 'flex',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = '#ef4444')}
                onMouseLeave={e => (e.currentTarget.style.color = '#64748b')}
              >
                <X size={13} />
              </button>
            </div>
          ))}

          {/* Empty slots */}
          {Array.from({ length: 3 - compareList.length }).map((_, i) => (
            <div
              key={i}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                border: '1px dashed #cbd5e1',
                background: '#f8fafc',
                borderRadius: '20px', padding: '4px 14px',
                color: '#64748b', fontSize: '0.78rem', fontWeight: 500,
              }}
            >
              + Empty Slot
            </div>
          ))}
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
          <button
            onClick={clearCompare}
            style={{
              padding: '8px 16px', borderRadius: '20px', border: '1px solid #cbd5e1',
              background: '#ffffff', cursor: 'pointer', color: '#475569',
              fontSize: '0.85rem', fontWeight: 600, transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#fef2f2'; e.currentTarget.style.color = '#ef4444'; e.currentTarget.style.borderColor = '#fca5a5'; }}
            onMouseLeave={e => { e.currentTarget.style.background = '#ffffff'; e.currentTarget.style.color = '#475569'; e.currentTarget.style.borderColor = '#cbd5e1'; }}
          >
            Clear All
          </button>
          <button
            onClick={() => router.push(PLATFORM_ROUTES.compare)}
            disabled={compareList.length < 2}
            style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              padding: '8px 20px', borderRadius: '20px', border: 'none',
              cursor: compareList.length >= 2 ? 'pointer' : 'not-allowed',
              background: compareList.length >= 2 ? '#e28743' : '#e2e8f0',
              color: compareList.length >= 2 ? '#ffffff' : '#94a3b8',
              fontSize: '0.85rem', fontWeight: 700,
              boxShadow: compareList.length >= 2 ? '0 4px 12px rgba(226, 135, 67, 0.25)' : 'none',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => {
              if (compareList.length >= 2) {
                e.currentTarget.style.background = '#ca7030';
              }
            }}
            onMouseLeave={e => {
              if (compareList.length >= 2) {
                e.currentTarget.style.background = '#e28743';
              }
            }}
          >
            Compare Now
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
