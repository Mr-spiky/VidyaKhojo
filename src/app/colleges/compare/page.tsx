'use client';

import React from 'react';
import Link from 'next/link';
import { useCompare } from '@/lib/college-platform/contexts/CompareContext';
import { formatCurrency, formatFees } from '@/lib/college-platform/utils';
import { PLATFORM_ROUTES } from '@/lib/college-platform/constants';
import { BarChart3, X, ArrowRight, Star, MapPin, Check, Minus, GraduationCap } from 'lucide-react';
import { College } from '@/lib/college-platform/types';

export default function ComparePage() {
  const { compareList, removeFromCompare, clearCompare } = useCompare();

  const logoColors = [
    { bg: 'linear-gradient(135deg, #1e3a8a, #3b82f6)', text: '#ffffff' },
    { bg: 'linear-gradient(135deg, #b91c1c, #f87171)', text: '#ffffff' },
    { bg: 'linear-gradient(135deg, #0f766e, #2dd4bf)', text: '#ffffff' },
    { bg: 'linear-gradient(135deg, #6d28d9, #c084fc)', text: '#ffffff' },
  ];

  if (compareList.length === 0) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', background: '#f8fafc' }}>
        <div style={{ textAlign: 'center', maxWidth: '450px' }}>
          <div style={{
            width: '80px', height: '80px', borderRadius: '20px',
            background: '#eff6ff', border: '1px solid #bfdbfe',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 1.5rem',
            boxShadow: '0 4px 10px rgba(11, 76, 140, 0.1)',
          }}>
            <BarChart3 size={36} color="#0b4c8c" />
          </div>
          <h2 style={{ color: '#0f172a', fontSize: '1.4rem', fontWeight: 800, marginBottom: '10px' }}>
            No colleges to compare
          </h2>
          <p style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '2rem', lineHeight: 1.6 }}>
            Explore colleges and add them to your comparison pool. Compare up to 3 colleges side-by-side on course fees, placements, ratings, and accreditations.
          </p>
          <Link href={PLATFORM_ROUTES.list} style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '12px 28px', borderRadius: '30px', textDecoration: 'none',
            background: '#0b4c8c',
            color: 'white', fontSize: '0.95rem', fontWeight: 700,
            boxShadow: '0 4px 12px rgba(11, 76, 140, 0.2)',
          }}>
            Browse Colleges <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    );
  }

  const compareRows = [
    {
      label: 'Location',
      getValue: (c: College) => <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><MapPin size={13} style={{ color: '#0b4c8c' }} />{c.location}</span>,
    },
    {
      label: 'Institute Type',
      getValue: (c: College) => c.type,
    },
    {
      label: 'Established',
      getValue: (c: College) => c.established,
    },
    {
      label: 'Accreditation',
      getValue: (c: College) => c.accreditation,
    },
    {
      label: 'NIRF Rank',
      getValue: (c: College) => c.nirfRank ? `#${c.nirfRank}` : 'Not Ranked',
      highlight: true,
      best: (vals: (string|number)[]) => {
        const nums = vals.map(v => typeof v === 'number' ? v : Infinity);
        return nums.indexOf(Math.min(...nums));
      },
    },
    {
      label: 'Rating',
      getValue: (c: College) => (
        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Star size={13} fill="#e28743" color="#e28743" />
          {c.rating.toFixed(1)}
        </span>
      ),
      highlight: true,
      rawValue: (c: College) => c.rating,
      best: (vals: number[]) => vals.indexOf(Math.max(...vals)),
    },
    {
      label: 'Annual Fees (Min)',
      getValue: (c: College) => formatCurrency(c.fees.min),
      highlight: true,
      rawValue: (c: College) => c.fees.min,
      best: (vals: number[]) => vals.indexOf(Math.min(...vals)), // Lower is better
    },
    {
      label: 'Placement Rate',
      getValue: (c: College) => `${c.placementPercentage}%`,
      highlight: true,
      rawValue: (c: College) => c.placementPercentage,
      best: (vals: number[]) => vals.indexOf(Math.max(...vals)),
    },
    {
      label: 'Avg Package',
      getValue: (c: College) => `${c.averagePackage} LPA`,
      highlight: true,
      rawValue: (c: College) => c.averagePackage,
      best: (vals: number[]) => vals.indexOf(Math.max(...vals)),
    },
    {
      label: 'Highest Package',
      getValue: (c: College) => c.highestPackage > 0 ? `${c.highestPackage} Cr` : `${c.averagePackage * 3} LPA`,
    },
    {
      label: 'Total Enrollment',
      getValue: (c: College) => c.totalStudents?.toLocaleString() || 'N/A',
    },
    {
      label: 'Campus Area',
      getValue: (c: College) => c.campusArea || 'N/A',
    },
  ];

  return (
    <div style={{ minHeight: '100vh', padding: '2.5rem 1.5rem 7rem', background: '#f8fafc' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h1 style={{
              fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.02em',
              color: '#0f172a',
              marginBottom: '6px',
            }}>
              Compare Colleges
            </h1>
            <p style={{ color: '#475569', fontSize: '0.9rem', fontWeight: 500 }}>
              Side-by-side comparison of {compareList.length} shortlisted college{compareList.length > 1 ? 's' : ''}
            </p>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <Link href={PLATFORM_ROUTES.list} style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              padding: '8px 16px', borderRadius: '20px', textDecoration: 'none',
              border: '1px solid #cbd5e1',
              background: '#ffffff', color: '#0b4c8c',
              fontSize: '0.85rem', fontWeight: 700,
            }}>
              + Add Colleges
            </Link>
            <button
              onClick={clearCompare}
              style={{
                padding: '8px 16px', borderRadius: '20px',
                border: '1px solid #fca5a5',
                background: '#fef2f2',
                cursor: 'pointer', color: '#ef4444',
                fontSize: '0.85rem', fontWeight: 700,
              }}
            >
              Clear All
            </button>
          </div>
        </div>

        {/* Compare Table */}
        <div style={{
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '16px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.02)',
          overflow: 'hidden',
        }}>
          <div style={{ overflowX: 'auto' }}>
            <div style={{ minWidth: `${280 + compareList.length * 220}px` }}>
              {/* College Headers Row */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: `200px repeat(${compareList.length}, 1fr)`,
                borderBottom: '1px solid #e2e8f0',
              }}>
                <div style={{ padding: '1.25rem', background: '#f8fafc' }} />
                {compareList.map(college => {
                  const logoColor = logoColors[Math.abs(college.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)) % logoColors.length];
                  return (
                    <div key={college.id} style={{
                      padding: '1.25rem',
                      background: '#ffffff',
                      borderLeft: '1px solid #e2e8f0',
                      position: 'relative',
                    }}>
                      <button
                        onClick={() => removeFromCompare(college.id)}
                        style={{
                          position: 'absolute', top: '10px', right: '10px',
                          border: 'none', background: '#f1f5f9',
                          cursor: 'pointer', borderRadius: '50%', padding: '4px',
                          color: '#64748b', display: 'flex',
                        }}
                        onMouseEnter={e => (e.currentTarget.style.color = '#ef4444')}
                        onMouseLeave={e => (e.currentTarget.style.color = '#64748b')}
                      >
                        <X size={13} />
                      </button>

                      <div style={{
                        width: '40px', height: '40px', borderRadius: '10px',
                        background: logoColor.bg,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '1.1rem', fontWeight: 800, color: 'white',
                        marginBottom: '10px',
                      }}>
                        {(college.shortName || college.name).charAt(0)}
                      </div>

                      <h3 style={{ color: '#0f172a', fontWeight: 700, fontSize: '0.9rem', marginBottom: '4px' }}>
                        {college.shortName}
                      </h3>
                      <p style={{ color: '#64748b', fontSize: '0.75rem', marginBottom: '8px' }}>{college.location}</p>

                      <Link href={PLATFORM_ROUTES.detail(college.id)} style={{
                        display: 'inline-flex', alignItems: 'center', gap: '4px',
                        fontSize: '0.75rem', color: '#0b4c8c', textDecoration: 'none', fontWeight: 700,
                      }}>
                        View Profile <ArrowRight size={11} />
                      </Link>
                    </div>
                  );
                })}
              </div>

              {/* Data Rows */}
              {compareRows.map((row, rowIdx) => {
                const rawVals = row.rawValue ? compareList.map(c => row.rawValue!(c)) : [];
                const bestIdx = row.best && rawVals.length > 0 ? row.best(rawVals as any) : -1;

                return (
                  <div
                    key={row.label}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: `200px repeat(${compareList.length}, 1fr)`,
                      borderBottom: rowIdx === compareRows.length - 1 ? 'none' : '1px solid #f1f5f9',
                    }}
                  >
                    {/* Row Label */}
                    <div style={{
                      padding: '12px 16px',
                      background: '#f8fafc',
                      display: 'flex', alignItems: 'center',
                      color: '#475569', fontSize: '0.8rem', fontWeight: 700,
                    }}>
                      {row.label}
                    </div>

                    {/* Row values */}
                    {compareList.map((college, colIdx) => {
                      const isBest = bestIdx === colIdx && compareList.length > 1;
                      return (
                        <div
                          key={college.id}
                          style={{
                            padding: '12px 16px',
                            background: isBest ? '#ecfdf5' : '#ffffff',
                            borderLeft: '1px solid #e2e8f0',
                            display: 'flex', alignItems: 'center',
                            color: isBest ? '#047857' : '#1e293b',
                            fontSize: '0.85rem', fontWeight: isBest ? 700 : 500,
                            gap: '6px',
                          }}
                        >
                          {isBest && <Check size={13} style={{ color: '#047857' }} />}
                          {row.getValue(college)}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Detailed Courses Comparison Section */}
        <div style={{ marginTop: '3rem' }}>
          <h3 style={{ color: '#0f172a', fontSize: '1.1rem', fontWeight: 800, marginBottom: '1rem', borderBottom: '1px solid #cbd5e1', paddingBottom: '6px' }}>Courses & Annual Fees Comparison</h3>
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(auto-fit, minmax(280px, 1fr))`, gap: '1.5rem' }}>
            {compareList.map(college => (
              <div key={college.id} style={{
                padding: '1.25rem', borderRadius: '12px',
                background: '#ffffff', border: '1px solid #e2e8f0',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.01)',
              }}>
                <h4 style={{ color: '#0b4c8c', fontWeight: 800, fontSize: '0.9rem', marginBottom: '12px', borderBottom: '1px solid #f1f5f9', paddingBottom: '6px' }}>
                  {college.shortName}
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {college.courses.map(c => (
                    <div key={c.id} style={{
                      display: 'flex', justifyContent: 'space-between',
                      padding: '6px 0', borderBottom: '1px solid #f1f5f9',
                      fontSize: '0.8rem',
                    }}>
                      <span style={{ color: '#475569', fontWeight: 500 }}>{c.name}</span>
                      <strong style={{ color: '#1e293b' }}>{formatCurrency(c.fees)}</strong>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
