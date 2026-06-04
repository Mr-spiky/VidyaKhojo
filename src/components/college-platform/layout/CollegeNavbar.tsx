'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/lib/college-platform/contexts/AuthContext';
import { useSaved } from '@/lib/college-platform/contexts/SavedContext';
import { useCompare } from '@/lib/college-platform/contexts/CompareContext';
import { PLATFORM_ROUTES } from '@/lib/college-platform/constants';
import { MOCK_COLLEGES } from '@/lib/college-platform/data';
import {
  GraduationCap, BookmarkCheck, BarChart3, LogOut, LogIn,
  Menu, X, ChevronDown, Search, SearchCode
} from 'lucide-react';

export function CollegeNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const { savedColleges } = useSaved();
  const { compareList } = useCompare();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchVal, setSearchVal] = useState('');
  const [suggestions, setSuggestions] = useState<typeof MOCK_COLLEGES>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (searchVal.trim().length >= 2) {
      const query = searchVal.toLowerCase();
      const filtered = MOCK_COLLEGES.filter(c =>
        c.name.toLowerCase().includes(query) ||
        (c.shortName && c.shortName.toLowerCase().includes(query)) ||
        c.location.toLowerCase().includes(query)
      ).slice(0, 5);
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [searchVal]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (suggestionRef.current && !suggestionRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { href: PLATFORM_ROUTES.list, label: 'All Colleges', icon: <GraduationCap size={16} /> },
    { href: PLATFORM_ROUTES.compare, label: 'Compare Platform', icon: <BarChart3 size={16} />, badge: compareList.length > 0 ? compareList.length : null },
    { href: PLATFORM_ROUTES.saved, label: 'Shortlist', icon: <BookmarkCheck size={16} />, badge: user && savedColleges.length > 0 ? savedColleges.length : null },
  ];

  return (
    <nav
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: '#ffffff',
        borderBottom: '1px solid #e2e8f0',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '70px', gap: '16px' }}>
          <Link
            href={PLATFORM_ROUTES.home}
            style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', flexShrink: 0 }}
          >
            <img
              src="/images/vidyakhoj_logo.png"
              alt="VidyaKhoj Logo"
              style={{ height: '48px', width: 'auto', objectFit: 'contain' }}
            />
          </Link>


          {/* Center Search suggestions bar (Genuine feature) */}
          <div style={{ position: 'relative', flex: 1, maxWidth: '420px' }} ref={suggestionRef} className="nav-search-container">
            <div style={{ position: 'relative' }}>
              <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
              <input
                type="text"
                placeholder="Search colleges, cities, states..."
                value={searchVal}
                onChange={e => { setSearchVal(e.target.value); setShowSuggestions(true); }}
                onFocus={() => setShowSuggestions(true)}
                style={{
                  width: '100%',
                  padding: '9px 12px 9px 36px',
                  borderRadius: '20px',
                  border: '1px solid #cbd5e1',
                  background: '#f8fafc',
                  outline: 'none',
                  fontSize: '0.85rem',
                  color: '#0f172a',
                  transition: 'all 0.2s',
                  boxSizing: 'border-box',
                }}
                onFocusCapture={e => {
                  e.currentTarget.style.borderColor = '#0b4c8c';
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(11, 76, 140, 0.15)';
                  e.currentTarget.style.background = '#ffffff';
                }}
                onBlurCapture={e => {
                  e.currentTarget.style.borderColor = '#cbd5e1';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.background = '#f8fafc';
                }}
              />
            </div>
            {showSuggestions && suggestions.length > 0 && (
              <div style={{
                position: 'absolute',
                top: 'calc(100% + 6px)',
                left: 0, right: 0,
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
                padding: '6px',
                zIndex: 200,
              }}>
                <div style={{ padding: '6px 12px', fontSize: '0.7rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Matching Colleges
                </div>
                {suggestions.map(college => (
                  <div
                    key={college.id}
                    onClick={() => {
                      router.push(PLATFORM_ROUTES.detail(college.id));
                      setShowSuggestions(false);
                      setSearchVal('');
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      transition: 'background 0.2s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = '#f1f5f9'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <div style={{
                      width: '30px', height: '30px', borderRadius: '6px',
                      background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '0.8rem', fontWeight: 700, color: '#0b4c8c',
                    }}>
                      {(college.shortName || college.name).charAt(0)}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#1e293b', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {college.shortName}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: '#64748b', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {college.name} • {college.location}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Desktop Nav */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }} className="nav-desktop">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  display: 'flex', alignItems: 'center', gap: '6px',
                  padding: '8px 14px', borderRadius: '8px', textDecoration: 'none',
                  fontSize: '0.875rem', fontWeight: 600, position: 'relative',
                  color: pathname?.startsWith(link.href) ? '#0b4c8c' : '#475569',
                  background: pathname?.startsWith(link.href) ? '#eff6ff' : 'transparent',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => {
                  if (!pathname?.startsWith(link.href)) {
                    e.currentTarget.style.color = '#0b4c8c';
                    e.currentTarget.style.background = '#f8fafc';
                  }
                }}
                onMouseLeave={e => {
                  if (!pathname?.startsWith(link.href)) {
                    e.currentTarget.style.color = '#475569';
                    e.currentTarget.style.background = 'transparent';
                  }
                }}
              >
                {link.icon}
                {link.label}
                {link.badge !== null && link.badge !== undefined && (
                  <span style={{
                    position: 'absolute', top: '-2px', right: '-4px',
                    background: '#e28743', color: 'white',
                    fontSize: '0.65rem', fontWeight: 800,
                    minWidth: '16px', height: '16px', borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    padding: '0 2px',
                  }}>
                    {link.badge}
                  </span>
                )}
              </Link>
            ))}

            {/* Divider */}
            <div style={{ width: '1px', height: '20px', background: '#cbd5e1', margin: '0 8px' }} />

            {/* Auth */}
            {user ? (
              <div style={{ position: 'relative' }}>
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '8px',
                    padding: '6px 12px', borderRadius: '8px', border: '1px solid #cbd5e1',
                    background: '#ffffff', cursor: 'pointer',
                    color: '#1e293b', fontSize: '0.875rem', fontWeight: 600,
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'}
                  onMouseLeave={e => e.currentTarget.style.background = '#ffffff'}
                >
                  <div style={{
                    width: '24px', height: '24px', borderRadius: '50%',
                    background: '#0b4c8c',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.75rem', fontWeight: 700, color: 'white',
                  }}>
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  {user.name.split(' ')[0]}
                  <ChevronDown size={14} />
                </button>
                {userMenuOpen && (
                  <div style={{
                    position: 'absolute', top: 'calc(100% + 6px)', right: 0,
                    background: '#ffffff', border: '1px solid #e2e8f0',
                    borderRadius: '10px', padding: '6px', minWidth: '150px',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                    zIndex: 200,
                  }}>
                    <button
                      onClick={() => { logout(); setUserMenuOpen(false); }}
                      style={{
                        display: 'flex', alignItems: 'center', gap: '8px',
                        width: '100%', padding: '8px 10px', borderRadius: '6px',
                        border: 'none', background: 'transparent', cursor: 'pointer',
                        color: '#ef4444', fontSize: '0.85rem', fontWeight: 600,
                        transition: 'background 0.2s',
                        textAlign: 'left',
                      }}
                      onMouseEnter={e => (e.currentTarget.style.background = '#fef2f2')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                    >
                      <LogOut size={14} />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href={PLATFORM_ROUTES.login}
                style={{
                  display: 'flex', alignItems: 'center', gap: '6px',
                  padding: '8px 18px', borderRadius: '20px', textDecoration: 'none',
                  background: '#0b4c8c',
                  color: 'white', fontSize: '0.875rem', fontWeight: 700,
                  boxShadow: '0 4px 12px rgba(11, 76, 140, 0.2)',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = '#1d4ed8';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = '#0b4c8c';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <LogIn size={14} />
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="nav-mobile-btn"
            style={{
              display: 'none', padding: '8px', border: 'none',
              background: 'transparent', cursor: 'pointer', color: '#1e293b',
            }}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div style={{
            padding: '1rem 0 1.25rem', borderTop: '1px solid #e2e8f0',
            display: 'flex', flexDirection: 'column', gap: '4px',
          }}>
            <div style={{ padding: '0 8px 12px' }} className="mobile-search-wrapper">
              <div style={{ position: 'relative' }}>
                <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
                <input
                  type="text"
                  placeholder="Search colleges..."
                  value={searchVal}
                  onChange={e => { setSearchVal(e.target.value); }}
                  style={{
                    width: '100%',
                    padding: '9px 12px 9px 36px',
                    borderRadius: '20px',
                    border: '1px solid #cbd5e1',
                    background: '#f8fafc',
                    outline: 'none',
                    fontSize: '0.85rem',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
            </div>

            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '10px',
                  padding: '11px 16px', borderRadius: '8px', textDecoration: 'none',
                  color: pathname?.startsWith(link.href) ? '#0b4c8c' : '#475569',
                  background: pathname?.startsWith(link.href) ? '#eff6ff' : 'transparent',
                  fontSize: '0.95rem', fontWeight: 600,
                }}
              >
                {link.icon}
                {link.label}
                {link.badge !== null && link.badge !== undefined && (
                  <span style={{
                    background: '#e28743', color: 'white',
                    fontSize: '0.65rem', fontWeight: 800,
                    padding: '1px 6px', borderRadius: '10px',
                  }}>
                    {link.badge}
                  </span>
                )}
              </Link>
            ))}
            <div style={{ height: '1px', background: '#e2e8f0', margin: '8px 0' }} />
            {user ? (
              <button
                onClick={() => { logout(); setMobileOpen(false); }}
                style={{
                  display: 'flex', alignItems: 'center', gap: '10px',
                  padding: '11px 16px', borderRadius: '8px', border: 'none',
                  background: 'transparent', cursor: 'pointer',
                  color: '#ef4444', fontSize: '0.95rem', fontWeight: 600, textAlign: 'left',
                }}
              >
                <LogOut size={16} />
                Sign Out ({user.name})
              </button>
            ) : (
              <Link
                href={PLATFORM_ROUTES.login}
                onClick={() => setMobileOpen(false)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '10px',
                  padding: '11px 16px', borderRadius: '20px', textDecoration: 'none',
                  background: '#0b4c8c',
                  color: 'white', fontSize: '0.95rem', fontWeight: 700,
                  justifyContent: 'center',
                }}
              >
                <LogIn size={16} />
                Sign In
              </Link>
            )}
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-search-container { display: none !important; }
          .nav-mobile-btn { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}
