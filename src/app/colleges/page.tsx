'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import BorderGlow from '@/components/ui/BorderGlow';
import ElectricBorder from '@/components/ui/ElectricBorder';
import DotGrid from '@/components/ui/DotGrid';
import SpotlightCard from '@/components/ui/SpotlightCard';
import { PLATFORM_ROUTES } from '@/lib/college-platform/constants';
import { MOCK_COLLEGES } from '@/lib/college-platform/data';
import {
  ArrowRight, GraduationCap, Search, BarChart3,
  BookmarkCheck, Star, TrendingUp, Shield,
  BookOpen, Landmark, Award, Users, MapPin,
  Calendar, ChevronLeft, ChevronRight, Clock,
  Send, Sparkles, CheckCircle
} from 'lucide-react';

const QUICK_CATEGORIES = [
  { label: 'Engineering', count: '180+ Colleges', sub: 'B.Tech, M.Tech, Diploma', color: '#eff6ff', textColor: '#1e40af', icon: <BookOpen size={24} /> },
  { label: 'Management', count: '120+ Colleges', sub: 'MBA, BBA, PGDM', color: '#faf5ff', textColor: '#6b21a8', icon: <TrendingUp size={24} /> },
  { label: 'Science', count: '90+ Colleges', sub: 'B.Sc, M.Sc, Research', color: '#ecfdf5', textColor: '#065f46', icon: <GraduationCap size={24} /> },
  { label: 'Commerce', count: '60+ Colleges', sub: 'B.Com, M.Com, CA', color: '#fffbeb', textColor: '#92400e', icon: <Landmark size={24} /> },
];

const FEATURES = [
  {
    icon: <Search size={22} />,
    title: 'Smart Filtering & Search',
    desc: 'Filter colleges dynamically by location, budget limits, ratings, and stream. Find exactly what fits your profile.',
  },
  {
    icon: <BarChart3 size={22} />,
    title: 'Side-by-Side Comparison',
    desc: 'Compare up to 3 institutions simultaneously. Contrast tuition fees, placement averages, and accreditations side-by-side.',
  },
  {
    icon: <BookmarkCheck size={22} />,
    title: 'Shortlist Syncing',
    desc: 'Save your top-choice colleges for later review. Syncs to your dashboard so you never lose your progress.',
  },
  {
    icon: <Star size={22} />,
    title: 'Verified Student Reviews',
    desc: 'Read authentic ratings and reviews from verified alumni covering campus life, placements, academics, and hostels.',
  },
  {
    icon: <TrendingUp size={22} />,
    title: 'Detailed Placement Insights',
    desc: 'Evaluate salary packages, placement percentages, and top recruiting companies before submitting applications.',
  },
  {
    icon: <Shield size={22} />,
    title: 'Accreditation & NIRF Badges',
    desc: 'Quickly access national rankings and official accreditation statuses (NAAC ratings, UGC approvals).',
  },
];

const PLATFORM_STATS = [
  { value: '50K+', label: 'Students Helped', desc: 'Found their campus era', icon: <Users size={22} /> },
  { value: '450+', label: 'Colleges Listed', desc: 'Verified and ranked', icon: <GraduationCap size={22} /> },
  { value: '1.2L+', label: 'Verified Reviews', desc: '100% real student reviews', icon: <Star size={22} /> },
  { value: '28', label: 'States Covered', desc: 'Pan-India opportunities', icon: <MapPin size={22} /> },
  { value: 'Since 2019', label: 'Trusted Companion', desc: 'Zero bias, just facts', icon: <Calendar size={22} /> },
];

const HOW_IT_WORKS_STEPS = [
  {
    step: '01',
    title: 'Vibe-Check Options',
    desc: 'Search colleges based on stream, budget, or exam scores. Real stats only—no gatekeeping.',
    icon: <Search size={22} />,
  },
  {
    step: '02',
    title: 'Compare Side-by-Side',
    desc: 'Contrast tuition fees, packages, and ratings. No sponsored rankings, just absolute facts.',
    icon: <BarChart3 size={22} />,
  },
  {
    step: '03',
    title: 'Claim Your Future',
    desc: 'Shortlist your top picks, track application dates, and finalize your next academic chapter.',
    icon: <BookmarkCheck size={22} />,
  },
];

