# College Discovery Platform — Implementation Plan

> **Role**: Frontend Engineer | **Track**: B — College Discovery Platform  
> **Stack**: Next.js (App Router) · React · TypeScript · Tailwind CSS  
> **Inspiration**: Careers360 / Collegedunia — but original, focused, and production-grade.

---

## 1. Product Requirements Analysis

### What We're Building
A focused college discovery MVP that lets students search, filter, compare, and save colleges — with clean UX, well-typed data, and a scalable codebase.

### Core Features (4 selected)

| Feature | Complexity | Priority |
|---|---|---|
| College Listing + Search + Filters | High | P0 |
| College Detail Page | Medium | P0 |
| College Comparison (2–3) | High | P1 |
| Auth + Saved Colleges | Medium | P1 |

---

## 2. User Flow

```
Landing Page
    │
    ▼
College Listing Page  ◄──── Search + Filters (location, fees, rating)
    │                              │
    │                         Pagination
    ▼
College Detail Page
    ├── Overview Tab
    ├── Courses Tab
    ├── Fees Tab
    ├── Placements Tab
    └── Reviews Tab
    │
    ├── [Add to Compare] ──► Compare Page (2–3 colleges side-by-side)
    └── [Save College]   ──► (Auth Gate) ──► Saved Colleges Page

Auth Flow:
    Login / Register ──► Session stored in Context + localStorage
                    ──► Saved colleges persisted per user
```

---

## 3. Frontend Architecture

### Architecture Style: **Feature-Sliced Design (FSD) Lite**
Each domain (colleges, compare, auth, saved) owns its own components, hooks, and types. Shared UI lives in a global `components/ui` layer.

### Data Flow
```
Mock Data (lib/data) 
    └──► Custom Hooks (useColleges, useCompare, useSaved)
              └──► Context Providers (AuthContext, CompareContext, SavedContext)
                        └──► Page Components (Server + Client)
                                  └──► Reusable UI Components
```

### Rendering Strategy
- **College Listing**: Client Component (needs filter/search interactivity)
- **College Detail Page**: Server Component + Client tabs (static-friendly)
- **Compare Page**: Client Component (dynamic comparison state)
- **Saved Colleges**: Client Component (auth-gated, localStorage)
- **Auth**: Client Components (form state + context)

---

## 4. Folder Structure

```
career-platform/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout (providers, navbar, footer)
│   ├── page.tsx                  # Landing / Home page
│   ├── colleges/
│   │   ├── page.tsx              # College Listing Page
│   │   └── [id]/
│   │       └── page.tsx          # College Detail Page
│   ├── compare/
│   │   └── page.tsx              # Compare Page
│   ├── saved/
│   │   └── page.tsx              # Saved Colleges Page
│   └── auth/
│       ├── login/page.tsx
│       └── register/page.tsx
│
├── components/
│   ├── ui/                       # Pure reusable UI atoms
│   │   ├── Button.tsx
│   │   ├── Badge.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   ├── Select.tsx
│   │   ├── Slider.tsx
│   │   ├── Modal.tsx
│   │   ├── Tabs.tsx
│   │   ├── Skeleton.tsx          # Loading skeleton
│   │   ├── EmptyState.tsx        # Empty state component
│   │   └── ErrorState.tsx        # Error state component
│   │
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── Sidebar.tsx
│   │
│   ├── colleges/                 # Domain-specific components
│   │   ├── CollegeCard.tsx       # Card shown in listing
│   │   ├── CollegeGrid.tsx       # Grid/list of cards
│   │   ├── CollegeFilters.tsx    # Filter panel (location, fees, rating)
│   │   ├── CollegeSearch.tsx     # Search bar with debounce
│   │   ├── Pagination.tsx        # Page controls
│   │   └── RatingStars.tsx       # Star rating display
│   │
│   ├── detail/
│   │   ├── OverviewTab.tsx
│   │   ├── CoursesTab.tsx
│   │   ├── FeesTab.tsx
│   │   ├── PlacementsTab.tsx
│   │   └── ReviewsTab.tsx
│   │
│   ├── compare/
│   │   ├── CompareBar.tsx        # Sticky compare bar at bottom
│   │   ├── CompareTable.tsx      # Side-by-side comparison table
│   │   └── CompareCard.tsx       # Mini college card in compare
│   │
│   └── auth/
│       ├── LoginForm.tsx
│       └── RegisterForm.tsx
│
├── context/
│   ├── AuthContext.tsx           # User session state
│   ├── CompareContext.tsx        # Selected colleges for compare (max 3)
│   └── SavedContext.tsx          # Saved/bookmarked colleges
│
├── hooks/
│   ├── useColleges.ts            # Filter + search + paginate logic
│   ├── useCompare.ts             # Add/remove/clear compare
│   ├── useSaved.ts               # Save/unsave with auth check
│   ├── useDebounce.ts            # Debounce utility hook
│   └── useLocalStorage.ts        # Persistent localStorage hook
│
├── lib/
│   ├── data/
│   │   ├── colleges.ts           # 20+ mock college records
│   │   └── types.ts              # All TypeScript interfaces
│   ├── utils/
│   │   ├── filters.ts            # Pure filter functions
│   │   ├── formatters.ts         # Currency, rating formatters
│   │   └── validators.ts         # Auth form validation
│   └── constants/
│       ├── filters.ts            # Filter options (locations, fee ranges)
│       └── routes.ts             # Route constants
│
└── types/
    └── index.ts                  # Re-exports from lib/data/types.ts
```

