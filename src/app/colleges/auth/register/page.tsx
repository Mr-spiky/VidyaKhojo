'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/college-platform/contexts/AuthContext';
import { PLATFORM_ROUTES } from '@/lib/college-platform/constants';
import { Mail, Lock, User, Eye, EyeOff, UserPlus } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    const result = await register(name, email, password);
    setIsSubmitting(false);
    if (result.success) {
      router.push(PLATFORM_ROUTES.saved);
    } else {
      setError(result.error || 'Registration failed');
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '12px 14px 12px 42px',
    background: '#ffffff',
    border: '1px solid #cbd5e1', borderRadius: '10px',
    outline: 'none', color: '#0f172a', fontSize: '0.95rem',
    transition: 'all 0.2s', boxSizing: 'border-box',
  };

  return (
    <div style={{
      minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '3rem 1.5rem',
      background: 'radial-gradient(50% 100% at 50% 0%, #eff6ff 0%, #f8fafc 100%)',
    }}>
      <div style={{ width: '100%', maxWidth: '420px' }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <img
            src="/images/vidyakhoj_logo.png"
            alt="VidyaKhoj Logo"
            style={{ height: '60px', width: 'auto', objectFit: 'contain', margin: '0 auto 1.25rem' }}
          />
          <h1 style={{
            fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.02em',
            color: '#0f172a',
            marginBottom: '6px',
          }}>
            Create Account
          </h1>
          <p style={{ color: '#64748b', fontSize: '0.9rem', fontWeight: 550 }}>Join VidyaKhoj — it&apos;s free!</p>
        </div>

        {/* Form Card */}
        <div style={{
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '20px', padding: '2rem',
          boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05), 0 8px 10px -6px rgba(0,0,0,0.05)',
        }}>
          {error && (
            <div style={{
              padding: '10px 14px', borderRadius: '8px',
              background: '#fef2f2', border: '1px solid #fca5a5',
              color: '#b91c1c', fontSize: '0.85rem', marginBottom: '1.25rem',
              fontWeight: 600,
            }}>
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Name */}
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ color: '#475569', fontSize: '0.825rem', fontWeight: 700, display: 'block', marginBottom: '6px' }}>
                Full Name
              </label>
              <div style={{ position: 'relative' }}>
                <User size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
                <input
                  id="register-name"
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Your full name"
                  required
                  style={inputStyle}
                  onFocus={e => {
                    e.target.style.borderColor = '#0b4c8c';
                    e.target.style.boxShadow = '0 0 0 3px rgba(11, 76, 140, 0.1)';
                  }}
                  onBlur={e => {
                    e.target.style.borderColor = '#cbd5e1';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>
            </div>

            {/* Email */}
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ color: '#475569', fontSize: '0.825rem', fontWeight: 700, display: 'block', marginBottom: '6px' }}>
                Email Address
              </label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
                <input
                  id="register-email"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  style={inputStyle}
                  onFocus={e => {
                    e.target.style.borderColor = '#0b4c8c';
                    e.target.style.boxShadow = '0 0 0 3px rgba(11, 76, 140, 0.1)';
                  }}
                  onBlur={e => {
                    e.target.style.borderColor = '#cbd5e1';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>
            </div>

            {/* Password */}
            <div style={{ marginBottom: '1.75rem' }}>
              <label style={{ color: '#475569', fontSize: '0.825rem', fontWeight: 700, display: 'block', marginBottom: '6px' }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <Lock size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
                <input
                  id="register-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Minimum 6 characters"
                  required
                  style={{ ...inputStyle, paddingRight: '42px' }}
                  onFocus={e => {
                    e.target.style.borderColor = '#0b4c8c';
                    e.target.style.boxShadow = '0 0 0 3px rgba(11, 76, 140, 0.1)';
                  }}
                  onBlur={e => {
                    e.target.style.borderColor = '#cbd5e1';
                    e.target.style.boxShadow = 'none';
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)',
                    border: 'none', background: 'none', cursor: 'pointer', color: '#64748b', display: 'flex',
                  }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {password && password.length < 6 && (
                <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '4px', fontWeight: 600 }}>
                  ⚠️ Password must be at least 6 characters
                </p>
              )}
            </div>

            <button
              id="register-submit"
              type="submit"
              disabled={isSubmitting}
              style={{
                width: '100%', padding: '13px',
                background: isSubmitting ? '#93c5fd' : '#0b4c8c',
                border: 'none', borderRadius: '30px', cursor: isSubmitting ? 'not-allowed' : 'pointer',
                color: 'white', fontSize: '0.95rem', fontWeight: 700,
                boxShadow: isSubmitting ? 'none' : '0 4px 12px rgba(11, 76, 140, 0.25)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => {
                if (!isSubmitting) {
                  e.currentTarget.style.background = '#1d4ed8';
                }
              }}
              onMouseLeave={e => {
                if (!isSubmitting) {
                  e.currentTarget.style.background = '#0b4c8c';
                }
              }}
            >
              {isSubmitting ? (
                <>
                  <div style={{ width: '16px', height: '16px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
                  Creating account...
                </>
              ) : (
                <>
                  <UserPlus size={17} />
                  Create Free Account
                </>
              )}
            </button>
          </form>
        </div>

        <p style={{ textAlign: 'center', color: '#64748b', fontSize: '0.9rem', marginTop: '1.5rem', fontWeight: 550 }}>
          Already have an account?{' '}
          <Link href={PLATFORM_ROUTES.login} style={{ color: '#0b4c8c', textDecoration: 'none', fontWeight: 700 }}>
            Sign in
          </Link>
        </p>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