const EXAMS = [
  { name: 'JEE Main', color: '#eff6ff', textColor: '#1e40af' },
  { name: 'JEE Advanced', color: '#eff6ff', textColor: '#1e40af' },
  { name: 'NEET', color: '#ecfdf5', textColor: '#065f46' },
  { name: 'CAT', color: '#faf5ff', textColor: '#6b21a8' },
  { name: 'CLAT', color: '#fffbeb', textColor: '#92400e' },
  { name: 'GATE', color: '#fef2f2', textColor: '#991b1b' },
  { name: 'GMAT', color: '#eff6ff', textColor: '#1e40af' },
  { name: 'XAT', color: '#faf5ff', textColor: '#6b21a8' },
  { name: 'SNAP', color: '#ecfdf5', textColor: '#065f46' },
  { name: 'MAT', color: '#fffbeb', textColor: '#92400e' },
  { name: 'CMAT', color: '#eff6ff', textColor: '#1e40af' },
  { name: 'NDA', color: '#fef2f2', textColor: '#991b1b' },
  { name: 'CDS', color: '#fef2f2', textColor: '#991b1b' },
  { name: 'CUET', color: '#ecfdf5', textColor: '#065f46' }
];

const TESTIMONIALS = [
  {
    name: 'Arjun Sharma',
    college: 'IIT Bombay',
    course: 'B.Tech Computer Science',
    avatarBg: '#0b4c8c',
    rating: 5,
    quote: 'Honestly, VidyaKhoj is a lifesaver. Comparing placement percentages and packages side-by-side helped me lock in CS with full clarity. Legit the most transparent platform out there. 10/10 recommended! 🔥'
  },
  {
    name: 'Kavita Nair',
    college: 'IIM Ahmedabad',
    course: 'MBA General',
    avatarBg: '#6b21a8',
    rating: 5,
    quote: 'No sponsored ranks, just pure facts. The reviews are extremely detailed and verified. I could check actual alumni testimonials about hostel life and campus vibes before applying. Saved me weeks of stress!'
  },
  {
    name: 'Meera Krishnan',
    college: 'IIT Madras',
    course: 'B.Tech Electrical',
    avatarBg: '#065f46',
    rating: 4.8,
    quote: "The comparison tool is an absolute flex. Putting three tier-1 universities next to each other made my decision so much clearer. It's clean, easy, and doesn't spam your phone with sales calls."
  },
  {
    name: 'Rohan Das',
    college: 'Delhi Technological University',
    course: 'B.Tech Mechanical',
    avatarBg: '#b45309',
    rating: 5,
    quote: "If you're confused about college budgets and placement stats, just use VidyaKhoj. Clear UI, smart filters, and zero BS. Best discovery tool for Gen-Z students trying to navigate admissions."
  }
];

const ALERTS = [
  '⏰ JEE Advanced 2026: Registration closes in 12 days. Don\'t sleep on this! ⚡',
  '🔥 CAT 2026: Registration begins August 5. Get ready to level up your prep!',
  '⚡ NEET UG 2026: Counselling starts next week. Keep your documents handy!',
  '🎓 CUET 2026: 250+ Universities accepting scores. Vibe-check matching campuses now!'
];

// Top ranked colleges for hero section
const TOP_COLLEGES = MOCK_COLLEGES.filter(c => c.nirfRank && c.nirfRank <= 4).slice(0, 3);

