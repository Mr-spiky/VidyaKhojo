// ==================== CORE TYPES ====================

export interface Course {
  id: string;
  name: string;
  duration: string; // "4 Years"
  fees: number; // Per year in INR
  seats: number;
  eligibility: string;
  degree: string; // B.Tech, MBA, etc.
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  avatar?: string;
  rating: number; // 1-5
  comment: string;
  date: string; // ISO date string
  helpful: number; // Upvote count
  aspects: {
    academics: number;
    campus: number;
    placements: number;
    faculty: number;
  };
}

export interface Recruiter {
  name: string;
  logo?: string;
  package?: number; // LPA
}

export interface College {
  id: string;
  name: string;
  shortName?: string;
  location: string; // City, State
  city: string;
  state: string;
  logoUrl?: string;
  bannerUrl?: string;
  fees: {
    min: number; // Annual fees (₹)
    max: number;
  };
  rating: number; // 0–5
  reviewCount: number;
  placementPercentage: number; // 0–100
  averagePackage: number; // LPA
  highestPackage: number; // LPA
  description: string;
  established: number; // Year
  type: 'Government' | 'Private' | 'Deemed';
  accreditation: string; // NAAC A++, etc.
  nirfRank?: number;
  courses: Course[];
  reviews: Review[];
  tags: string[]; // e.g., ['IIT', 'NIRF Top 10']
  topRecruiters: Recruiter[];
  facilities: string[];
  website?: string;
  totalStudents?: number;
  campusArea?: string; // in acres
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface FilterState {
  search: string;
  location: string[];
  feeRange: [number, number]; // Min, Max in Lakhs
  rating: number; // Min rating (0 = any)
  type: string[]; // College type filter
  sortBy: 'rating' | 'fees-asc' | 'fees-desc' | 'placement' | 'nirf';
}

export interface PaginationState {
  page: number;
  perPage: number;
  total: number;
}

export interface CollegeListResult {
  colleges: College[];
  total: number;
  page: number;
  totalPages: number;
}

// ==================== CONTEXT TYPES ====================

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isLoading: boolean;
}

export interface CompareContextType {
  compareList: College[];
  addToCompare: (college: College) => boolean; // returns false if already 3
  removeFromCompare: (collegeId: string) => void;
  clearCompare: () => void;
  isInCompare: (collegeId: string) => boolean;
}

export interface SavedContextType {
  savedColleges: string[]; // college IDs
  saveCollege: (collegeId: string) => void;
  unsaveCollege: (collegeId: string) => void;
  isSaved: (collegeId: string) => boolean;
}
