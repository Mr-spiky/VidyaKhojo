import { College, FilterState } from './types';

// Format currency to Indian Rupee format
export function formatCurrency(amount: number): string {
  if (amount >= 10000000) {
    return `₹${(amount / 10000000).toFixed(1)} Cr`;
  } else if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(1)} L`;
  } else if (amount >= 1000) {
    return `₹${(amount / 1000).toFixed(0)}K`;
  }
  return `₹${amount.toLocaleString('en-IN')}`;
}

export function formatPackage(lpa: number): string {
  if (lpa >= 100) {
    return `${lpa} LPA`;
  }
  return `${lpa} LPA`;
}

export function formatRating(rating: number): string {
  return rating.toFixed(1);
}

export function formatFees(min: number, max: number): string {
  if (min === max) return formatCurrency(min) + '/yr';
  return `${formatCurrency(min)} – ${formatCurrency(max)}/yr`;
}

// Filter colleges based on FilterState
export function filterColleges(colleges: College[], filters: FilterState): College[] {
  let filtered = [...colleges];

  // Search filter
  if (filters.search.trim()) {
    const searchLower = filters.search.toLowerCase();
    filtered = filtered.filter(c =>
      c.name.toLowerCase().includes(searchLower) ||
      c.shortName?.toLowerCase().includes(searchLower) ||
      c.location.toLowerCase().includes(searchLower) ||
      c.tags.some(t => t.toLowerCase().includes(searchLower))
    );
  }

  // Location filter
  if (filters.location.length > 0) {
    filtered = filtered.filter(c => filters.location.includes(c.state));
  }

  // Fee range filter (in lakhs)
  const [minFee, maxFee] = filters.feeRange;
  filtered = filtered.filter(c => {
    const collegeFeeMin = c.fees.min / 100000; // Convert to Lakhs
    return collegeFeeMin >= minFee && collegeFeeMin <= maxFee;
  });

  // Rating filter
  if (filters.rating > 0) {
    filtered = filtered.filter(c => c.rating >= filters.rating);
  }

  // Type filter
  if (filters.type.length > 0) {
    filtered = filtered.filter(c => filters.type.includes(c.type));
  }

  // Sort
  switch (filters.sortBy) {
    case 'rating':
      filtered.sort((a, b) => b.rating - a.rating);
      break;
    case 'fees-asc':
      filtered.sort((a, b) => a.fees.min - b.fees.min);
      break;
    case 'fees-desc':
      filtered.sort((a, b) => b.fees.min - a.fees.min);
      break;
    case 'placement':
      filtered.sort((a, b) => b.placementPercentage - a.placementPercentage);
      break;
    case 'nirf':
      filtered.sort((a, b) => {
        if (!a.nirfRank && !b.nirfRank) return 0;
        if (!a.nirfRank) return 1;
        if (!b.nirfRank) return -1;
        return a.nirfRank - b.nirfRank;
      });
      break;
  }

  return filtered;
}

// Get stars breakdown for display
export function getStarsBreakdown(rating: number): { filled: number; half: boolean; empty: number } {
  const filled = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  const empty = 5 - filled - (half ? 1 : 0);
  return { filled, half, empty };
}

// Validate email
export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Validate password (min 6 chars)
export function validatePassword(password: string): string | null {
  if (password.length < 6) return 'Password must be at least 6 characters';
  return null;
}

// Validate auth form
export function validateAuthForm(email: string, password: string, name?: string): { valid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};
  
  if (name !== undefined && !name.trim()) {
    errors.name = 'Name is required';
  }
  
  if (!validateEmail(email)) {
    errors.email = 'Please enter a valid email address';
  }
  
  const passwordError = validatePassword(password);
  if (passwordError) {
    errors.password = passwordError;
  }
  
  return { valid: Object.keys(errors).length === 0, errors };
}

// Get college type badge color
export function getTypeColor(type: College['type']): string {
  switch (type) {
    case 'Government': return 'emerald';
    case 'Private': return 'blue';
    case 'Deemed': return 'purple';
  }
}

// Simulate async delay
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
