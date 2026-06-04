'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { College } from '@/lib/college-platform/types';
import BorderGlow from '@/components/ui/BorderGlow';
import { formatCurrency, formatPackage } from '@/lib/college-platform/utils';
import { PLATFORM_ROUTES } from '@/lib/college-platform/constants';
import { useCompare } from '@/lib/college-platform/contexts/CompareContext';
import { useSaved } from '@/lib/college-platform/contexts/SavedContext';
import { useAuth } from '@/lib/college-platform/contexts/AuthContext';
import {
  MapPin, Star, TrendingUp, DollarSign, BarChart2,
  BookmarkPlus, BookmarkCheck, PlusCircle, CheckCircle2,
  Award, Building2, ArrowRight, ShieldCheck, Map
} from 'lucide-react';

interface CollegeCardProps {
  college: College;
  onAuthRequired?: () => void;
}

const TYPE_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  Government: { bg: '#ecfdf5', text: '#047857', border: '#a7f3d0' },
  Private: { bg: '#eff6ff', text: '#1d4ed8', border: '#bfdbfe' },
  Deemed: { bg: '#faf5ff', text: '#6d28d9', border: '#e9d5ff' },
};

const BANNERS = [
  '/images/campus_banner_engineering.png',
  '/images/campus_banner_library.png',
  '/images/campus_banner_general.png'
];

