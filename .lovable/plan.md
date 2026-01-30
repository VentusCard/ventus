

# Fix: Navbar Overlapping Hero Content on Mobile & Tablet

## Problem Identified

The navbar is `fixed` positioned (`position: fixed; top: 0`), which removes it from the normal document flow. However, the hero section below it has no top margin/padding to compensate for the navbar's height, causing the content to render **underneath** the navbar.

**Navbar heights:**
- Mobile: `h-12` = 48px
- Tablet (md): `h-14` = 56px
- Desktop (lg): `h-16` = 64px

**Current hero section:**
```tsx
<section className="py-8 md:py-12 lg:py-24 ...">
```

This padding is symmetric (top and bottom), but the top padding isn't enough to push content below the fixed navbar on smaller screens.

---

## Solution

Add top padding to the hero section that matches the navbar height at each breakpoint, ensuring content starts **below** the navbar.

### Option A: Add padding-top to hero section (Recommended)
Add explicit `pt-` values that account for navbar + desired spacing:

```tsx
// Current (line 161):
<section className="py-8 md:py-12 lg:py-24 flex flex-col items-center justify-center px-4 md:px-8">

// Proposed:
<section className="pt-16 pb-8 md:pt-20 md:pb-12 lg:pt-28 lg:pb-24 flex flex-col items-center justify-center px-4 md:px-8">
```

**Breakdown:**
| Viewport | Navbar Height | Old pt | New pt | Visual Space Above H1 |
|----------|---------------|--------|--------|----------------------|
| Mobile   | 48px (h-12)   | 32px   | 64px (pt-16) | ~16px below navbar |
| Tablet   | 56px (h-14)   | 48px   | 80px (pt-20) | ~24px below navbar |
| Desktop  | 64px (h-16)   | 96px   | 112px (pt-28) | ~48px below navbar |

---

## File to Modify

- `src/pages/OnboardingFlow.tsx` (line 161) - Adjust hero section padding

---

## Summary

This is a single-line CSS class change that separates `py-*` into distinct `pt-*` and `pb-*` values, ensuring the top padding properly accounts for the fixed navbar height at all breakpoints.

