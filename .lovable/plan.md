
# Add Animations to Hero Content

## Overview

Adding staggered entrance animations to the `/smartrewards` hero section to create a polished, engaging first impression. The animations will cascade from top to bottom with increasing delays.

---

## Animation Strategy

```text
┌──────────────────────────────────────────────┐
│                                              │
│   "One Card. Your Lifestyle."     ← 0ms     │
│   "5x Rewards on Everything..."   ← 150ms   │
│   Description text                ← 300ms   │
│                                              │
│   ┌─────┐  ┌─────┐  ┌─────┐                 │
│   │Card1│  │Card2│  │Card3│       ← 450ms   │
│   └─────┘  └─────┘  └─────┘         (staggered)
│                                              │
│   Social proof text               ← 750ms   │
│                                              │
│   [ See How It Works ]            ← 900ms   │
│                                              │
└──────────────────────────────────────────────┘
```

---

## Available Animations

From `tailwind.config.ts`, these animations are already configured:

| Animation | Effect | Duration |
|-----------|--------|----------|
| `animate-unleashed` | Scale + fade up | 1.2s |
| `animate-fadeUpSoft` | Fade + slide up | 0.4s |
| `animate-shimmer` | Brightness pulse | 3s infinite |
| `animate-premium-glow` | Box shadow pulse | 3s infinite |

**Recommended:** Use `animate-fadeUpSoft` for entrance animations (0.4s is snappy and professional).

---

## Implementation Details

### File: `src/pages/OnboardingFlow.tsx`

### 1. Add CSS Animation Delay Utilities (inline styles)

Since Tailwind doesn't have built-in animation-delay utilities, we'll use inline styles for staggered delays.

### 2. Hero Content Changes (lines 162-216)

#### H1 - Main Headline (line 163)
```tsx
// Current:
<h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-2 md:mb-3 lg:mb-4 text-foreground">

// Proposed:
<h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-2 md:mb-3 lg:mb-4 text-foreground animate-fadeUpSoft opacity-0" 
    style={{ animationDelay: '0ms', animationFillMode: 'forwards' }}>
```

#### Tagline (line 166)
```tsx
// Current:
<p className="text-lg md:text-xl lg:text-2xl font-semibold text-primary mb-2 md:mb-3 lg:mb-4">

// Proposed:
<p className="text-lg md:text-xl lg:text-2xl font-semibold text-primary mb-2 md:mb-3 lg:mb-4 animate-fadeUpSoft opacity-0"
   style={{ animationDelay: '150ms', animationFillMode: 'forwards' }}>
```

#### Description (line 169)
```tsx
// Current:
<p className="text-sm md:text-base lg:text-lg text-muted-foreground mb-4 md:mb-6 lg:mb-8 lg:whitespace-nowrap">

// Proposed:
<p className="text-sm md:text-base lg:text-lg text-muted-foreground mb-4 md:mb-6 lg:mb-8 lg:whitespace-nowrap animate-fadeUpSoft opacity-0"
   style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}>
```

#### Feature Cards Container (line 174)
```tsx
// Current:
<div className="flex flex-col md:grid md:grid-cols-3 gap-2 md:gap-5 mb-4 md:mb-6 lg:mb-8 max-w-4xl mx-auto px-2 md:px-0">

// Proposed:
<div className="flex flex-col md:grid md:grid-cols-3 gap-2 md:gap-5 mb-4 md:mb-6 lg:mb-8 max-w-4xl mx-auto px-2 md:px-0">
```

#### Individual Feature Cards (lines 175, 184, 193) - Staggered
```tsx
// Card 1 (line 175):
<div className="flex flex-row md:flex-col items-center md:text-center gap-3 md:gap-0 p-3 md:p-5 rounded-xl bg-card border border-border/50 animate-fadeUpSoft opacity-0"
     style={{ animationDelay: '450ms', animationFillMode: 'forwards' }}>

// Card 2 (line 184):
<div className="flex flex-row md:flex-col items-center md:text-center gap-3 md:gap-0 p-3 md:p-5 rounded-xl bg-card border border-border/50 animate-fadeUpSoft opacity-0"
     style={{ animationDelay: '550ms', animationFillMode: 'forwards' }}>

// Card 3 (line 193):
<div className="flex flex-row md:flex-col items-center md:text-center gap-3 md:gap-0 p-3 md:p-5 rounded-xl bg-card border border-border/50 animate-fadeUpSoft opacity-0"
     style={{ animationDelay: '650ms', animationFillMode: 'forwards' }}>
```

#### Social Proof (line 205)
```tsx
// Current:
<p className="text-xs text-muted-foreground mb-2 md:mb-4">

// Proposed:
<p className="text-xs text-muted-foreground mb-2 md:mb-4 animate-fadeUpSoft opacity-0"
   style={{ animationDelay: '750ms', animationFillMode: 'forwards' }}>
```

#### CTA Button Container (line 210)
```tsx
// Current:
<div className="flex justify-center">

// Proposed:
<div className="flex justify-center animate-fadeUpSoft opacity-0"
     style={{ animationDelay: '900ms', animationFillMode: 'forwards' }}>
```

---

## Animation Timeline Summary

| Element | Delay | Duration | Total Time |
|---------|-------|----------|------------|
| H1 "One Card..." | 0ms | 400ms | 400ms |
| Tagline "5x Rewards..." | 150ms | 400ms | 550ms |
| Description | 300ms | 400ms | 700ms |
| Card 1 | 450ms | 400ms | 850ms |
| Card 2 | 550ms | 400ms | 950ms |
| Card 3 | 650ms | 400ms | 1050ms |
| Social proof | 750ms | 400ms | 1150ms |
| CTA Button | 900ms | 400ms | 1300ms |

Full animation sequence completes in ~1.3 seconds - snappy but elegant.

---

## Technical Notes

- Using `opacity-0` as initial state, with `animationFillMode: 'forwards'` to retain final state
- The `animate-fadeUpSoft` animation includes opacity transition (0 → 1) and translateY (20px → 0)
- Respects `prefers-reduced-motion` via existing CSS media query in `animations.css`

---

## File to Modify

- `src/pages/OnboardingFlow.tsx` (lines 163-215) - Add animation classes and inline delay styles