export function CollegeCard({ college, onAuthRequired }: CollegeCardProps) {
  const { addToCompare, removeFromCompare, isInCompare } = useCompare();
  const { isSaved, saveCollege, unsaveCollege } = useSaved();
  const { user } = useAuth();
  const [hovered, setHovered] = useState(false);
  const [compareToast, setCompareToast] = useState<string | null>(null);

  const saved = isSaved(college.id);
  const inCompare = isInCompare(college.id);
  const typeColor = TYPE_COLORS[college.type] || TYPE_COLORS.Private;

  // Consistently select a banner image based on college name/id for genuine realism
  const getCollegeBanner = (id: string, name: string) => {
    const lowercaseName = name.toLowerCase();
    if (lowercaseName.includes('bombay') || lowercaseName.includes('engineering') || lowercaseName.includes('technology') || lowercaseName.includes('iit b')) {
      return '/images/campus_banner_engineering.png';
    }
    if (lowercaseName.includes('delhi') || lowercaseName.includes('general') || lowercaseName.includes('iit d')) {
      return '/images/campus_banner_general.png';
    }
    return '/images/campus_banner_library.png';
  };
  const bannerUrl = getCollegeBanner(college.id, college.name);

  // Consistently select a logo color based on college id
  const logoColors = [
    { bg: 'linear-gradient(135deg, #1e3a8a, #3b82f6)', text: '#ffffff' },
    { bg: 'linear-gradient(135deg, #b91c1c, #f87171)', text: '#ffffff' },
    { bg: 'linear-gradient(135deg, #0f766e, #2dd4bf)', text: '#ffffff' },
    { bg: 'linear-gradient(135deg, #6d28d9, #c084fc)', text: '#ffffff' },
  ];
  const logoColor = logoColors[Math.abs(college.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)) % logoColors.length];

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      onAuthRequired?.();
      return;
    }
    if (saved) unsaveCollege(college.id);
    else saveCollege(college.id);
  };

  const handleCompare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inCompare) {
      removeFromCompare(college.id);
    } else {
      const added = addToCompare(college);
      if (!added) {
        setCompareToast('Max 3 colleges in compare!');
        setTimeout(() => setCompareToast(null), 2000);
      }
    }
  };

  const ratingColor = college.rating >= 4.5 ? '#047857' : college.rating >= 4.0 ? '#b45309' : '#b91c1c';
  const ratingBg = college.rating >= 4.5 ? '#ecfdf5' : college.rating >= 4.0 ? '#fffbeb' : '#fef2f2';

  return (
    <BorderGlow
      edgeSensitivity={30}
      glowColor="210 60 70"
      backgroundColor="#ffffff"
      borderRadius={16}
      glowRadius={20}
      glowIntensity={0.5}
      coneSpread={30}
      colors={['#0b4c8c', '#e28743', '#38bdf8']}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: hovered ? 'translateY(-5px)' : 'translateY(0)',
        boxShadow: hovered 
          ? '0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' 
          : '0 4px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px -1px rgba(0, 0, 0, 0.01)',
      }}
    >
      {/* College Banner Header Image */}
      <div style={{ position: 'relative', height: '140px', overflow: 'hidden', background: '#e2e8f0' }}>
        <img
          src={bannerUrl}
          alt={college.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transform: hovered ? 'scale(1.05)' : 'scale(1)',
            transition: 'transform 0.5s ease',
          }}
        />
        {/* Dark linear gradient overlay at the bottom for readability */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.4) 100%)',
        }} />

        {/* Rating Badge (over image) */}
        <div style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          background: ratingBg,
          border: `1px solid ${ratingColor}20`,
          borderRadius: '8px',
          padding: '4px 8px',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
        }}>
          <Star size={12} fill={ratingColor} color={ratingColor} />
          <span style={{ color: ratingColor, fontSize: '0.8rem', fontWeight: 800 }}>
            {college.rating.toFixed(1)}
          </span>
        </div>

        {/* Established text */}
        <div style={{
          position: 'absolute',
          bottom: '10px',
          left: '12px',
          color: 'rgba(255, 255, 255, 0.9)',
          fontSize: '0.75rem',
          fontWeight: 600,
          textShadow: '0 1px 2px rgba(0,0,0,0.5)',
        }}>
          Estd. {college.established}
        </div>
      </div>

      {/* Card Body */}
      <div style={{ padding: '1.25rem', paddingTop: '1.5rem', position: 'relative' }}>
        {/* Logo Shield overlapping the banner */}
        <div style={{
          position: 'absolute',
          top: '-26px',
          left: '16px',
          width: '52px',
          height: '52px',
          borderRadius: '12px',
          background: '#ffffff',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '3px',
        }}>
          <div style={{
            width: '100%',
            height: '100%',
            borderRadius: '9px',
            background: logoColor.bg,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.15rem',
            fontWeight: 800,
            color: logoColor.text,
          }}>
            {(college.shortName || college.name).charAt(0)}
          </div>
        </div>

        {/* Title Block */}
        <div style={{ marginBottom: '10px', marginTop: '6px' }}>
          <h3 style={{
            color: '#0f172a',
            fontSize: '1.05rem',
            fontWeight: 700,
            marginBottom: '4px',
            lineHeight: 1.35,
            height: '2.7rem', // Restrict to 2 lines
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}>
            {college.shortName || college.name}
          </h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#64748b', fontSize: '0.78rem' }}>
            <MapPin size={12} style={{ color: '#0b4c8c' }} />
            <span>{college.location}</span>
          </div>
        </div>

        {/* Features / Accreditations Tags */}
        <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', marginBottom: '14px', height: '20px', overflow: 'hidden' }}>
          <span style={{
            fontSize: '0.68rem', fontWeight: 700, padding: '1px 6px', borderRadius: '4px',
            background: typeColor.bg, color: typeColor.text, border: `1px solid ${typeColor.border}`,
          }}>
            {college.type}
          </span>
          {college.nirfRank && (
            <span style={{
              fontSize: '0.68rem', fontWeight: 700, padding: '1px 6px', borderRadius: '4px',
              background: '#fffbeb', color: '#b45309', border: '1px solid #fde68a',
            }}>
              NIRF #{college.nirfRank}
            </span>
          )}
          <span style={{
            fontSize: '0.68rem', fontWeight: 700, padding: '1px 6px', borderRadius: '4px',
            background: '#f1f5f9', color: '#475569', border: '1px solid #e2e8f0',
            display: 'inline-flex', alignItems: 'center', gap: '3px'
          }}>
            <ShieldCheck size={10} style={{ color: '#0b4c8c' }} />
            {college.accreditation}
          </span>
        </div>

        {/* Stats Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '8px',
          marginBottom: '16px',
          padding: '10px',
          background: '#f8fafc',
          borderRadius: '12px',
          border: '1px solid #f1f5f9',
        }}>
          <StatItem label="Fees / Yr" value={formatCurrency(college.fees.min)} valueColor="#0f172a" />
          <StatItem label="Placement" value={`${college.placementPercentage}%`} valueColor="#047857" />
          <StatItem label="Avg Package" value={`${college.averagePackage} LPA`} valueColor="#0b4c8c" />
        </div>

        {/* Actions Row */}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          {/* Compare check */}
          <button
            onClick={handleCompare}
            title={inCompare ? 'Remove from compare' : 'Add to compare'}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              border: inCompare ? '1px solid #a7f3d0' : '1px solid #cbd5e1',
              background: inCompare ? '#ecfdf5' : '#ffffff',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: inCompare ? '#047857' : '#64748b',
              transition: 'all 0.2s',
              flexShrink: 0,
            }}
            onMouseEnter={e => { if (!inCompare) { e.currentTarget.style.borderColor = '#0b4c8c'; e.currentTarget.style.color = '#0b4c8c'; } }}
            onMouseLeave={e => { if (!inCompare) { e.currentTarget.style.borderColor = '#cbd5e1'; e.currentTarget.style.color = '#64748b'; } }}
          >
            {inCompare ? <CheckCircle2 size={16} /> : <PlusCircle size={16} />}
          </button>

          {/* Bookmark save */}
          <button
            onClick={handleSave}
            title={saved ? 'Remove from shortlist' : 'Add to shortlist'}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              border: saved ? '1px solid #fed7aa' : '1px solid #cbd5e1',
              background: saved ? '#fff7ed' : '#ffffff',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: saved ? '#c2410c' : '#64748b',
              transition: 'all 0.2s',
              flexShrink: 0,
            }}
            onMouseEnter={e => { if (!saved) { e.currentTarget.style.borderColor = '#e28743'; e.currentTarget.style.color = '#e28743'; } }}
            onMouseLeave={e => { if (!saved) { e.currentTarget.style.borderColor = '#cbd5e1'; e.currentTarget.style.color = '#64748b'; } }}
          >
            {saved ? <BookmarkCheck size={16} /> : <BookmarkPlus size={16} />}
          </button>

          {/* View Details */}
          <Link
            href={PLATFORM_ROUTES.detail(college.id)}
            style={{
              flex: 1,
              height: '36px',
              borderRadius: '10px',
              background: hovered ? '#0b4c8c' : '#ffffff',
              border: hovered ? '1px solid #0b4c8c' : '1px solid #cbd5e1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              textDecoration: 'none',
              color: hovered ? '#ffffff' : '#0b4c8c',
              fontSize: '0.8rem',
              fontWeight: 700,
              transition: 'all 0.2s',
            }}
          >
            Details
            <ArrowRight size={13} />
          </Link>
        </div>
      </div>

      {/* Compare Toast Alert */}
      {compareToast && (
        <div style={{
          position: 'absolute',
          top: '12px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: '#fef2f2',
          border: '1px solid #fca5a5',
          borderRadius: '8px',
          padding: '6px 12px',
          color: '#b91c1c',
          fontSize: '0.75rem',
          fontWeight: 700,
          whiteSpace: 'nowrap',
          zIndex: 10,
          boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
        }}>
          ⚠️ {compareToast}
        </div>
      )}
    </BorderGlow>
  );
}

function StatItem({ label, value, valueColor }: { label: string; value: string; valueColor: string }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontSize: '0.65rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.02em', marginBottom: '2px' }}>
        {label}
      </div>
      <div style={{ color: valueColor, fontSize: '0.85rem', fontWeight: 800 }}>{value}</div>
    </div>
  );
}