---

## 5. TypeScript Data Model

```typescript
// Core College Type
interface College {
  id: string;
  name: string;
  location: string;                 // City, State
  state: string;                    // For filter
  logoUrl?: string;
  bannerUrl?: string;
  fees: {
    min: number;                    // Annual fees (₹)
    max: number;
  };
  rating: number;                   // 0–5
  reviewCount: number;
  placementPercentage: number;      // 0–100
  averagePackage: number;           // LPA
  highestPackage: number;           // LPA
  description: string;
  established: number;              // Year
  type: 'Government' | 'Private' | 'Deemed';
  courses: Course[];
  reviews: Review[];
  tags: string[];                   // e.g., ['IIT', 'NIRF Top 10']
}

interface Course {
  id: string;
  name: string;
  duration: string;                 // "4 Years"
  fees: number;                     // Per year
  seats: number;
  eligibility: string;
}

interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;                  // Upvotes
}

interface User {
  id: string;
  name: string;
  email: string;
}

interface FilterState {
  search: string;
  location: string[];
  feeRange: [number, number];       // Min, Max
  rating: number;                   // Min rating
  type: string[];                   // College type
  sortBy: 'rating' | 'fees-asc' | 'fees-desc' | 'placement';
}
```

---

## 6. Reusable Components Catalog

| Component | Props | Where Used |
|---|---|---|
| `Button` | variant, size, loading, icon | Everywhere |
| `Badge` | label, color | CollegeCard, Detail |
| `Card` | children, className, hover | CollegeCard, Compare |
| `Input` | value, onChange, icon, error | Search, Auth |
| `Select` | options, value, onChange | Filters |
| `RangeSlider` | min, max, value, onChange | Fee filter |
| `Skeleton` | width, height, rounded | All loading states |
| `EmptyState` | title, description, action | No results |
| `ErrorState` | message, retry | Error handling |
| `Modal` | open, onClose, title | Auth gate, Confirm |
| `Tabs` | tabs, activeTab, onChange | College Detail |
| `RatingStars` | rating, size | Cards, Reviews |
| `Pagination` | total, page, perPage, onChange | Listing |
| `CompareBar` | selected colleges | All listing pages |

---

## 7. State Management Approach

### Strategy: **React Context + Custom Hooks** (no external library needed)

| State Domain | Where | Persistence |
|---|---|---|
| Auth (user session) | `AuthContext` | `localStorage` |
| Saved colleges | `SavedContext` | `localStorage` (per user) |
| Compare selection (max 3) | `CompareContext` | `sessionStorage` |
| Filter/search state | `useColleges` hook (local) | URL params (optional) |
| UI state (tabs, modals) | Local component state | None |

### Why no Redux/Zustand?
The app's state is domain-isolated and mostly client-local. Contexts + hooks are:
- Simpler to reason about
- Easier to test
- No boilerplate overhead
- Fully typed with TypeScript generics

---

## 8. Mock API Structure

All data lives in `lib/data/colleges.ts`. Hooks simulate async behavior:

```typescript
// Simulated async API layer in hooks
const useColleges = (filters: FilterState) => {
  // Simulates network delay (300ms)
  // Returns: { data, isLoading, error, total, page }
}

// Imagined REST API shape (for future backend swap):
GET /api/colleges?search=&location=&minFees=&maxFees=&rating=&page=&limit=
GET /api/colleges/:id
GET /api/colleges/:id/courses
GET /api/colleges/:id/reviews
POST /api/auth/login
POST /api/auth/register
GET  /api/user/saved
POST /api/user/saved/:collegeId
DELETE /api/user/saved/:collegeId
```

---

## 9. Project Milestones

