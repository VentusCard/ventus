
# Reduce Hero Section Bottom Spacing

## Current Issue

The hero section has large bottom padding values creating excessive empty space:
- Mobile: `pb-8` (32px)
- Tablet: `md:pb-12` (48px)  
- Desktop: `lg:pb-24` (96px)

## Proposed Changes

**File:** `src/pages/OnboardingFlow.tsx` (line 161)

### Change

```tsx
// Current:
<section className="pt-16 pb-8 md:pt-20 md:pb-12 lg:pt-28 lg:pb-24 flex flex-col items-center justify-center px-4 md:px-8">

// Proposed:
<section className="pt-16 pb-4 md:pt-20 md:pb-6 lg:pt-28 lg:pb-8 flex flex-col items-center justify-center px-4 md:px-8">
```

### Spacing Reduction

| Breakpoint | Current | New | Reduction |
|------------|---------|-----|-----------|
| Mobile | `pb-8` (32px) | `pb-4` (16px) | 50% |
| Tablet | `md:pb-12` (48px) | `md:pb-6` (24px) | 50% |
| Desktop | `lg:pb-24` (96px) | `lg:pb-8` (32px) | 67% |

This will tighten the gap between the hero content and the onboarding flow section below while maintaining proportional spacing across screen sizes.
