'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useCollege } from '@/lib/college-platform/hooks/useColleges';
import { useCompare } from '@/lib/college-platform/contexts/CompareContext';
import { useSaved } from '@/lib/college-platform/contexts/SavedContext';
import { useAuth } from '@/lib/college-platform/contexts/AuthContext';
import { formatCurrency, formatFees } from '@/lib/college-platform/utils';
import { PLATFORM_ROUTES } from '@/lib/college-platform/constants';
import {
  MapPin, Star, TrendingUp, Users, Calendar, Award, Building2,
  BookmarkPlus, BookmarkCheck, PlusCircle, CheckCircle2, ArrowLeft,
  GraduationCap, DollarSign, BarChart2, Globe, BookOpen, Briefcase,
  MessageSquare, ChevronRight, Trophy, Check, ShieldCheck, Map
} from 'lucide-react';

type Tab = 'overview' | 'courses' | 'fees' | 'placements' | 'reviews';

const BANNERS = [
  '/images/campus_banner_engineering.png',
  '/images/campus_banner_library.png',
  '/images/campus_banner_general.png'
];

export default function CollegeDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  const { college, isLoading } = useCollege(id);
  const { addToCompare, removeFromCompare, isInCompare } = useCompare();
  const { isSaved, saveCollege, unsaveCollege } = useSaved();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [authModal, setAuthModal] = useState(false);

  if (isLoading) return <DetailSkeleton />;
  if (!college) return (
    <div style={{ textAlign: 'center', padding: '6rem 1.5rem', color: '#64748b', background: '#f8fafc', minHeight: '80vh' }}>
      <h2 style={{ fontSize: '1.5rem', color: '#0f172a', marginBottom: '10px', fontWeight: 800 }}>College Not Found</h2>
      <Link href={PLATFORM_ROUTES.list} style={{ color: '#0b4c8c', textDecoration: 'none', fontWeight: 700 }}>← Back to listing</Link>
    </div>
  );

  const saved = isSaved(college.id);
  const inCompare = isInCompare(college.id);
  const ratingColor = college.rating >= 4.5 ? '#047857' : college.rating >= 4.0 ? '#b45309' : '#b91c1c';
  const ratingBg = college.rating >= 4.5 ? '#ecfdf5' : college.rating >= 4.0 ? '#fffbeb' : '#fef2f2';

  const TYPE_COLORS: Record<string, { bg: string; text: string; border: string }> = {
    Government: { bg: '#ecfdf5', text: '#047857', border: '#a7f3d0' },
    Private: { bg: '#eff6ff', text: '#1d4ed8', border: '#bfdbfe' },
    Deemed: { bg: '#faf5ff', text: '#6d28d9', border: '#e9d5ff' },
  };
  const typeColor = TYPE_COLORS[college.type] || TYPE_COLORS.Private;

  // Consistently select a banner image based on college id
  const bannerIndex = Math.abs(college.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)) % BANNERS.length;
  const bannerUrl = BANNERS[bannerIndex];

  // Consistently select a logo color based on college id
  const logoColors = [
    { bg: 'linear-gradient(135deg, #1e3a8a, #3b82f6)', text: '#ffffff' },
    { bg: 'linear-gradient(135deg, #b91c1c, #f87171)', text: '#ffffff' },
    { bg: 'linear-gradient(135deg, #0f766e, #2dd4bf)', text: '#ffffff' },
    { bg: 'linear-gradient(135deg, #6d28d9, #c084fc)', text: '#ffffff' },
  ];
  const logoColor = logoColors[Math.abs(college.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)) % logoColors.length];

  const tabs: { key: Tab; label: string; icon: React.ReactNode }[] = [
    { key: 'overview', label: 'Overview', icon: <Building2 size={15} /> },
    { key: 'courses', label: 'Courses Offered', icon: <BookOpen size={15} /> },
    { key: 'fees', label: 'Fees Structure', icon: <DollarSign size={15} /> },
    { key: 'placements', label: 'Placements Stats', icon: <Briefcase size={15} /> },
    { key: 'reviews', label: 'Student Reviews', icon: <MessageSquare size={15} /> },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', paddingBottom: '6rem' }}>
      {/* CAMPUS HERO BANNER */}
      <div style={{ position: 'relative', height: '240px', background: '#cbd5e1' }}>
        <img
          src={bannerUrl}
          alt={college.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(15, 23, 42, 0.2) 0%, rgba(15, 23, 42, 0.7) 100%)',
        }} />
        
        {/* Back navigation button overlay */}
        <div style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 10 }}>
          <button
            onClick={() => router.back()}
            style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              border: 'none', borderRadius: '20px', background: 'rgba(255, 255, 255, 0.95)',
              padding: '6px 14px', cursor: 'pointer',
              color: '#1e293b', fontSize: '0.85rem', fontWeight: 700,
              boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#ffffff'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.95)'}
          >
            <ArrowLeft size={14} />
            Back
          </button>
        </div>
      </div>

      {/* COLLEGE HEADER INFO PANEL */}
      <div style={{
        marginTop: '-50px',
        position: 'relative',
        zIndex: 20,
        padding: '0 1.5rem',
        marginBottom: '2rem',
      }}>
        <div style={{
          maxWidth: '1100px', margin: '0 auto',
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '16px',
          padding: '1.5rem',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.05)',
        }}>
          <div style={{
            display: 'flex', gap: '1.5rem', alignItems: 'flex-start',
            flexWrap: 'wrap',
          }}>
            {/* Logo shield */}
            <div style={{
              width: '84px', height: '84px', borderRadius: '16px',
              background: '#ffffff',
              boxShadow: '0 4px 10px rgba(0,0,0,0.08)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '4px',
              flexShrink: 0,
            }}>
              <div style={{
                width: '100%', height: '100%', borderRadius: '12px',
                background: logoColor.bg,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '2rem', fontWeight: 900, color: logoColor.text,
              }}>
                {(college.shortName || college.name).charAt(0)}
              </div>
            </div>

            {/* Title / Badges block */}
            <div style={{ flex: 1, minWidth: '260px' }}>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '8px' }}>
                <span style={{
                  fontSize: '0.72rem', fontWeight: 700, padding: '2px 8px', borderRadius: '4px',
                  background: typeColor.bg, color: typeColor.text, border: `1px solid ${typeColor.border}`,
                }}>
                  {college.type}
                </span>
                {college.nirfRank && (
                  <span style={{
                    fontSize: '0.72rem', fontWeight: 700, padding: '2px 8px', borderRadius: '4px',
                    background: '#fffbeb', color: '#b45309', border: '1px solid #fde68a',
                  }}>
                    NIRF Rank #{college.nirfRank}
                  </span>
                )}
                <span style={{
                  fontSize: '0.72rem', fontWeight: 700, padding: '2px 8px', borderRadius: '4px',
                  background: '#f1f5f9', color: '#475569', border: '1px solid #e2e8f0',
                  display: 'inline-flex', alignItems: 'center', gap: '3px'
                }}>
                  <ShieldCheck size={11} style={{ color: '#0b4c8c' }} />
                  {college.accreditation}
                </span>
              </div>

              <h1 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)', fontWeight: 800, color: '#0f172a', marginBottom: '8px', letterSpacing: '-0.02em' }}>
                {college.name}
              </h1>

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap', color: '#64748b', fontSize: '0.85rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <MapPin size={13} style={{ color: '#0b4c8c' }} />
                  {college.location}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <Star size={13} fill="#e28743" color="#e28743" />
                  <span style={{ color: '#e28743', fontWeight: 700 }}>{college.rating}</span>
                  <span>({college.reviewCount.toLocaleString()} reviews)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <Calendar size={13} />
                  Est. {college.established}
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div style={{ display: 'flex', gap: '8px', flexShrink: 0, flexWrap: 'wrap' }}>
              <button
                onClick={() => {
                  if (!user) { setAuthModal(true); return; }
                  if (saved) unsaveCollege(college.id);
                  else saveCollege(college.id);
                }}
                style={{
                  display: 'flex', alignItems: 'center', gap: '6px',
                  padding: '9px 16px', borderRadius: '20px', cursor: 'pointer',
                  border: saved ? '1px solid #fed7aa' : '1px solid #cbd5e1',
                  background: saved ? '#fff7ed' : '#ffffff',
                  color: saved ? '#c2410c' : '#475569',
                  fontSize: '0.85rem', fontWeight: 700, transition: 'all 0.2s',
                }}
              >
                {saved ? <BookmarkCheck size={15} /> : <BookmarkPlus size={15} />}
                {saved ? 'Saved' : 'Save'}
              </button>
              <button
                onClick={() => inCompare ? removeFromCompare(college.id) : addToCompare(college)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '6px',
                  padding: '9px 16px', borderRadius: '20px', cursor: 'pointer',
                  border: inCompare ? '1px solid #a7f3d0' : '1px solid #cbd5e1',
                  background: inCompare ? '#ecfdf5' : '#ffffff',
                  color: inCompare ? '#047857' : '#475569',
                  fontSize: '0.85rem', fontWeight: 700, transition: 'all 0.2s',
                }}
              >
                {inCompare ? <CheckCircle2 size={15} /> : <PlusCircle size={15} />}
                {inCompare ? 'Added' : 'Compare'}
              </button>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '1rem', marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid #f1f5f9',
          }}>
            {[
              { icon: <DollarSign size={15} />, label: 'Tuition Fees', value: formatFees(college.fees.min, college.fees.max), color: '#0b4c8c', bg: '#eff6ff' },
              { icon: <TrendingUp size={15} />, label: 'Placement Rate', value: `${college.placementPercentage}%`, color: '#047857', bg: '#ecfdf5' },
              { icon: <BarChart2 size={15} />, label: 'Avg Package', value: `${college.averagePackage} LPA`, color: '#0b4c8c', bg: '#eff6ff' },
              { icon: <Trophy size={15} />, label: 'Highest Package', value: `${college.highestPackage > 0 ? college.highestPackage + ' Cr' : college.averagePackage * 3 + ' LPA'}`, color: '#b45309', bg: '#fffbeb' },
              { icon: <Users size={15} />, label: 'Total Enrollment', value: college.totalStudents?.toLocaleString() || 'N/A', color: '#475569', bg: '#f1f5f9' },
            ].map(stat => (
              <div key={stat.label} style={{
                padding: '12px 14px', borderRadius: '10px',
                background: stat.bg,
                border: '1px solid rgba(0,0,0,0.02)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#64748b', marginBottom: '4px', fontSize: '0.72rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.02em' }}>
                  <span style={{ color: stat.color }}>{stat.icon}</span>
                  {stat.label}
                </div>
                <div style={{ color: stat.color, fontWeight: 800, fontSize: '0.95rem' }}>{stat.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TABS */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 1.5rem' }}>
        {/* Tab Selection Header */}
        <div style={{
          display: 'flex', gap: '4px', marginBottom: '1.75rem',
          borderBottom: '1px solid #cbd5e1',
          overflowX: 'auto', paddingBottom: '0',
        }}>
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                padding: '10px 18px', borderRadius: '8px 8px 0 0',
                border: 'none', cursor: 'pointer',
                background: 'transparent',
                color: activeTab === tab.key ? '#0b4c8c' : '#64748b',
                fontSize: '0.875rem', fontWeight: 700,
                borderBottom: activeTab === tab.key ? '3px solid #0b4c8c' : '3px solid transparent',
                marginBottom: '-1.5px',
                transition: 'all 0.2s',
                whiteSpace: 'nowrap',
              }}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Dynamic Content area */}
        <div style={{ animation: 'fadeIn 0.2s ease-out' }}>
          {activeTab === 'overview' && (
            <OverviewTab college={college} />
          )}
          {activeTab === 'courses' && (
            <CoursesTab college={college} />
          )}
          {activeTab === 'fees' && (
            <FeesTab college={college} />
          )}
          {activeTab === 'placements' && (
            <PlacementsTab college={college} />
          )}
          {activeTab === 'reviews' && (
            <ReviewsTab college={college} />
          )}
        </div>
      </div>

      {/* Auth Modal */}
      {authModal && (
        <div
          onClick={() => setAuthModal(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 200,
            background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(8px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '1.5rem',
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: '#ffffff', border: '1px solid #cbd5e1',
              borderRadius: '16px', padding: '2rem', maxWidth: '380px', width: '100%',
              textAlign: 'center',
              boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)',
            }}
          >
            <div style={{
              width: '56px', height: '56px', borderRadius: '50%',
              background: '#eff6ff', border: '1px solid #bfdbfe',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 1rem',
            }}>
              <BookmarkPlus size={24} color="#0b4c8c" />
            </div>
            <h3 style={{ color: '#0f172a', fontSize: '1.1rem', fontWeight: 800, marginBottom: '8px' }}>
              Sign in to save colleges
            </h3>
            <p style={{ color: '#64748b', fontSize: '0.85rem', marginBottom: '1.5rem', lineHeight: 1.5 }}>
              Create a free account to shortlist colleges, comparison lists, and receive updates.
            </p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <Link
                href={PLATFORM_ROUTES.login}
                style={{
                  flex: 1, padding: '10px', borderRadius: '20px', textDecoration: 'none',
                  background: '#0b4c8c',
                  color: 'white', fontSize: '0.875rem', fontWeight: 700,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                Sign In
              </Link>
              <button
                onClick={() => setAuthModal(false)}
                style={{
                  flex: 1, padding: '10px', borderRadius: '20px',
                  border: '1px solid #cbd5e1',
                  background: 'transparent', cursor: 'pointer',
                  color: '#475569', fontSize: '0.875rem', fontWeight: 700,
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
    </div>
  );
}

// ===================== DETAIL SUB-COMPONENTS =====================

function OverviewTab({ college }: { college: any }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '20px' }} className="detail-grid">
      {/* Left Area: About & Tags */}
      <div style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        padding: '1.5rem',
        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)',
      }}>
        <h3 style={{ color: '#0f172a', fontSize: '1.15rem', fontWeight: 800, marginBottom: '1rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '8px' }}>
          About {college.shortName || college.name}
        </h3>
        <p style={{ color: '#475569', lineHeight: 1.8, fontSize: '0.9rem', marginBottom: '1.5rem', textAlign: 'justify' }}>
          {college.description}
        </p>

        <h4 style={{ color: '#0f172a', fontSize: '0.9rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '10px' }}>
          Key Focus Tags
        </h4>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {college.tags.map((tag: string) => (
            <span key={tag} style={{
              padding: '4px 12px', borderRadius: '20px',
              background: '#f1f5f9', border: '1px solid #e2e8f0',
              color: '#475569', fontSize: '0.78rem', fontWeight: 700,
            }}>
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Right Area: Facilities & Quick Facts */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Facilities Box */}
        <div style={{
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '12px',
          padding: '1.5rem',
          boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)',
        }}>
          <h3 style={{ color: '#0f172a', fontSize: '1rem', fontWeight: 800, marginBottom: '1rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '8px' }}>
            Campus Facilities
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            {college.facilities.map((f: string) => (
              <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#475569', fontSize: '0.85rem', fontWeight: 600 }}>
                <Check size={14} style={{ color: '#047857' }} />
                {f}
              </div>
            ))}
          </div>
        </div>

        {/* Quick Facts Box */}
        <div style={{
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '12px',
          padding: '1.25rem',
          boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)',
        }}>
          <h3 style={{ color: '#0f172a', fontSize: '1rem', fontWeight: 800, marginBottom: '10px' }}>Quick Facts</h3>
          {[
            ['Established Year', college.established],
            ['Institute Type', college.type],
            ['Campus Area', college.campusArea || 'N/A'],
            ['Total Enrollment', college.totalStudents?.toLocaleString() || 'N/A'],
            ['National Accreditation', college.accreditation],
          ].map(([label, value]) => (
            <div key={label as string} style={{
              display: 'flex', justifyContent: 'space-between',
              padding: '8px 0', borderBottom: '1px solid #f1f5f9',
              fontSize: '0.85rem',
            }}>
              <span style={{ color: '#64748b', fontWeight: 500 }}>{label}</span>
              <span style={{ color: '#1e293b', fontWeight: 700 }}>{value}</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) { .detail-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}

function CoursesTab({ college }: { college: any }) {
  return (
    <div style={{
      background: '#ffffff',
      border: '1px solid #e2e8f0',
      borderRadius: '12px',
      padding: '1.5rem',
      boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)',
    }}>
      <h3 style={{ color: '#0f172a', fontSize: '1.15rem', fontWeight: 800, marginBottom: '1.25rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '8px' }}>
        Courses Offered & Intake Criteria
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {college.courses.map((course: any) => (
          <div key={course.id} style={{
            padding: '1.25rem',
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '10px',
            display: 'grid', gridTemplateColumns: '1fr auto',
            gap: '12px', alignItems: 'center',
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <span style={{
                  fontSize: '0.68rem', fontWeight: 700, padding: '2px 8px', borderRadius: '4px',
                  background: '#eff6ff', color: '#0b4c8c', border: '1px solid #bfdbfe',
                }}>
                  {course.degree}
                </span>
                <span style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 600 }}>Duration: {course.duration}</span>
              </div>
              <h4 style={{ color: '#1e293b', fontWeight: 800, fontSize: '0.95rem', marginBottom: '4px' }}>{course.name}</h4>
              <div style={{ display: 'flex', gap: '16px', fontSize: '0.8rem', color: '#64748b', fontWeight: 500 }}>
                <span>Intake Seats: <strong style={{ color: '#0f172a' }}>{course.seats}</strong></span>
                <span>Criteria: <strong style={{ color: '#0f172a' }}>{course.eligibility}</strong></span>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ color: '#64748b', fontSize: '0.75rem', fontWeight: 600, marginBottom: '2px' }}>Annual Fees</div>
              <div style={{ color: '#0b4c8c', fontWeight: 800, fontSize: '1.05rem' }}>{formatCurrency(course.fees)}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FeesTab({ college }: { college: any }) {
  const maxFee = Math.max(...college.courses.map((c: any) => c.fees));

  return (
    <div style={{
      background: '#ffffff',
      border: '1px solid #e2e8f0',
      borderRadius: '12px',
      padding: '1.5rem',
      boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)',
    }}>
      <h3 style={{ color: '#0f172a', fontSize: '1.15rem', fontWeight: 800, marginBottom: '1.25rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '8px' }}>Tuition Fee Structures</h3>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        {[
          { label: 'Minimum Annual Fee', value: formatCurrency(college.fees.min), color: '#047857', bg: '#ecfdf5' },
          { label: 'Maximum Annual Fee', value: formatCurrency(college.fees.max), color: '#b45309', bg: '#fffbeb' },
          { label: 'Number of Courses Offered', value: `${college.courses.length} courses`, color: '#0b4c8c', bg: '#eff6ff' },
        ].map(item => (
          <div key={item.label} style={{
            padding: '1.25rem', borderRadius: '10px',
            background: item.bg, border: '1px solid rgba(0,0,0,0.02)',
          }}>
            <p style={{ color: '#64748b', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.02em', marginBottom: '6px' }}>{item.label}</p>
            <p style={{ color: item.color, fontSize: '1.3rem', fontWeight: 800, margin: 0 }}>{item.value}</p>
          </div>
        ))}
      </div>

      <h4 style={{ color: '#0f172a', fontSize: '0.95rem', fontWeight: 800, marginBottom: '1rem' }}>Course-wise Fees Overview</h4>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {college.courses.map((course: any) => (
          <div key={course.id} style={{
            padding: '1rem', borderRadius: '10px',
            background: '#f8fafc', border: '1px solid #e2e8f0',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ color: '#1e293b', fontSize: '0.875rem', fontWeight: 700 }}>{course.name}</span>
              <span style={{ color: '#0b4c8c', fontWeight: 800 }}>{formatCurrency(course.fees)} / yr</span>
            </div>
            {/* Horizontal comparative bar representation */}
            <div style={{ height: '6px', borderRadius: '3px', background: '#cbd5e1', overflow: 'hidden' }}>
              <div style={{
                height: '100%', borderRadius: '3px',
                width: `${(course.fees / maxFee) * 100}%`,
                background: 'linear-gradient(90deg, #0b4c8c, #1e40af)',
                transition: 'width 0.6s ease',
              }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PlacementsTab({ college }: { college: any }) {
  return (
    <div style={{
      background: '#ffffff',
      border: '1px solid #e2e8f0',
      borderRadius: '12px',
      padding: '1.5rem',
      boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)',
    }}>
      <h3 style={{ color: '#0f172a', fontSize: '1.15rem', fontWeight: 800, marginBottom: '1.25rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '8px' }}>Placement Statistics</h3>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        {[
          { label: 'Overall Placement Rate', value: `${college.placementPercentage}%`, color: '#047857', bg: '#ecfdf5', icon: <TrendingUp size={20} /> },
          { label: 'Average Package (LPA)', value: `${college.averagePackage} LPA`, color: '#0b4c8c', bg: '#eff6ff', icon: <BarChart2 size={20} /> },
          { label: 'Highest Package (LPA)', value: `${college.highestPackage > 0 ? college.highestPackage + ' Cr' : college.averagePackage * 3 + ' LPA'}`, color: '#b45309', bg: '#fffbeb', icon: <Trophy size={20} /> },
        ].map(stat => (
          <div key={stat.label} style={{
            padding: '1.25rem', borderRadius: '12px', textAlign: 'center',
            background: stat.bg, border: `1px solid rgba(0,0,0,0.01)`,
          }}>
            <div style={{ color: stat.color, marginBottom: '6px', display: 'flex', justifyContent: 'center' }}>{stat.icon}</div>
            <p style={{ color: '#64748b', fontSize: '0.78rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.02em', marginBottom: '4px' }}>{stat.label}</p>
            <p style={{ color: stat.color, fontSize: '1.5rem', fontWeight: 850, margin: 0 }}>{stat.value}</p>
          </div>
        ))}
      </div>

      <h3 style={{ color: '#0f172a', fontSize: '0.95rem', fontWeight: 800, marginBottom: '1rem' }}>Top Recruiting Partners</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px' }}>
        {college.topRecruiters.map((r: any) => (
          <div key={r.name} style={{
            padding: '12px 14px', borderRadius: '10px',
            background: '#f8fafc', border: '1px solid #e2e8f0',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '32px', height: '32px', borderRadius: '8px',
                background: '#eff6ff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.8rem', fontWeight: 800, color: '#0b4c8c',
              }}>
                {r.name.charAt(0)}
              </div>
              <span style={{ color: '#1e293b', fontWeight: 700, fontSize: '0.85rem' }}>{r.name}</span>
            </div>
            {r.package && (
              <span style={{ color: '#047857', fontSize: '#0.8rem', fontWeight: 800 }}>{r.package} LPA</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function ReviewsTab({ college }: { college: any }) {
  return (
    <div style={{
      background: '#ffffff',
      border: '1px solid #e2e8f0',
      borderRadius: '12px',
      padding: '1.5rem',
      boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)',
    }}>
      <h3 style={{ color: '#0f172a', fontSize: '1.15rem', fontWeight: 800, marginBottom: '1.25rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '8px' }}>Alumni & Student Testimonials</h3>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '2.5rem', marginBottom: '2.5rem', flexWrap: 'wrap', background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
        <div style={{ textAlign: 'center', minWidth: '120px' }}>
          <div style={{
            fontSize: '3.5rem', fontWeight: 850,
            color: '#0b4c8c', lineHeight: 1.1,
          }}>
            {college.rating}
          </div>
          <div style={{ display: 'flex', gap: '3px', justifyContent: 'center', margin: '6px 0' }}>
            {[1,2,3,4,5].map(s => (
              <Star key={s} size={15} fill={s <= Math.round(college.rating) ? '#e28743' : 'transparent'} color={s <= Math.round(college.rating) ? '#e28743' : '#cbd5e1'} />
            ))}
          </div>
          <p style={{ color: '#64748b', fontSize: '0.8rem', fontWeight: 600, margin: 0 }}>{college.reviewCount.toLocaleString()} reviews</p>
        </div>

        <div style={{ flex: 1, minWidth: '240px' }}>
          {['academics', 'campus', 'placements', 'faculty'].map(aspect => {
            const avg = college.reviews.reduce((sum: number, r: any) => sum + r.aspects[aspect], 0) / college.reviews.length || 0;
            return (
              <div key={aspect} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <span style={{ color: '#475569', fontSize: '0.8rem', fontWeight: 600, width: '84px', textTransform: 'capitalize' }}>{aspect}</span>
                <div style={{ flex: 1, height: '6px', borderRadius: '3px', background: '#cbd5e1', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${(avg / 5) * 100}%`, background: 'linear-gradient(90deg, #0b4c8c, #047857)', borderRadius: '3px' }} />
                </div>
                <span style={{ color: '#0b4c8c', fontSize: '0.8rem', fontWeight: 800, width: '28px', textAlign: 'right' }}>{avg.toFixed(1)}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {college.reviews.map((review: any) => (
          <div key={review.id} style={{
            padding: '1.25rem', borderRadius: '10px',
            background: '#ffffff', border: '1px solid #e2e8f0',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <div style={{
                  width: '36px', height: '36px', borderRadius: '50%',
                  background: 'linear-gradient(135deg, #0b4c8c, #1e40af)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.85rem', fontWeight: 700, color: 'white',
                }}>
                  {review.userName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p style={{ color: '#1e293b', fontWeight: 700, fontSize: '0.875rem', margin: '0 0 2px' }}>{review.userName}</p>
                  <p style={{ color: '#64748b', fontSize: '0.72rem', margin: 0 }}>Verified Student • {new Date(review.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'long' })}</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '2px' }}>
                {[1,2,3,4,5].map(s => (
                  <Star key={s} size={12} fill={s <= review.rating ? '#e28743' : 'transparent'} color={s <= review.rating ? '#e28743' : '#cbd5e1'} />
                ))}
              </div>
            </div>
            <p style={{ color: '#475569', fontSize: '0.875rem', lineHeight: 1.6, margin: '0 0 8px', textAlign: 'justify' }}>{review.comment}</p>
            <p style={{ color: '#94a3b8', fontSize: '0.72rem', fontWeight: 600, margin: 0 }}>👍 {review.helpful} alumni found this review helpful</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function DetailSkeleton() {
  return (
    <div style={{ padding: '4rem 1.5rem', background: '#f8fafc', minHeight: '80vh' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {[100, 80, 50, 30].map((w, i) => (
          <div key={i} style={{ height: '24px', width: `${w}%`, borderRadius: '6px', background: '#e2e8f0', marginBottom: '14px', animation: 'pulse 1.5s infinite' }} />
        ))}
      </div>
      <style>{`@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }`}</style>
    </div>
  );
}