| Milestone | Features | Est. Effort |
|---|---|---|
| **M1 — Foundation** | Project setup, design system, mock data, layout | Day 1 |
| **M2 — Listing + Search** | College listing, search, filters, pagination | Day 1–2 |
| **M3 — Detail Page** | Tabs, overview, courses, fees, placements, reviews | Day 2 |
| **M4 — Compare** | CompareBar, CompareTable, context, sticky bar | Day 3 |
| **M5 — Auth + Saved** | Login/Register forms, auth context, saved page | Day 3–4 |
| **M6 — Polish** | Empty/error/loading states, mobile responsiveness, animations | Day 4 |

---

## 10. Implementation Roadmap (Step-by-Step)

### Phase 1 — Foundation & Design System
- [ ] Initialize Next.js app with TypeScript + Tailwind CSS
- [ ] Configure `tailwind.config.ts` with custom design tokens (colors, fonts, spacing)
- [ ] Set up Google Fonts (Inter)
- [ ] Create root `layout.tsx` with context providers
- [ ] Build `Navbar` and `Footer`
- [ ] Build all UI atoms: Button, Badge, Card, Input, Select, Skeleton, EmptyState, ErrorState, Modal, Tabs, RatingStars, Pagination

### Phase 2 — Mock Data & Types
- [ ] Define all TypeScript interfaces in `lib/data/types.ts`
- [ ] Create 20+ realistic mock colleges in `lib/data/colleges.ts`
- [ ] Create utility functions (formatters, filters, validators)
- [ ] Define filter constants

### Phase 3 — College Listing + Search + Filters
- [ ] Implement `useDebounce` and `useColleges` hooks
- [ ] Build `CollegeSearch` with debounce
- [ ] Build `CollegeFilters` panel (location multi-select, fee range slider, rating, type)
- [ ] Build `CollegeCard` component
- [ ] Build `CollegeGrid` with loading skeletons
- [ ] Build `Pagination` component
- [ ] Wire `/colleges` page with all components + URL-based state

### Phase 4 — College Detail Page
- [ ] Build tabbed layout (Tabs component)
- [ ] Implement `OverviewTab` (description, key stats, tags)
- [ ] Implement `CoursesTab` (table of courses)
- [ ] Implement `FeesTab` (fee breakdown, chart-style visualization)
- [ ] Implement `PlacementsTab` (stats, top recruiters)
- [ ] Implement `ReviewsTab` (list of reviews with ratings)
- [ ] Add "Add to Compare" + "Save" CTAs

### Phase 5 — Compare Feature
- [ ] Create `CompareContext` (max 3 colleges, add/remove)
- [ ] Build `CompareBar` (sticky bottom bar showing selected colleges)
- [ ] Build `CompareTable` (side-by-side row comparison)
- [ ] Wire `/compare` page

### Phase 6 — Auth + Saved Colleges
- [ ] Create `AuthContext` with login/logout + localStorage persistence
- [ ] Build `LoginForm` + `RegisterForm` (with validation)
- [ ] Build auth-gate modal (for unauthenticated save attempts)
- [ ] Create `SavedContext` with add/remove + localStorage
- [ ] Build `/saved` page with saved college grid

### Phase 7 — Polish & Quality
- [ ] Add loading skeletons to every async state
- [ ] Add empty states (no results, no saved, no compare)
- [ ] Add error boundaries
- [ ] Full mobile responsiveness pass (hamburger menu, responsive filters drawer)
- [ ] Micro-animations (card hover, filter transitions, tab switching)
- [ ] Accessibility pass (aria labels, keyboard navigation, focus styles)
- [ ] Final code cleanup and dead-code removal

---

## Open Questions for Your Review

> [!IMPORTANT]
> **Q1 — Auth Persistence**: Should mock login accept any email/password (demo mode), or should we seed specific mock users?  
> _Suggestion: Allow any valid email + password ≥ 6 chars → creates a session. No real backend needed._

> [!IMPORTANT]
> **Q2 — URL State for Filters**: Should filter/search state live in the URL (e.g., `/colleges?search=IIT&location=Delhi`) so that links are shareable? This adds complexity but improves UX.  
> _Suggestion: Yes, use `useSearchParams` for the listing page filters._

> [!NOTE]
> **Q3 — Animations Library**: Should we use Framer Motion for page transitions and list animations, or keep it pure Tailwind CSS transitions to minimize dependencies?  
> _Suggestion: Framer Motion — it's worth the small bundle cost for the polish it provides._

> [!NOTE]
> **Q4 — Compare Limit**: The assignment says 2–3 colleges. Should the UI allow exactly 2, exactly 3, or a range of 2–3 with a flexible compare button?  
> _Suggestion: Allow 2–3 with the compare button enabled once ≥ 2 are selected._
