
# Add "How It Works" Section to /app Page

## Overview

Adding a 3-step explainer section that focuses on **selecting lifestyle profiles** (like Tennis, Golf, etc.) to get all relevant deals in one place—matching the Ventus value proposition.

---

## Proposed Steps Content

| Step | Icon | Title | Description |
|------|------|-------|-------------|
| 1 | Target | Pick Your Passions | Choose lifestyle categories like Tennis, Golf, Fitness, or Wellness—tell us what you love. |
| 2 | Sparkles | AI Curates Your Deals | Ventus matches thousands of offers to your interests—equipment, apparel, experiences, and more. |
| 3 | Gift | All Your Deals, One Place | No more searching. Get personalized offers from top brands delivered straight to you. |

---

## Visual Design

```text
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│                        How It Works                                 │
│            Get personalized deals in 3 simple steps                 │
│                                                                     │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐     │
│  │       🎯        │  │       ✨        │  │       🎁        │     │
│  │                 │  │                 │  │                 │     │
│  │  Pick Your      │  │  AI Curates     │  │  All Your Deals │     │
│  │  Passions       │  │  Your Deals     │  │  One Place      │     │
│  │                 │  │                 │  │                 │     │
│  │  Choose Tennis, │  │  Ventus matches │  │  No searching.  │     │
│  │  Golf, Fitness..│  │  thousands...   │  │  Personalized   │     │
│  │                 │  │                 │  │  offers...      │     │
│  │      [1]        │  │      [2]        │  │      [3]        │     │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘     │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Technical Implementation

**File:** `src/pages/AppDownload.tsx`

### Changes

1. **Update imports** (line 1)
   - Add `Target` icon from lucide-react
   - Keep existing `Sparkles` and `Gift` icons

2. **Add steps data array** (after features array, around line 14)
   ```tsx
   const steps = [
     {
       icon: Target,
       step: "1",
       title: "Pick Your Passions",
       description: "Choose lifestyle categories like Tennis, Golf, Fitness, or Wellness—tell us what you love."
     },
     {
       icon: Sparkles,
       step: "2", 
       title: "AI Curates Your Deals",
       description: "Ventus matches thousands of offers to your interests—equipment, apparel, experiences, and more."
     },
     {
       icon: Gift,
       step: "3",
       title: "All Your Deals, One Place",
       description: "No more searching. Get personalized offers from top brands delivered straight to you."
     }
   ];
   ```

3. **Add new section** (after hero section, before Footer)
   - Section with `py-16 md:py-20` padding
   - Subtle background differentiation (`bg-secondary/30`)
   - Header: "How It Works" with subtitle "Get personalized deals in 3 simple steps"
   - 3-column responsive grid (`grid-cols-1 md:grid-cols-3`)
   - Each step card with:
     - Circular icon container with `bg-primary/10`
     - Step number in small badge
     - Bold title
     - Muted description text
     - Subtle card styling with rounded corners

### Styling Approach

- Section uses subtle background to separate from hero
- Cards use clean white/transparent styling with borders
- Icons in circular containers with primary color accent
- Step numbers as small numbered badges
- Responsive: stacks on mobile, 3-column on desktop
- Consistent with existing page design language
