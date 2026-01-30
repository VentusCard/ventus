
# Ventus AI Page Improvements

## Overview
Align the Ventus AI page with the design patterns established on other pages (AboutUs, OnboardingFlow), including motion animations, compressed layouts, and consistent theming.

## Planned Changes

### 1. Add Framer Motion Animations
- Import `motion` from `framer-motion`
- Add scroll-triggered fade-in animations to feature cards with staggered delays
- Smooth entrance animations for better user engagement

### 2. Update Feature Cards Styling
**Current:** Hardcoded blue colors (`bg-[#0064E0]/10`)
**Updated:** Use theme tokens for consistency
- Background: `bg-secondary/30` or `bg-primary/10`
- Border: `border-border/50` with `hover:border-primary/30`
- Add hover effects: `hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/10`
- Reduce padding from `p-8` to `p-6` for more compact layout
- Use `text-primary` for icon colors instead of hardcoded blue

### 3. Compress Section Spacing
- Reduce "AI Tools" section padding from `py-24` to `py-16`
- Reduce header margins from `mb-16` to `mb-10`
- Tighten the features grid gap from `gap-6` to `gap-4`

### 4. Add Section Dividers
- Add `border-t border-border/50` between major sections for visual separation (matching AboutUs pattern)

### 5. Enhance CTA Section
- Reduce padding from `py-24` to `py-16`
- Card padding from `p-12 md:p-16` to `p-8 md:p-12`
- Add section divider above CTA

### 6. Remove Unused Code
- Remove the unused `steps` array (since How It Works section is commented out)
- Clean up the disabled `scrollToChat` function

## Technical Details

**File to modify:** `src/pages/VentusAI.tsx`

**New imports:**
```typescript
import { motion } from "framer-motion";
```

**Feature card animation pattern:**
```tsx
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-50px" }}
  transition={{ 
    duration: 0.5, 
    delay: index * 0.1,
    ease: [0.25, 0.46, 0.45, 0.94]
  }}
>
```

**Updated card classes:**
```tsx
className="p-6 rounded-xl bg-secondary/30 border border-border/50 
           hover:border-primary/30 hover:scale-[1.02] 
           hover:shadow-xl hover:shadow-primary/10 
           transition-all duration-300"
```

## Visual Result
- More cohesive look matching AboutUs and OnboardingFlow pages
- Smoother animations on scroll
- More compact, professional layout
- Consistent hover interactions
- Better visual hierarchy with section dividers
