'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, Mail, Phone, MapPin, Globe } from 'lucide-react';
import { PLATFORM_ROUTES } from '@/lib/college-platform/constants';

export function CollegeFooter() {
  return (
    <footer style={{
      background: '#0f172a',
      borderTop: '1px solid #1e293b',
      padding: '4rem 1.5rem 2rem',
      marginTop: '6rem',
      color: '#94a3b8',
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '3rem', marginBottom: '3.5rem' }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.25rem' }}>
              <img
                src="/images/vidyakhoj_logo.png"
                alt="VidyaKhoj Logo"
                style={{ height: '38px', width: 'auto', objectFit: 'contain' }}
              />
            </div>
            <p style={{ color: '#64748b', fontSize: '0.85rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              India&apos;s leading platform for college reviews, placement records, and course comparison. Empowering students since 2026.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.8rem', color: '#64748b' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Phone size={13} />
                +91 11 4050 8080 (9 AM - 6 PM)
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Mail size={13} />
                help@vidyakhoj.in
              </span>
            </div>
          </div>

          {/* Discover */}
          <div>
            <h4 style={{ color: '#ffffff', fontWeight: 700, fontSize: '0.9rem', marginBottom: '1.25rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Discover</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { href: PLATFORM_ROUTES.list + '?type=Government', label: 'Government Institutes' },
                { href: PLATFORM_ROUTES.list + '?type=Private', label: 'Private Colleges' },
                { href: PLATFORM_ROUTES.list + '?type=Deemed', label: 'Deemed Universities' },
                { href: PLATFORM_ROUTES.list + '?sortBy=nirf', label: 'NIRF Top Rankings' },
              ].map(link => (
                <Link
                  key={link.label}
                  href={link.href}
                  style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.85rem', transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#38bdf8')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#94a3b8')}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Tools & Resources */}
          <div>
            <h4 style={{ color: '#ffffff', fontWeight: 700, fontSize: '0.9rem', marginBottom: '1.25rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Decision Tools</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { href: PLATFORM_ROUTES.compare, label: 'Side-by-Side Comparison' },
                { href: PLATFORM_ROUTES.saved, label: 'Your Shortlist' },
                { href: PLATFORM_ROUTES.login, label: 'Sign In' },
                { href: PLATFORM_ROUTES.register, label: 'Create Account' },
              ].map(link => (
                <Link
                  key={link.label}
                  href={link.href}
                  style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.85rem', transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#38bdf8')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#94a3b8')}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Address Info */}
          <div>
            <h4 style={{ color: '#ffffff', fontWeight: 700, fontSize: '0.9rem', marginBottom: '1.25rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Head Office</h4>
            <p style={{ color: '#64748b', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '12px', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
              <MapPin size={16} style={{ flexShrink: 0, marginTop: '2px', color: '#38bdf8' }} />
              <span>
                VidyaKhoj India Pvt. Ltd.<br />
                4th Floor, Statesman House,<br />
                Connaught Place, New Delhi - 110001
              </span>
            </p>
            <p style={{ color: '#64748b', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Globe size={14} style={{ color: '#38bdf8' }} />
              www.vidyakhoj.in
            </p>
          </div>
        </div>

        {/* Disclaimer Area (makes site feel highly genuine) */}
        <div style={{
          borderTop: '1px solid #1e293b',
          borderBottom: '1px solid #1e293b',
          padding: '1.25rem 0',
          marginBottom: '1.5rem',
        }}>
          <p style={{ color: '#475569', fontSize: '0.75rem', lineHeight: 1.6, margin: 0, textAlign: 'justify' }}>
            <strong>Disclaimer:</strong> VidyaKhoj is an academic research demonstration platform developed for evaluation purposes. All metrics, ratings, placements packages, course options, and accreditation data (such as NAAC, NIRF, and fee limits) simulated in this application are mock values. Students are advised to verify details directly from the official websites of the respective universities or governing authorities.
          </p>
        </div>

        {/* Bottom copyright */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: '1rem',
        }}>
          <p style={{ color: '#475569', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '6px', margin: 0 }}>
            © {new Date().getFullYear()} VidyaKhoj India. Made with <Heart size={12} style={{ color: '#ef4444' }} fill="#ef4444" /> for students nationwide.
          </p>
          <div style={{ display: 'flex', gap: '16px', fontSize: '0.8rem' }}>
            <span style={{ color: '#475569' }}>Privacy Policy</span>
            <span style={{ color: '#475569' }}>Terms of Use</span>
            <span style={{ color: '#475569' }}>Sitemap</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
