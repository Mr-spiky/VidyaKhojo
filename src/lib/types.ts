// ─── Core Domain Types ───────────────────────────────────────────────────────

export interface College {
  id: string;
  name: string;
  slug: string;
  location: string;
  state: string;
  type: "Government" | "Private" | "Deemed";
  description: string;
  established: number;
  rating: number;
  reviewCount: number;
  feesMin: number;
  feesMax: number;
  placementPercentage: number;
  averagePackage: number;
  highestPackage: number;
  topRecruiters: string[];
  tags: string[];
  imageUrl?: string;
  courses?: Course[];
  reviews?: Review[];
  createdAt: string;
}

export interface Course {
  id: string;
  name: string;
  duration: string;
  fees: number;
  seats: number;
  eligibility: string;
  collegeId: string;
}

export interface Review {
  id: string;
  rating: number;
  comment: string;
  userName: string;
  collegeId: string;
  createdAt: string;
}

export interface SavedCollege {
  id: string;
  userId: string;
  collegeId: string;
  college: College;
  createdAt: string;
}

// ─── Auth Types ───────────────────────────────────────────────────────────────

export interface User {
  id: string;
  email: string;
  name?: string;
}

export interface SessionPayload {
  userId: string;
  email: string;
  name?: string;
  expiresAt: Date;
}

// ─── API Request / Response Types ────────────────────────────────────────────

export interface CollegeListParams {
  search?: string;
  state?: string;
  type?: string;
  minFees?: number;
  maxFees?: number;
  minRating?: number;
  sortBy?: "rating" | "fees-asc" | "fees-desc" | "placement";
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiError {
  error: string;
}

// ─── Filter State Types ───────────────────────────────────────────────────────

export interface FilterState {
  search: string;
  state: string;
  type: string;
  minFees: number;
  maxFees: number;
  minRating: number;
  sortBy: "rating" | "fees-asc" | "fees-desc" | "placement";
}

export const DEFAULT_FILTERS: FilterState = {
  search: "",
  state: "",
  type: "",
  minFees: 0,
  maxFees: 2000000,
  minRating: 0,
  sortBy: "rating",
};

// ─── Compare Types ────────────────────────────────────────────────────────────

export interface CompareItem {
  id: string;
  name: string;
  slug: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

export const INDIAN_STATES = [
  "Andhra Pradesh",
  "Bihar",
  "Delhi",
  "Gujarat",
  "Haryana",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Punjab",
  "Rajasthan",
  "Tamil Nadu",
  "Telangana",
  "Uttar Pradesh",
  "West Bengal",
] as const;

export const COLLEGE_TYPES = ["Government", "Private", "Deemed"] as const;

export const SORT_OPTIONS = [
  { value: "rating", label: "Highest Rated" },
  { value: "fees-asc", label: "Fees: Low to High" },
  { value: "fees-desc", label: "Fees: High to Low" },
  { value: "placement", label: "Best Placement" },
] as const;
