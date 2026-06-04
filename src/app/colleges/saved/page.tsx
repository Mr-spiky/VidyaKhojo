'use client';

import React from 'react';
import Link from 'next/link';
import { useSaved } from '@/lib/college-platform/contexts/SavedContext';
import { useAuth } from '@/lib/college-platform/contexts/AuthContext';
import { MOCK_COLLEGES } from '@/lib/college-platform/data';
import { PLATFORM_ROUTES } from '@/lib/college-platform/constants';
import { CollegeGrid } from '@/components/college-platform/colleges/CollegeGrid';
import { BookmarkCheck, ArrowRight, LogIn } from 'lucide-react';

export default function SavedPage() {
  const { user } = useAuth();
  const { savedColleges } = useSaved();

  // Not logged in UI
  if (!user) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', background: '#f8fafc' }}>
        <div style={{ textAlign: 'center', maxWidth: '420px' }}>
          <div style={{
            width: '80px', height: '80px', borderRadius: '20px',
            background: '#eff6ff', border: '1px solid #bfdbfe',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 1.5rem',
            boxShadow: '0 4px 10px rgba(11, 76, 140, 0.1)',
          }}>
            <LogIn size={36} color="#0b4c8c" />
          </div>
          <h2 style={{ color: '#0f172a', fontSize: '1.4rem', fontWeight: 800, marginBottom: '10px' }}>
            Sign in to view shortlist
          </h2>
          <p style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '2rem', lineHeight: 1.6 }}>
            Create a free account and start building your personalized college shortlist and compare criteria.
          </p>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
            <Link href={PLATFORM_ROUTES.login} style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '11px 24px', borderRadius: '30px', textDecoration: 'none',
              background: '#0b4c8c',
              color: 'white', fontSize: '0.9rem', fontWeight: 700,
              boxShadow: '0 4px 12px rgba(11, 76, 140, 0.2)',
            }}>
              Sign In
            </Link>
            <Link href={PLATFORM_ROUTES.register} style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '11px 24px', borderRadius: '30px', textDecoration: 'none',
              border: '1px solid #cbd5e1',
              background: '#ffffff',
              color: '#475569', fontSize: '0.9rem', fontWeight: 700,
              boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)',
            }}>
              Register
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const savedList = MOCK_COLLEGES.filter(c => savedColleges.includes(c.id));

  return (
    <div style={{ minHeight: '100vh', padding: '2.5rem 1.5rem 6rem', background: '#f8fafc' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <div style={{
                width: '38px', height: '38px', borderRadius: '10px',
                background: 'linear-gradient(135deg, #0b4c8c 0%, #1e40af 100%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 4px 10px rgba(11, 76, 140, 0.15)',
              }}>
                <BookmarkCheck size={20} color="white" />
              </div>
              <h1 style={{
                fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.02em',
                color: '#0f172a',
              }}>
                Shortlisted Colleges
              </h1>
            </div>
            <p style={{ color: '#475569', fontSize: '0.9rem', fontWeight: 500, margin: 0 }}>
              {savedList.length > 0
                ? `You have saved ${savedList.length} college${savedList.length > 1 ? 's' : ''} to your shortlist, ${user.name.split(' ')[0]}.`
                : `Welcome, ${user.name.split(' ')[0]}! Save colleges to shortlist them.`}
            </p>
          </div>
          {savedList.length > 0 && (
            <Link href={PLATFORM_ROUTES.list} style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              padding: '9px 18px', borderRadius: '20px', textDecoration: 'none',
              border: '1px solid #cbd5e1',
              background: '#ffffff', color: '#0b4c8c',
              fontSize: '0.85rem', fontWeight: 750,
            }}>
              Explore More <ArrowRight size={15} />
            </Link>
          )}
        </div>

        {savedList.length === 0 ? (
          <div style={{
            textAlign: 'center', padding: '4.5rem 2rem',
            background: '#ffffff', borderRadius: '16px',
            border: '1px dashed #cbd5e1',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.01)',
          }}>
            <BookmarkCheck size={48} color="#e28743" style={{ marginBottom: '1rem' }} />
            <h3 style={{ color: '#1e293b', fontSize: '1.1rem', fontWeight: 800, marginBottom: '8px' }}>
              Your shortlist is currently empty
            </h3>
            <p style={{ color: '#64748b', fontSize: '0.875rem', marginBottom: '1.5rem', lineHeight: 1.5 }}>
              Browse through our college directory and click the bookmark icon on cards to save them.
            </p>
            <Link href={PLATFORM_ROUTES.list} style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '11px 24px', borderRadius: '30px', textDecoration: 'none',
              background: '#0b4c8c',
              color: 'white', fontSize: '0.9rem', fontWeight: 700,
              boxShadow: '0 4px 12px rgba(11, 76, 140, 0.2)',
            }}>
              Browse Directory <ArrowRight size={15} />
            </Link>
          </div>
        ) : (
          <CollegeGrid colleges={savedList} isLoading={false} />
        )}
      </div>
    </div>
  );
}
