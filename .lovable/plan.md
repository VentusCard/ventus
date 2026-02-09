

# Glassmorphism and Gradient Background for Public Pages

## Overview
Apply a cohesive glassmorphism aesthetic with a subtle animated gradient background across all public/marketing pages (Home, Smart Rewards, About, Ventus AI, Benefits, Partners, App Download, Contact, Privacy, Terms, Join Waitlist).

## 1. Global Gradient Background

Add a persistent, subtle animated gradient to the body/root level that all public pages inherit:

**File: `src/styles/base.css`**
- Add a new `.glass-page-bg` utility class with:
  - A fixed position full-screen gradient using soft blue/indigo/purple orbs
  - Subtle CSS animation (slow drift, 15-20s cycle) for a living feel
  - Uses the existing dark background color as the base (`hsl(220 50% 8%)`)

**File: `src/styles/animations.css`** (or `base.css`)
- Add `@keyframes gradient-shift` for the slow-moving background orbs

## 2. Glassmorphism Card Utility

**File: `src/styles/components.css`**
- Add a `.glass-card` utility class:
  - `background: hsl(220 50% 12% / 0.4)`
  - `backdrop-filter: blur(16px) saturate(1.3)`
  - `border: 1px solid hsl(220 40% 30% / 0.3)`
  - Subtle inner highlight: `inset 0 1px 0 hsl(0 0% 100% / 0.05)`
- Add `.glass-section` for full-width section backgrounds:
  - Similar translucent treatment but lighter blur
  - Removes the opaque `bg-slate-900` / `bg-slate-800` look

## 3. Page-Level Changes

Apply the gradient background wrapper and glass cards to each public page:

### `src/pages/Index.tsx`
- Add `glass-page-bg` class to the root `<div>`

### `src/pages/VentusRewards.tsx`
- Add `glass-page-bg` class to the root `<div>`

### `src/pages/ventus-rewards/components/HeroSection.tsx`
- Replace opaque `bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800` with a semi-transparent glass treatment so the global gradient shows through

### `src/pages/ventus-rewards/components/GoalSelection.tsx`
- Replace `bg-slate-900` with transparent/glass-section
- Replace `bg-slate-800` on cards with `glass-card` styling (translucent + blur)
- Selected state uses a brighter glass border with blue glow

### `src/pages/ventus-rewards/components/SubcategorySelection.tsx`
- Replace `bg-slate-900` section background with glass-section
- Subcategory buttons: replace `bg-slate-800/80` with glass-card treatment

### `src/pages/ventus-rewards/components/ComparisonSection.tsx`
- Replace `bg-slate-900` with glass-section
- Replace `bg-slate-800` inner cards with glass-card
- Keep the red/green semantic borders for the problem/solution panels but make backgrounds translucent

### `src/pages/AboutUs.tsx`
- Add `glass-page-bg` to root div
- Apply glass-card to value cards

### `src/pages/VentusAI.tsx`
- Add `glass-page-bg` to root div
- Apply glass-card to feature cards

### `src/pages/BenefitsPage.tsx`
- Add `glass-page-bg` to root div

### `src/pages/Partners.tsx`
- Add `glass-page-bg` to root div

### `src/pages/AppDownload.tsx`
- Add `glass-page-bg` to root div
- Apply glass-card to step cards

### `src/pages/ContactUs.tsx`, `src/pages/JoinWaitlist.tsx`, `src/pages/Privacy.tsx`, `src/pages/TermsOfService.tsx`
- Add `glass-page-bg` to root div

### `src/components/Navbar.tsx`
- Already has `bg-background/95 backdrop-blur-md` -- enhance to match the glass aesthetic with slightly more transparency

### `src/components/Footer.tsx`
- Replace `bg-card` with a glass-section treatment for consistency

### `src/components/Hero.tsx`
- Make the background semi-transparent so the global gradient bleeds through subtly behind the video

### `src/components/CTA.tsx`
- Replace opaque `bg-[hsl(220,50%,8%)]` with glass-section

## 4. Dropdown/Popover Safety
- Ensure all popover, dropdown, select, and dialog components retain opaque backgrounds (`bg-popover` / `bg-card`) so they remain legible and don't become see-through

## Technical Notes
- The gradient background uses `position: fixed` with `z-index: -1` so it stays behind all content and doesn't affect layout
- All glass effects use `backdrop-filter: blur()` which is well-supported in modern browsers
- The existing `.glass-transition-card` hover effect in `components.css` will complement the new glass-card base styling
- No changes to internal dashboard pages (tepilot, advisor console, financial planning) -- those keep their light themes
- The animated gradient uses CSS animations only (no JS) for performance

