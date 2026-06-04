'use client';

import React, { useState, useEffect } from 'react';
import { FilterState } from '@/lib/college-platform/types';
import { STATES, COLLEGE_TYPES, SORT_OPTIONS, DEFAULT_FILTERS } from '@/lib/college-platform/constants';
import { useDebounce } from '@/lib/college-platform/hooks/useDebounce';
import { Search, X, SlidersHorizontal, ChevronDown, ChevronUp, Check, RefreshCw } from 'lucide-react';

interface CollegeFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  totalResults: number;
  children?: React.ReactNode;
}

export function CollegeFilters({ filters, onFiltersChange, totalResults, children }: CollegeFiltersProps) {
  const [searchInput, setSearchInput] = useState(filters.search);
  const debouncedSearch = useDebounce(searchInput, 350);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Accordion section states
  const [sectionOpen, setSectionOpen] = useState({
    type: true,
    rating: true,
    state: true,
    fees: true
  });

  useEffect(() => {
    onFiltersChange({ ...filters, search: debouncedSearch });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  // Sync state if filters change externally (e.g. reset)
  useEffect(() => {
    setSearchInput(filters.search);
  }, [filters.search]);

  const updateFilter = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const toggleArrayFilter = (key: 'location' | 'type', value: string) => {
    const current = filters[key] as string[];
    if (current.includes(value)) {
      updateFilter(key, current.filter(v => v !== value));
    } else {
      updateFilter(key, [...current, value]);
    }
  };

  const resetFilters = () => {
    setSearchInput('');
    onFiltersChange(DEFAULT_FILTERS);
  };

  const toggleSection = (section: keyof typeof sectionOpen) => {
    setSectionOpen(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const hasActiveFilters =
    filters.search || filters.location.length > 0 ||
    filters.type.length > 0 || filters.rating > 0 ||
    filters.feeRange[0] > 0 || filters.feeRange[1] < 50;

  const FilterPanelContent = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* College Type Accordion */}
      <div style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '16px' }}>
        <button
          onClick={() => toggleSection('type')}
          style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            width: '100%', border: 'none', background: 'transparent', cursor: 'pointer',
            padding: '4px 0', color: '#0f172a', fontWeight: 700, fontSize: '0.85rem',
            textTransform: 'uppercase', letterSpacing: '0.04em',
          }}
        >
          <span>College Type</span>
          {sectionOpen.type ? <ChevronUp size={16} style={{ color: '#64748b' }} /> : <ChevronDown size={16} style={{ color: '#64748b' }} />}
        </button>
        {sectionOpen.type && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px' }}>
            {COLLEGE_TYPES.map(type => {
              const checked = filters.type.includes(type);
              return (
                <label
                  key={type}
                  style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', userSelect: 'none' }}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleArrayFilter('type', type)}
                    style={{ accentColor: '#0b4c8c', width: '15px', height: '15px', cursor: 'pointer' }}
                  />
                  <span style={{ color: checked ? '#0b4c8c' : '#475569', fontSize: '0.875rem', fontWeight: checked ? 600 : 500 }}>
                    {type}
                  </span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* Min Rating Accordion */}
      <div style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '16px' }}>
        <button
          onClick={() => toggleSection('rating')}
          style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            width: '100%', border: 'none', background: 'transparent', cursor: 'pointer',
            padding: '4px 0', color: '#0f172a', fontWeight: 700, fontSize: '0.85rem',
            textTransform: 'uppercase', letterSpacing: '0.04em',
          }}
        >
          <span>Minimum Rating</span>
          {sectionOpen.rating ? <ChevronUp size={16} style={{ color: '#64748b' }} /> : <ChevronDown size={16} style={{ color: '#64748b' }} />}
        </button>
        {sectionOpen.rating && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px' }}>
            {[
              { label: 'Show All Ratings', value: 0 },
              { label: '4.5 ★ & above (Excellent)', value: 4.5 },
              { label: '4.0 ★ & above (Very Good)', value: 4.0 },
              { label: '3.5 ★ & above (Good)', value: 3.5 },
              { label: '3.0 ★ & above (Average)', value: 3.0 },
            ].map(opt => {
              const checked = filters.rating === opt.value;
              return (
                <label key={opt.value} style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', userSelect: 'none' }}>
                  <input
                    type="radio"
                    name="rating"
                    checked={checked}
                    onChange={() => updateFilter('rating', opt.value)}
                    style={{ accentColor: '#0b4c8c', width: '15px', height: '15px', cursor: 'pointer' }}
                  />
                  <span style={{ color: checked ? '#0b4c8c' : '#475569', fontSize: '0.875rem', fontWeight: checked ? 600 : 500 }}>
                    {opt.label}
                  </span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* State Accordion */}
      <div style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '16px' }}>
        <button
          onClick={() => toggleSection('state')}
          style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            width: '100%', border: 'none', background: 'transparent', cursor: 'pointer',
            padding: '4px 0', color: '#0f172a', fontWeight: 700, fontSize: '0.85rem',
            textTransform: 'uppercase', letterSpacing: '0.04em',
          }}
        >
          <span>Popular States</span>
          {sectionOpen.state ? <ChevronUp size={16} style={{ color: '#64748b' }} /> : <ChevronDown size={16} style={{ color: '#64748b' }} />}
        </button>
        {sectionOpen.state && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px', maxHeight: '180px', overflowY: 'auto', paddingRight: '4px' }}>
            {STATES.map(state => {
              const checked = filters.location.includes(state);
              return (
                <label key={state} style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', userSelect: 'none' }}>
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleArrayFilter('location', state)}
                    style={{ accentColor: '#0b4c8c', width: '15px', height: '15px', cursor: 'pointer' }}
                  />
                  <span style={{ color: checked ? '#0b4c8c' : '#475569', fontSize: '0.875rem', fontWeight: checked ? 600 : 500 }}>
                    {state}
                  </span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* Max Annual Fees Accordion */}
      <div>
        <button
          onClick={() => toggleSection('fees')}
          style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            width: '100%', border: 'none', background: 'transparent', cursor: 'pointer',
            padding: '4px 0', color: '#0f172a', fontWeight: 700, fontSize: '0.85rem',
            textTransform: 'uppercase', letterSpacing: '0.04em',
          }}
        >
          <span>Max Annual Fees</span>
          {sectionOpen.fees ? <ChevronUp size={16} style={{ color: '#64748b' }} /> : <ChevronDown size={16} style={{ color: '#64748b' }} />}
        </button>
        {sectionOpen.fees && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px' }}>
            {[
              { label: 'Any Fees', value: 50 },
              { label: 'Under ₹1 Lakh', value: 1 },
              { label: 'Under ₹2 Lakhs', value: 2 },
              { label: 'Under ₹5 Lakhs', value: 5 },
              { label: 'Under ₹10 Lakhs', value: 10 },
              { label: 'Under ₹25 Lakhs', value: 25 },
            ].map(opt => {
              const checked = filters.feeRange[1] === opt.value;
              return (
                <label key={opt.value} style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', userSelect: 'none' }}>
                  <input
                    type="radio"
                    name="feeRange"
                    checked={checked}
                    onChange={() => updateFilter('feeRange', [0, opt.value])}
                    style={{ accentColor: '#0b4c8c', width: '15px', height: '15px', cursor: 'pointer' }}
                  />
                  <span style={{ color: checked ? '#0b4c8c' : '#475569', fontSize: '0.875rem', fontWeight: checked ? 600 : 500 }}>
                    {opt.label}
                  </span>
                </label>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div style={{ marginBottom: '1.5rem' }}>
      {/* Top Search & Filter controls panel */}
      <div style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        padding: '1rem',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.02)',
        marginBottom: '1.25rem',
      }}>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
          {/* Main search input bar */}
          <div style={{ position: 'relative', flex: 1, minWidth: '260px' }}>
            <Search
              size={18}
              style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#0b4c8c' }}
            />
            <input
              id="college-search"
              value={searchInput}
              onChange={e => setSearchInput(e.target.value)}
              placeholder="Search colleges, cities, or tags..."
              style={{
                width: '100%', padding: '11px 40px 11px 42px',
                background: '#f8fafc',
                border: '1px solid #cbd5e1',
                borderRadius: '8px', outline: 'none',
                color: '#0f172a', fontSize: '0.9rem',
                transition: 'all 0.2s',
                boxSizing: 'border-box',
              }}
              onFocus={e => {
                e.target.style.borderColor = '#0b4c8c';
                e.target.style.background = '#ffffff';
                e.target.style.boxShadow = '0 0 0 3px rgba(11, 76, 140, 0.1)';
              }}
              onBlur={e => {
                e.target.style.borderColor = '#cbd5e1';
                e.target.style.background = '#f8fafc';
                e.target.style.boxShadow = 'none';
              }}
            />
            {searchInput && (
              <button
                onClick={() => setSearchInput('')}
                style={{
                  position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)',
                  border: 'none', background: 'none', cursor: 'pointer', color: '#64748b',
                  display: 'flex',
                }}
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Sort Selection dropdown */}
          <div style={{ position: 'relative', minWidth: '180px' }}>
            <select
              id="sort-by"
              value={filters.sortBy}
              onChange={e => updateFilter('sortBy', e.target.value as FilterState['sortBy'])}
              style={{
                width: '100%', padding: '11px 36px 11px 14px',
                background: '#ffffff',
                border: '1px solid #cbd5e1',
                borderRadius: '8px', outline: 'none',
                color: '#1e293b', fontSize: '0.875rem',
                fontWeight: 600,
                cursor: 'pointer', appearance: 'none',
                transition: 'border-color 0.2s',
              }}
              onFocus={e => (e.target.style.borderColor = '#0b4c8c')}
              onBlur={e => (e.target.style.borderColor = '#cbd5e1')}
            >
              {SORT_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>
                  Sort by: {opt.label}
                </option>
              ))}
            </select>
            <ChevronDown size={14} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: '#64748b', pointerEvents: 'none' }} />
          </div>

          {/* Mobile Filter toggle button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="mobile-filter-btn"
            style={{
              display: 'none', alignItems: 'center', gap: '8px',
              padding: '11px 18px', borderRadius: '8px',
              border: '1px solid #cbd5e1',
              background: '#ffffff',
              cursor: 'pointer', color: '#1e293b',
              fontSize: '0.875rem', fontWeight: 600,
              transition: 'all 0.2s',
            }}
          >
            <SlidersHorizontal size={15} />
            Filters
            {hasActiveFilters && (
              <span style={{
                background: '#e28743', color: 'white',
                fontSize: '0.65rem', fontWeight: 800,
                width: '16px', height: '16px', borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                1
              </span>
            )}
          </button>

          {/* Reset Filters action */}
          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                padding: '11px 16px', borderRadius: '8px',
                border: '1px solid #fee2e2',
                background: '#fef2f2',
                cursor: 'pointer', color: '#ef4444',
                fontSize: '0.875rem', fontWeight: 600,
                transition: 'all 0.2s',
              }}
            >
              <RefreshCw size={13} />
              Reset Filters
            </button>
          )}
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '4px 0 16px' }}>
        <div style={{ color: '#475569', fontSize: '0.85rem', fontWeight: 500 }}>
          Found <span style={{ color: '#0b4c8c', fontWeight: 700 }}>{totalResults}</span> matching colleges
        </div>
      </div>

      {/* Grid wrapper for Sidebar and Content */}
      <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '20px' }} className="filters-layout-grid">
        {/* Desktop Sidebar filter card */}
        <aside style={{
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '12px',
          padding: '1.25rem',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.02)',
          alignSelf: 'start',
          boxSizing: 'border-box',
        }} className="desktop-sidebar-filters">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '12px', marginBottom: '16px' }}>
            <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <SlidersHorizontal size={14} style={{ color: '#0b4c8c' }} />
              Filter By
            </span>
            {hasActiveFilters && (
              <button onClick={resetFilters} style={{ background: 'none', border: 'none', color: '#64748b', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer', textDecoration: 'underline' }}>
                Clear All
              </button>
            )}
          </div>
          <FilterPanelContent />
        </aside>

        {/* Children components injected dynamically in listing page */}
        <div className="filter-results-container" style={{ minWidth: 0 }}>
          {children}
        </div>
      </div>

      {/* Mobile sliding bottom drawer for filters */}
      {mobileOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(15, 23, 42, 0.6)',
          backdropFilter: 'blur(4px)',
          zIndex: 1000,
          display: 'flex',
          justifyContent: 'flex-end',
        }}>
          <div style={{
            width: '100%',
            maxWidth: '320px',
            background: '#ffffff',
            height: '100%',
            boxShadow: '-10px 0 25px -5px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            flexDirection: 'column',
            animation: 'slideLeft 0.25s ease-out',
            boxSizing: 'border-box',
          }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem 1.5rem', borderBottom: '1px solid #e2e8f0' }}>
              <span style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a' }}>Filters</span>
              <button onClick={() => setMobileOpen(false)} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#64748b', padding: '4px' }}>
                <X size={20} />
              </button>
            </div>
            {/* Scroll body */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>
              <FilterPanelContent />
            </div>
            {/* Footer */}
            <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid #e2e8f0', display: 'flex', gap: '12px' }}>
              <button
                onClick={resetFilters}
                style={{ flex: 1, padding: '10px', border: '1px solid #cbd5e1', borderRadius: '8px', background: 'transparent', color: '#475569', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer' }}
              >
                Clear
              </button>
              <button
                onClick={() => setMobileOpen(false)}
                style={{ flex: 1, padding: '10px', border: 'none', borderRadius: '8px', background: '#0b4c8c', color: 'white', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer' }}
              >
                Apply ({totalResults})
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .filters-layout-grid { display: block !important; }
          .desktop-sidebar-filters { display: none !important; }
          .mobile-filter-btn { display: flex !important; }
        }
        @keyframes slideLeft {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
