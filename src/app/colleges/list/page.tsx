'use client';

import React, { useState, useCallback } from 'react';
import { FilterState } from '@/lib/college-platform/types';
import { DEFAULT_FILTERS, ITEMS_PER_PAGE } from '@/lib/college-platform/constants';
import { useColleges } from '@/lib/college-platform/hooks/useColleges';
import { CollegeFilters } from '@/components/college-platform/colleges/CollegeFilters';
import { CollegeGrid } from '@/components/college-platform/colleges/CollegeGrid';
import { Pagination } from '@/components/college-platform/colleges/Pagination';
import { GraduationCap } from 'lucide-react';
export default function CollegeListPage() {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [page, setPage] = useState(1);

  const handleFiltersChange = useCallback((newFilters: FilterState) => {
    setFilters(newFilters);
    setPage(1); // Reset to page 1 on filter change
  }, []);

  const { colleges, total, totalPages, isLoading } = useColleges(filters, page);

  return (
    <div style={{ minHeight: '100vh', padding: '2.5rem 1.5rem 6rem', background: '#f8fafc' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Page Header */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <div style={{
              width: '38px', height: '38px', borderRadius: '10px',
              background: 'linear-gradient(135deg, #0b4c8c 0%, #1e40af 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 10px rgba(11, 76, 140, 0.15)',
            }}>
              <GraduationCap size={20} color="white" />
            </div>
            <h1 style={{
              fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.02em',
              color: '#0f172a',
            }}>
              Explore Colleges
            </h1>
          </div>
          <p style={{ color: '#475569', fontSize: '0.9rem', margin: 0, fontWeight: 500 }}>
            Find, compare, and save the best academic institutions in India
          </p>
        </div>

        {/* Filters and Grid wrapper */}
        <CollegeFilters
          filters={filters}
          onFiltersChange={handleFiltersChange}
          totalResults={total}
        >
          {/* Grid */}
          <CollegeGrid colleges={colleges} isLoading={isLoading} />

          {/* Pagination */}
          {!isLoading && (
            <Pagination
              page={page}
              totalPages={totalPages}
              total={total}
              perPage={ITEMS_PER_PAGE}
              onPageChange={setPage}
            />
          )}
        </CollegeFilters>
      </div>
    </div>
  );
}
