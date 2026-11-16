# Project memory

## Product intent & audience

- Product name: BrandLens
- Purpose: Audit professional identity, mine stronger career stories, analyze profile gaps, execute actionable improvements
- Audience: Students and early-career professionals
- Core flow: Upload/configure → AI analysis with live progress → Dashboard with results across Brand Audit, Story Mining, Gap Analysis, Action Plan
- Supports multiple projects per user

## Brand personality & voice

- Professional but approachable; suited to early-career users
- Beautiful, production-grade design (non-cookie-cutter) per `.bolt/prompt`

## Visual design & UX direction

- App shell with persistent sidebar navigation
- Distinctive visuals: BrandScoreRing (circular score), IdentityOrb (animated), MetricBar, PortraitIllustration
- PriorityBadge for action prioritization; EmptyState for no-data screens
- Toast notifications via ToastViewport + toast utility
- AnalysisPage shows streaming progress stages
- ScrollToTop on route changes
- React Router for multi-page navigation
- Tailwind CSS for styling; Lucide React for all icons

## Decisions, constraints & rationale

- Stack: Vite + React + TypeScript + Tailwind
- Backend: Supabase (auth, database, edge functions)
- Edge function `hyper-responder` runs AI analysis and streams progress updates
- RLS policies enabled on `profiles` table (migration `20260820142138`)
- `@/` path alias maps to `src/`; no deep relative imports
- No extra UI/icon packages beyond Lucide React unless explicitly requested
- Mock data in `src/data/mockData.ts` for development
- Shared state via React Context (AnalysisContext, AuthContext)
- AI service abstracted in `src/services/aiService.ts`

## Open questions & assumptions

- Which AI provider/model powers analysis is not yet confirmed
- Full end-to-end analysis logic and data sources (what gets uploaded/analyzed) not fully specified
- Whether multiple user roles exist beyond standard authenticated user is unconfirmed
- Deploy target unknown; `dist/_redirects` suggests Netlify-style hosting