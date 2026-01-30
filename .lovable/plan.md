
# Add Glass Transition Effect to SmartRewards Cards

## Overview
Add a glassmorphism transition effect to the "How It Works" cards on the /smartrewards page. When users hover over the cards, they'll transition from solid to a premium glass appearance.

## Current State
The three cards currently have:
- Solid `bg-card` background
- `border border-border/50`
- Hover: `scale-[1.02]`, `shadow-lg`, `shadow-primary/10`, `border-primary/30`

## Implementation

### Add Glass Transition CSS Class
Add a new utility class in `src/styles/components.css` that creates a smooth glass transition on hover:

```css
/* Glass transition effect for cards */
.glass-transition-card {
  position: relative;
  background: hsl(var(--card));
  border: 1px solid hsl(var(--border) / 0.5);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.glass-transition-card::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: linear-gradient(
    135deg,
    hsl(var(--primary) / 0.08) 0%,
    hsl(var(--primary) / 0.03) 50%,
    transparent 100%
  );
  opacity: 0;
  transition: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  pointer-events: none;
}

.glass-transition-card:hover {
  background: hsl(var(--card) / 0.7);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-color: hsl(var(--primary) / 0.3);
  box-shadow: 
    0 8px 32px hsl(var(--primary) / 0.15),
    0 4px 16px hsl(var(--background) / 0.1),
    inset 0 1px 0 hsl(255 255 255 / 0.1);
  transform: scale(1.02) translateY(-2px);
}

.glass-transition-card:hover::before {
  opacity: 1;
}
```

### Update OnboardingFlow.tsx Cards
Replace the current hover classes on the three cards with the new glass transition class:

**Lines 178, 188, 198** - Update each card's className:

**Before:**
```
bg-card border border-border/50 animate-fadeUpSoft opacity-0 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/10 hover:border-primary/30
```

**After:**
```
glass-transition-card rounded-xl animate-fadeUpSoft opacity-0
```

## Effect Description
- **Idle state**: Solid card background matching the current theme
- **Hover transition**: 
  - Background becomes semi-transparent (70% opacity)
  - Backdrop blur activates (20px blur)
  - Subtle gradient overlay fades in
  - Border gains primary color glow
  - Card lifts slightly with scale and translateY
  - Premium shadow appears
- **Smooth 0.4s cubic-bezier easing** for fluid feel

## Files to Modify

| File | Change |
|------|--------|
| `src/styles/components.css` | Add `.glass-transition-card` class with hover states |
| `src/pages/OnboardingFlow.tsx` | Apply new class to three "How It Works" cards |
