export const STATES = [
  'Andhra Pradesh', 'Assam', 'Bihar', 'Delhi', 'Gujarat',
  'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Punjab',
  'Rajasthan', 'Tamil Nadu', 'Telangana', 'Uttar Pradesh', 'West Bengal',
];

export const COLLEGE_TYPES = ['Government', 'Private', 'Deemed'] as const;

export const FEE_RANGE = {
  min: 0,
  max: 50, // In Lakhs per year
};

export const SORT_OPTIONS = [
  { label: 'Highest Rated', value: 'rating' },
  { label: 'Best Placements', value: 'placement' },
  { label: 'NIRF Rank', value: 'nirf' },
  { label: 'Fees: Low to High', value: 'fees-asc' },
  { label: 'Fees: High to Low', value: 'fees-desc' },
] as const;

export const DEFAULT_FILTERS = {
  search: '',
  location: [],
  feeRange: [0, 50] as [number, number],
  rating: 0,
  type: [],
  sortBy: 'rating' as const,
};

export const ITEMS_PER_PAGE = 9;

export const PLATFORM_ROUTES = {
  home: '/colleges',
  list: '/colleges/list',
  detail: (id: string) => `/colleges/${id}`,
  compare: '/colleges/compare',
  saved: '/colleges/saved',
  login: '/colleges/auth/login',
  register: '/colleges/auth/register',
};