export default function CollegesLandingPage() {
  const [activeAlert, setActiveAlert] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [emailError, setEmailError] = useState('');

  // Ticker rotation
  useEffect(() => {
    const alertInterval = setInterval(() => {
      setActiveAlert((prev) => (prev + 1) % ALERTS.length);
    }, 4000);
    return () => clearInterval(alertInterval);
  }, []);

  // Testimonials rotation
  useEffect(() => {
    const testimonialInterval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(testimonialInterval);
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setEmailError('Please enter a valid email address.');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Invalid email format. Try again!');
      return;
    }
    setEmailError('');
    setIsSubscribed(true);
    setEmail('');
  };

  const handleNextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const handlePrevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  return (
    <div style={{ color: '#1e293b', background: '#f8fafc', paddingBottom: '3rem' }}>
      
      {/* CSS Animations & Scroll Styles Inject */}
      <style jsx global>{`
        @keyframes fadeInOut {
          0% { opacity: 0; transform: translateY(8px); }
          10% { opacity: 1; transform: translateY(0); }
          90% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-8px); }
        }
        .animate-ticker-item {
          animation: fadeInOut 4s infinite ease-in-out;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .subscription-form {
          display: flex;
          flex-direction: column;
          gap: 10px;
          justify-content: center;
          align-items: center;
          width: 100%;
          max-width: 500px;
          margin: 0 auto;
        }
        @media (min-width: 640px) {
          .subscription-form {
            flex-direction: row;
          }
        }
      `}</style>

      {/* HERO SECTION */}
      <section style={{
        position: 'relative', overflow: 'hidden',
        minHeight: '100vh',
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        padding: '5.5rem 1.5rem 4.5rem',
        textAlign: 'center',
        background: 'radial-gradient(50% 120% at 50% 0%, #eff6ff 0%, transparent 100%)',
      }}>
        {/* Background Illustration */}
        <img
          src="/images/hero_bg.png"
          alt=""
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center center',
            opacity: 0.62,
            display: 'block',
            zIndex: 0,
            pointerEvents: 'none',
          }}
        />
        {/* Background DotGrid */}
        <div style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 1, pointerEvents: 'none', opacity: 0.45 }}>
          <DotGrid
            dotSize={5}
            gap={18}
            baseColor="#c7d2fe"
            activeColor="#0b4c8c"
            proximity={120}
            shockRadius={200}
            shockStrength={3}
            resistance={800}
            returnDuration={1.2}
          />
        </div>
        <div style={{ maxWidth: '850px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          
          {/* Animated Deadline Ticker Pill */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            padding: '6px 14px', borderRadius: '20px',
            background: 'rgba(249, 115, 22, 0.08)', border: '1px solid rgba(249, 115, 22, 0.2)',
            fontSize: '0.8rem', fontWeight: 600, color: '#c2410c',
            marginBottom: '1.5rem',
            minHeight: '34px',
            overflow: 'hidden',
            width: '100%',
            maxWidth: '520px'
          }}>
            <div key={activeAlert} className="animate-ticker-item" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Clock size={13} style={{ color: '#ea580c' }} />
              <span>{ALERTS[activeAlert]}</span>
            </div>
          </div>

          <h1 style={{
            fontSize: 'clamp(2.25rem, 5.5vw, 3.75rem)',
            fontWeight: 800, lineHeight: 1.15,
            letterSpacing: '-0.02em', marginBottom: '1.25rem',
            color: '#0f172a',
          }}>
            Find the College That<br />
            Matches Your{' '}
            <span style={{
              background: 'linear-gradient(135deg, #0b4c8c 0%, #1e40af 50%, #e28743 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>
              Vibe & Goals
            </span>
          </h1>

          <p style={{
            fontSize: '1.1rem', color: '#475569', lineHeight: 1.6,
            marginBottom: '2.5rem', maxWidth: '640px', margin: '0 auto 2.5rem',
          }}>
            Stop doom-scrolling. Compare placements, tuition fees, and verified student reviews of India&apos;s top universities. No cap, just raw facts. 🎓
          </p>

          {/* Call to Actions */}
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
            <Link
              href={PLATFORM_ROUTES.list}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '13px 26px', borderRadius: '30px', textDecoration: 'none',
                background: '#0b4c8c',
                color: 'white', fontSize: '0.95rem', fontWeight: 700,
                boxShadow: '0 8px 20px rgba(11, 76, 140, 0.25)',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 10px 22px rgba(11, 76, 140, 0.35)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(11, 76, 140, 0.25)';
              }}
            >
              Start College Search
              <ArrowRight size={16} />
            </Link>
            <Link
              href={PLATFORM_ROUTES.compare}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '13px 26px', borderRadius: '30px', textDecoration: 'none',
                background: '#ffffff',
                border: '1px solid #cbd5e1',
                color: '#1e293b', fontSize: '0.95rem', fontWeight: 700,
                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 12px -1px rgba(0,0,0,0.08)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0,0,0,0.05)';
              }}
            >
              <BarChart3 size={16} style={{ color: '#e28743' }} />
              Compare Instantly
            </Link>
          </div>

          {/* Social Proof Micro Stats */}
          <div style={{
            display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap',
            color: '#64748b', fontSize: '0.85rem', fontWeight: 500,
          }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ color: '#10b981' }}>✓</span> 50,000+ Students Helped
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ color: '#10b981' }}>✓</span> 450+ Verified Colleges
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ color: '#10b981' }}>✓</span> 100% Free
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ color: '#10b981' }}>✓</span> No Bias, No Spam
            </span>
          </div>

        </div>
      </section>

      {/* PLATFORM STATS / TRUST STRIP */}
      <section style={{
        background: '#ffffff',
        borderTop: '1px solid #e2e8f0',
        borderBottom: '1px solid #e2e8f0',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.02)',
        padding: '2.5rem 1.5rem',
        position: 'relative',
        zIndex: 10,
        marginTop: '-2rem',
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2rem',
            textAlign: 'center',
          }}>
            {PLATFORM_STATS.map((stat, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{
                  width: '42px', height: '42px', borderRadius: '50%',
                  background: '#f1f5f9', color: '#0b4c8c',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '0.75rem'
                }}>
                  {stat.icon}
                </div>
                <h3 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', margin: '0 0 4px' }}>
                  {stat.value}
                </h3>
                <span style={{ color: '#475569', fontSize: '0.85rem', fontWeight: 700, marginBottom: '2px' }}>
                  {stat.label}
                </span>
                <span style={{ color: '#94a3b8', fontSize: '0.75rem' }}>
                  {stat.desc}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QUICK CATEGORIES GRID */}
      <section style={{ padding: '4rem 1.5rem 3.5rem' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: '#e28743', letterSpacing: '0.1em', display: 'block', marginBottom: '6px' }}>
              CHOOSE YOUR STREAM
            </span>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
              Find Colleges by Stream
            </h2>
          </div>
          
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.25rem',
          }}>
            {QUICK_CATEGORIES.map(cat => (
              <Link
                key={cat.label}
                href={`${PLATFORM_ROUTES.list}?type=Government`} // placeholder link
                style={{ textDecoration: 'none' }}
              >
                <div style={{
                  padding: '1.25rem',
                  background: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '16px',
                  display: 'flex', gap: '14px', alignItems: 'center',
                  transition: 'all 0.2s',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.01)',
                  cursor: 'pointer',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.05)';
                  e.currentTarget.style.borderColor = '#0b4c8c';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.01)';
                  e.currentTarget.style.borderColor = '#e2e8f0';
                }}
              >
                <div style={{
                  width: '46px', height: '46px', borderRadius: '12px',
                  background: cat.color, color: cat.textColor,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  {cat.icon}
                </div>
                <div>
                  <h4 style={{ color: '#0f172a', fontSize: '0.95rem', fontWeight: 700, margin: '0 0 2px' }}>{cat.label}</h4>
                  <span style={{ color: '#64748b', fontSize: '0.75rem', display: 'block', marginBottom: '2px', fontWeight: 500 }}>{cat.sub}</span>
                  <span style={{ color: '#e28743', fontSize: '0.78rem', fontWeight: 700 }}>{cat.count}</span>
                </div>
              </div>
            </Link>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section style={{
        background: '#f1f5f9',
        padding: '4rem 1.5rem',
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: '#0b4c8c', letterSpacing: '0.1em', display: 'block', marginBottom: '6px' }}>
              OUR PLAYBOOK
            </span>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', margin: '0 0 10px' }}>
              How VidyaKhoj Works
            </h2>
            <p style={{ color: '#64748b', fontSize: '0.88rem', maxWidth: '480px', margin: '0 auto' }}>
              Shortlisting your next campus era in three straightforward moves. Simple as that.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem',
            position: 'relative',
          }}>
            {HOW_IT_WORKS_STEPS.map((step, i) => (
              <div key={i} style={{
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '20px',
                padding: '2rem 1.5rem',
                position: 'relative',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.02)',
                transition: 'all 0.3s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 15px 25px -5px rgba(11, 76, 140, 0.08)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.02)';
              }}
              >
                <div style={{
                  position: 'absolute', top: '1.5rem', right: '1.5rem',
                  fontSize: '2.5rem', fontWeight: 900, color: '#eff6ff',
                  lineHeight: 1, zIndex: 1
                }}>
                  {step.step}
                </div>
                
                <div style={{
                  width: '48px', height: '48px', borderRadius: '12px',
                  background: '#eff6ff', color: '#0b4c8c',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '1.5rem',
                  position: 'relative',
                  zIndex: 2,
                }}>
                  {step.icon}
                </div>

                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem', position: 'relative', zIndex: 2 }}>
                  {step.title}
                </h3>
                <p style={{ color: '#475569', fontSize: '0.85rem', lineHeight: 1.6, margin: 0, position: 'relative', zIndex: 2 }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* POPULAR ENTRANCE EXAMS STRIP */}
      <section style={{ padding: '3.5rem 1.5rem 2rem', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.25rem' }}>
            <Sparkles size={16} style={{ color: '#e28743' }} />
            <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Which exam is your vibe? 🎯
            </span>
          </div>

          <div 
            className="hide-scrollbar"
            style={{
              display: 'flex',
              gap: '10px',
              overflowX: 'auto',
              paddingBottom: '10px',
              cursor: 'grab',
            }}
          >
            {EXAMS.map((exam, i) => (
              <Link 
                key={i} 
                href={PLATFORM_ROUTES.list} 
                style={{ textDecoration: 'none' }}
              >
                <div style={{
                  padding: '8px 18px',
                  borderRadius: '30px',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  background: exam.color,
                  color: exam.textColor,
                  border: `1px solid ${exam.textColor}15`,
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.05)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
                >
                  {exam.name}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED / TOP RANKED COLLEGES */}
      <section style={{ padding: '2rem 1.5rem 4rem' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: '#e28743', letterSpacing: '0.1em', display: 'block', marginBottom: '6px' }}>
                ELITE CAMPUSES
              </span>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.02em', color: '#0f172a', marginBottom: '4px' }}>
                🏆 Top Tier Institutions
              </h2>
              <p style={{ color: '#64748b', fontSize: '0.88rem', margin: 0 }}>Highest rated colleges indexed in India</p>
            </div>
            <Link
              href={PLATFORM_ROUTES.list + '?sortBy=nirf'}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                color: '#0b4c8c', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 700,
              }}
            >
              View Catalogue <ArrowRight size={14} />
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {TOP_COLLEGES.map((college) => {
              const ratingColor = college.rating >= 4.5 ? '#047857' : '#b45309';
              const ratingBg = college.rating >= 4.5 ? '#ecfdf5' : '#fffbeb';
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
              return (
                <Link
                  key={college.id}
                  href={PLATFORM_ROUTES.detail(college.id)}
                  style={{ textDecoration: 'none' }}
                >
                  <BorderGlow
                    edgeSensitivity={30}
                    glowColor="210 60 70"
                    backgroundColor="#ffffff"
                    borderRadius={16}
                    glowRadius={20}
                    glowIntensity={0.5}
                    coneSpread={30}
                    colors={['#0b4c8c', '#e28743', '#38bdf8']}
                    style={{
                      transition: 'all 0.3s',
                      cursor: 'pointer',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.02)',
                    }}
                  >
                    <div style={{ height: '120px', position: 'relative', background: '#cbd5e1' }}>
                      <img
                        src={bannerUrl}
                        alt={college.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                      <div style={{
                        position: 'absolute', top: '10px', right: '10px',
                        background: ratingBg, border: `1px solid ${ratingColor}20`,
                        borderRadius: '6px', padding: '3px 8px',
                        display: 'flex', alignItems: 'center', gap: '3px',
                      }}>
                        <Star size={11} fill={ratingColor} color={ratingColor} />
                        <span style={{ color: ratingColor, fontSize: '0.78rem', fontWeight: 800 }}>{college.rating.toFixed(1)}</span>
                      </div>
                      <div style={{
                        position: 'absolute', bottom: '8px', left: '12px',
                        background: 'rgba(15, 23, 42, 0.7)',
                        borderRadius: '4px', padding: '2px 8px',
                        color: 'white', fontSize: '0.7rem', fontWeight: 700,
                      }}>
                        NIRF Ranked #{college.nirfRank}
                      </div>
                    </div>

                    <div style={{ padding: '1.25rem' }}>
                      <h3 style={{ color: '#0f172a', fontSize: '1rem', fontWeight: 700, marginBottom: '6px' }}>
                        {college.shortName}
                      </h3>
                      <p style={{ color: '#64748b', fontSize: '0.78rem', margin: '0 0 12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <MapPin size={12} style={{ color: '#0b4c8c' }} />
                        {college.location}
                      </p>
                      
                      <div style={{
                        display: 'flex', justifyContent: 'space-between',
                        paddingTop: '10px', borderTop: '1px solid #f1f5f9',
                        fontSize: '0.8rem',
                      }}>
                        <div>
                          <span style={{ color: '#64748b', display: 'block', fontSize: '0.68rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '1px' }}>Avg Package</span>
                          <strong style={{ color: '#0b4c8c', fontSize: '0.85rem' }}>{college.averagePackage} LPA</strong>
                        </div>
                        <div>
                          <span style={{ color: '#64748b', display: 'block', fontSize: '0.68rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '1px' }}>Placement</span>
                          <strong style={{ color: '#047857', fontSize: '0.85rem' }}>{college.placementPercentage}%</strong>
                        </div>
                        <div>
                          <span style={{ color: '#64748b', display: 'block', fontSize: '0.68rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '1px' }}>Accreditation</span>
                          <strong style={{ color: '#e28743', fontSize: '0.85rem' }}>{college.accreditation}</strong>
                        </div>
                      </div>
                    </div>
                  </BorderGlow>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* STUDENT TESTIMONIALS SECTION */}
      <section style={{
        background: '#ffffff',
        padding: '4.5rem 1.5rem',
        borderTop: '1px solid #e2e8f0',
        borderBottom: '1px solid #e2e8f0',
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: '#e28743', letterSpacing: '0.1em', display: 'block', marginBottom: '6px' }}>
              REAL EXPERIENCES
            </span>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', margin: '0 0 10px' }}>
              Loved by Students Nationwide
            </h2>
            <p style={{ color: '#64748b', fontSize: '0.88rem', maxWidth: '460px', margin: '0 auto' }}>
              Don&apos;t just take our word for it. Hear it straight from the alumni who built their success.
            </p>
          </div>

          {/* Testimonial Active Display Card */}
          <SpotlightCard
            spotlightColor="rgba(11, 76, 140, 0.12)"
            style={{
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '24px',
              padding: '2.5rem',
              position: 'relative',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.02)',
            }}
          >
            {/* Quote Icon watermark */}
            <span style={{
              position: 'absolute', top: '1.5rem', left: '2rem',
              fontSize: '6rem', color: '#e2e8f0', lineHeight: 1,
              fontFamily: 'serif', pointerEvents: 'none', userSelect: 'none',
              zIndex: 0, opacity: 0.7
            }}>
              “
            </span>

            <div style={{ position: 'relative', zIndex: 1 }}>
              {/* Ratings */}
              <div style={{ display: 'flex', gap: '3px', marginBottom: '1.25rem' }}>
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={16} 
                    fill={i < Math.floor(TESTIMONIALS[activeTestimonial].rating) ? '#f59e0b' : 'none'} 
                    color="#f59e0b" 
                  />
                ))}
                <span style={{ marginLeft: '8px', fontSize: '0.85rem', fontWeight: 700, color: '#475569' }}>
                  {TESTIMONIALS[activeTestimonial].rating}
                </span>
              </div>

              {/* Quote Content */}
              <p style={{
                fontSize: '1.1rem',
                lineHeight: 1.6,
                color: '#1e293b',
                fontStyle: 'italic',
                fontWeight: 500,
                marginBottom: '2rem',
              }}>
                {TESTIMONIALS[activeTestimonial].quote}
              </p>

              {/* Author Info */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '50%',
                  background: TESTIMONIALS[activeTestimonial].avatarBg,
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '1rem',
                }}>
                  {TESTIMONIALS[activeTestimonial].name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h4 style={{ fontSize: '0.98rem', fontWeight: 800, color: '#0f172a', margin: '0 0 2px' }}>
                    {TESTIMONIALS[activeTestimonial].name}
                  </h4>
                  <p style={{ fontSize: '0.78rem', color: '#64748b', margin: 0, fontWeight: 500 }}>
                    {TESTIMONIALS[activeTestimonial].course} · <strong style={{ color: '#0b4c8c' }}>{TESTIMONIALS[activeTestimonial].college}</strong>
                  </p>
                </div>
              </div>
            </div>

            {/* Slider controls */}
            <div style={{
              position: 'absolute',
              bottom: '2.5rem',
              right: '2.5rem',
              display: 'flex',
              gap: '8px',
              zIndex: 5,
            }}>
              <button 
                onClick={handlePrevTestimonial}
                style={{
                  width: '36px', height: '36px', borderRadius: '50%',
                  background: '#ffffff', border: '1px solid #cbd5e1',
                  color: '#475569', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', transition: 'all 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#f1f5f9'}
                onMouseLeave={e => e.currentTarget.style.background = '#ffffff'}
              >
                <ChevronLeft size={18} />
              </button>
              <button 
                onClick={handleNextTestimonial}
                style={{
                  width: '36px', height: '36px', borderRadius: '50%',
                  background: '#ffffff', border: '1px solid #cbd5e1',
                  color: '#475569', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', transition: 'all 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#f1f5f9'}
                onMouseLeave={e => e.currentTarget.style.background = '#ffffff'}
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </SpotlightCard>

          {/* Dots Indicator */}
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '1.5rem' }}>
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveTestimonial(i)}
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  padding: 0,
                  border: 'none',
                  background: i === activeTestimonial ? '#0b4c8c' : '#cbd5e1',
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                }}
              />
            ))}
          </div>

        </div>
      </section>

      {/* PLATFORM FEATURES */}
      <section style={{ padding: '4.5rem 1.5rem 4rem' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: '#0b4c8c', letterSpacing: '0.1em', display: 'block', marginBottom: '6px' }}>
              FEATURES INDEX
            </span>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
              Built for Student Research
            </h2>
            <p style={{ color: '#64748b', fontSize: '0.88rem', maxWidth: '480px', margin: '0 auto' }}>
              We structure details so you can compare parameters without switching tabs
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {FEATURES.map((feature, i) => (
              <SpotlightCard
                key={i}
                spotlightColor="rgba(11, 76, 140, 0.12)"
                style={{
                  padding: '1.5rem',
                  background: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '16px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.01)',
                }}
              >
                <div style={{
                  width: '44px', height: '44px', borderRadius: '10px',
                  background: '#eff6ff', border: '1px solid #bfdbfe',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#0b4c8c', marginBottom: '1rem',
                }}>
                  {feature.icon}
                </div>
                <h3 style={{ color: '#0f172a', fontSize: '1rem', fontWeight: 700, marginBottom: '8px' }}>
                  {feature.title}
                </h3>
                <p style={{ color: '#64748b', fontSize: '0.85rem', lineHeight: 1.6, margin: 0 }}>
                  {feature.desc}
                </p>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </section>

      {/* TRUSTED BY / ACCREDITATIONS STRIP */}
      <section style={{
        background: '#f8fafc',
        borderTop: '1px solid #e2e8f0',
        padding: '3rem 1.5rem',
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '1.5rem 3rem',
            marginBottom: '1.25rem',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#475569', fontSize: '0.85rem', fontWeight: 700 }}>
              <Shield size={16} style={{ color: '#0b4c8c' }} />
              UGC Recognised
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#475569', fontSize: '0.85rem', fontWeight: 700 }}>
              <Award size={16} style={{ color: '#e28743' }} />
              NAAC Accredited
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#475569', fontSize: '0.85rem', fontWeight: 700 }}>
              <Star size={16} style={{ color: '#f59e0b' }} />
              NIRF Ranked
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#475569', fontSize: '0.85rem', fontWeight: 700 }}>
              <CheckCircle size={16} style={{ color: '#059669' }} />
              MoE Verified Data
            </div>
          </div>
          <p style={{ color: '#94a3b8', fontSize: '0.78rem', margin: 0, lineHeight: 1.5 }}>
            All colleges listed on VidyaKhoj are verified against official Indian regulatory databases. Strictly legit.
          </p>
        </div>
      </section>

      {/* ADMISSION ALERT SIGNUP BANNER */}
      <section style={{ padding: '1.5rem 1.5rem 4rem' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{
            background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
            border: '1px solid #334155',
            borderRadius: '24px',
            padding: '3rem 2rem',
            textAlign: 'center',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div style={{ position: 'relative', zIndex: 2 }}>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                padding: '4px 12px', borderRadius: '20px',
                background: 'rgba(226, 135, 67, 0.1)', border: '1px solid rgba(226, 135, 67, 0.25)',
                fontSize: '0.75rem', fontWeight: 800, color: '#e28743',
                marginBottom: '1rem',
              }}>
                <Sparkles size={12} /> Live Updates Feed
              </span>

              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.75rem' }}>
                Get Admission Alerts Before Deadlines Close
              </h2>
              <p style={{ color: '#94a3b8', fontSize: '0.88rem', marginBottom: '2rem', maxWidth: '480px', margin: '0 auto 2rem', lineHeight: 1.6 }}>
                Don&apos;t miss your chance at your dream college. Enter your email and get notified for registrations, cutoffs, and prep tips.
              </p>

              {isSubscribed ? (
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  padding: '12px 24px', borderRadius: '12px',
                  background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)',
                  color: '#34d399', fontSize: '0.95rem', fontWeight: 700,
                }}>
                  <CheckCircle size={18} />
                  Success! You are now subscribed to deadline alerts. Let&apos;s get it! 🚀
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="subscription-form">
                  <div style={{ width: '100%', position: 'relative' }}>
                    <input
                      type="email"
                      placeholder="Enter your email address..."
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px 18px',
                        borderRadius: '12px',
                        border: '1px solid #475569',
                        background: '#1e293b',
                        color: 'white',
                        fontSize: '0.92rem',
                        outline: 'none',
                        transition: 'border-color 0.2s',
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#0b4c8c'}
                      onBlur={(e) => e.target.style.borderColor = '#475569'}
                    />
                    {emailError && (
                      <span style={{
                        display: 'block', textAlign: 'left', marginTop: '6px',
                        fontSize: '0.78rem', color: '#f87171', fontWeight: 500,
                        paddingLeft: '4px'
                      }}>
                        {emailError}
                      </span>
                    )}
                  </div>
                  <button
                    type="submit"
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '8px',
                      padding: '12px 24px', borderRadius: '12px',
                      background: '#0b4c8c', border: 'none',
                      color: 'white', fontSize: '0.92rem', fontWeight: 700,
                      cursor: 'pointer', transition: 'all 0.2s',
                      width: '100%',
                      justifyContent: 'center',
                      whiteSpace: 'nowrap',
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = '#1d4ed8'}
                    onMouseLeave={e => e.currentTarget.style.background = '#0b4c8c'}
                  >
                    Notify Me <Send size={14} />
                  </button>
                </form>
              )}
              <span style={{ display: 'block', marginTop: '1rem', fontSize: '0.75rem', color: '#64748b' }}>
                No spam. Strictly registration dates & guidelines. Unsubscribe anytime.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER CTA SECTION */}
      <section style={{ padding: '0 1.5rem 3rem' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <ElectricBorder
            color="#e28743"
            speed={0.8}
            chaos={0.12}
            borderRadius={24}
            thickness={2}
          >
            <div style={{
              padding: '3.5rem 2.5rem', borderRadius: '24px', textAlign: 'center',
              background: 'linear-gradient(135deg, #0b4c8c 0%, #1e3a8a 100%)',
              boxShadow: '0 12px 30px rgba(11, 76, 140, 0.15)',
              position: 'relative', overflow: 'hidden',
            }}>
              {/* Background design */}
              <div style={{
                position: 'absolute', top: '-50%', left: '-10%', width: '300px', height: '300px',
                borderRadius: '50%', background: 'rgba(255, 255, 255, 0.03)', pointerEvents: 'none'
              }} />
              <div style={{
                position: 'absolute', bottom: '-50%', right: '-10%', width: '300px', height: '300px',
                borderRadius: '50%', background: 'rgba(255, 255, 255, 0.03)', pointerEvents: 'none'
              }} />

              <h2 style={{ fontSize: '1.85rem', fontWeight: 800, color: 'white', marginBottom: '1rem', position: 'relative' }}>
                Ready to Enter Your College Era?
              </h2>
              <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.95rem', marginBottom: '2rem', maxWidth: '520px', margin: '0 auto 2rem', lineHeight: 1.6, position: 'relative' }}>
                Join thousands of students picking their absolute dream university. Contrast fees, stats, and verified reviews all in one dashboard.
              </p>
              <Link
                href={PLATFORM_ROUTES.list}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  padding: '13px 30px', borderRadius: '30px', textDecoration: 'none',
                  background: '#e28743',
                  color: 'white', fontSize: '0.95rem', fontWeight: 700,
                  boxShadow: '0 4px 15px rgba(226, 135, 67, 0.3)',
                  position: 'relative',
                }}
              >
                Start Shortlisting Now
                <ArrowRight size={16} />
              </Link>
            </div>
          </ElectricBorder>
        </div>
      </section>

    </div>
  );
}
