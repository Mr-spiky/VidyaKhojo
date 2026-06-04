import type { Metadata } from 'next';
import { CollegePlatformProviders } from '@/lib/college-platform/contexts/Providers';
import { CollegeNavbar } from '@/components/college-platform/layout/CollegeNavbar';
import { CollegeFooter } from '@/components/college-platform/layout/CollegeFooter';
import { CompareBar } from '@/components/college-platform/compare/CompareBar';

export const metadata: Metadata = {
  title: 'VidyaKhoj — Discover Your Perfect College',
  description: 'Search, compare, and find the best colleges in India. Filter by location, fees, ratings, and placement records.',
};

export default function CollegeLayout({ children }: { children: React.ReactNode }) {
  return (
    <CollegePlatformProviders>
      <div className="min-h-screen flex flex-col" style={{ fontFamily: 'Inter, sans-serif', background: '#f8fafc' }}>
        <CollegeNavbar />
        <main className="flex-1">
          {children}
        </main>
        <CompareBar />
        <CollegeFooter />
      </div>
    </CollegePlatformProviders>
  );
}
